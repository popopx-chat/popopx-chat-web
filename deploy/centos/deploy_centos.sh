#!/usr/bin/env bash
#
# POPOPX main portal — one-click production deployment for
# CentOS Stream / RHEL / Rocky Linux / AlmaLinux.
#
# What this script does, in order:
#   1. checks the machine (root, systemd, nginx or a way to install it, the built
#      static export present)
#   2. installs nginx + Certbot through dnf
#   3. copies the Next.js static export into $WEB_ROOT
#   4. restores SELinux labels so nginx may read the files
#   5. asks Let's Encrypt for the certificate for $SITE_HOST
#   6. renders deploy/centos/nginx-popopx-main.conf (host and root substituted,
#      patched for the local nginx version) and installs it after `nginx -t`
#   7. opens 80/443 in firewalld and prints the verification commands
#
# It never prints a secret, never reads any credential, and refuses to run
# without --yes outside a TTY so it cannot be fired by accident in CI.
#
# Usage:
#   sudo ./deploy_centos.sh --email you@example.com
#   sudo ./deploy_centos.sh --email you@example.com --dry-run
#   sudo ./deploy_centos.sh --check            # report only, change nothing
#   sudo ./deploy_centos.sh --email you@example.com --host main.popopx.chat \
#                            --web-root /var/www/main.popopx.chat            # staging
#
# Copyright (c) 2026 POPOPX (popopx.chat)
# SPDX-License-Identifier: AGPL-3.0-only

set -euo pipefail

# ---------------------------------------------------------------------------
# Defaults — override with the flags below or the environment.
# ---------------------------------------------------------------------------
SITE_HOST="${SITE_HOST:-popopx.chat}"
SITE_ORIGIN="${SITE_ORIGIN:-https://popopx.chat}"
WEB_ROOT="${WEB_ROOT:-/var/www/popopx.chat}"
SOURCE_DIR="${SOURCE_DIR:-}"
CERT_EMAIL="${CERT_EMAIL:-}"
NGINX_CONF_NAME="${NGINX_CONF_NAME:-nginx-popopx-main.conf}"
ASSUME_YES=0
DRY_RUN=0
CHECK_ONLY=0
SKIP_CERTBOT=0
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
VHOST_SRC="${REPO_ROOT}/deploy/centos/${NGINX_CONF_NAME}"

log() { printf '\033[1;35m[popopx]\033[0m %s\n' "$*"; }
ok() { printf '\033[1;32m  ✓\033[0m %s\n' "$*"; }
warn() { printf '\033[1;33m  !\033[0m %s\n' "$*"; }
die() { printf '\033[1;31m  ✗\033[0m %s\n' "$*" >&2; exit 1; }

usage() {
  cat <<EOF
用法 / Usage: sudo ./deploy/centos/deploy_centos.sh [options]

  --email ADDRESS     Let's Encrypt registration address (required unless --no-certbot)
  --source DIR        built static export to publish (default: ./out, then ./dist)
  --web-root PATH     nginx document root (default: /var/www/${SITE_HOST})
  --host NAME         public host name (default: ${SITE_HOST})
  --yes               non-interactive: accept the summary prompt
  --dry-run           print every mutating command instead of running it
  --check             preflight report only, change nothing
  --no-certbot        install the vhost but leave HTTPS certificate issuance to you
  -h, --help          this message

域名约定 / Domain convention:
  this portal is served from https://${SITE_HOST}
  canonical / SEO origin stays ${SITE_ORIGIN}
  the sibling portals (node.popopx.chat, mp.popopx.chat) are other vhosts on
  other document roots; this script never rewrites them
EOF
}

# ---------------------------------------------------------------------------
# Argument parsing
# ---------------------------------------------------------------------------
while [[ $# -gt 0 ]]; do
  case "$1" in
    --email) [[ $# -ge 2 ]] || die "--email needs a value"; CERT_EMAIL="$2"; shift 2 ;;
    --source) [[ $# -ge 2 ]] || die "--source needs a value"; SOURCE_DIR="$2"; shift 2 ;;
    --web-root) [[ $# -ge 2 ]] || die "--web-root needs a value"; WEB_ROOT="$2"; shift 2 ;;
    --host) [[ $# -ge 2 ]] || die "--host needs a value"; SITE_HOST="$2"; shift 2 ;;
    --yes|-y) ASSUME_YES=1; shift ;;
    --dry-run) DRY_RUN=1; shift ;;
    --check) CHECK_ONLY=1; shift ;;
    --no-certbot) SKIP_CERTBOT=1; shift ;;
    -h|--help) usage; exit 0 ;;
    *) die "unknown option: $1 (try --help)" ;;
  esac
done

# Operator input is interpolated into a `sed` program below, so it is validated
# instead of escaped: a hostname is letters/digits/dot/dash, a path is
# letters/digits/dot/dash/slash, and neither may carry a sed delimiter, a quote
# or whitespace. Anything else fails here rather than corrupting the vhost.
[[ "$SITE_HOST" =~ ^[A-Za-z0-9]([A-Za-z0-9.-]*[A-Za-z0-9])?$ ]] \
  || die "--host is not a valid hostname: ${SITE_HOST}"
[[ "$WEB_ROOT" =~ ^/[A-Za-z0-9._/-]+$ ]] && [[ "$WEB_ROOT" != *"//" ]] && [[ "$WEB_ROOT" != */ ]] \
  && [[ "$WEB_ROOT" != *"/../"* ]] && [[ "$WEB_ROOT" != "/.." ]] \
  || die "--web-root must be an absolute path, without '..', a doubled slash or a trailing slash: ${WEB_ROOT}"
if [[ -n "$CERT_EMAIL" ]]; then
  [[ "$CERT_EMAIL" =~ ^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+$ ]] \
    || die "--email does not look like an address: ${CERT_EMAIL}"
fi
SITE_ORIGIN="https://${SITE_HOST}"

# ---------------------------------------------------------------------------
# run: every filesystem/service mutation goes through here so --dry-run can
# intercept all of it rather than half of it.
# ---------------------------------------------------------------------------
run() {
  if [[ "$DRY_RUN" -eq 1 ]]; then
    printf '\033[1;36m[dry-run]\033[0m %s\n' "$*"
    return 0
  fi
  "$@"
}

has_systemd() { [[ -d /run/systemd/system ]]; }

nginx_version() {
  local raw
  # `grep -oE`, not a substitution: a greedy `.*` in a `s///` anchor swallows the
  # leading digits of "nginx version: nginx/1.14.1" and yields 4.1, which reads as
  # a modern nginx and skips the http2 rewrite this function exists to trigger.
  raw="$(nginx -v 2>&1 | { grep -oE '[0-9]+\.[0-9]+(\.[0-9]+)?' || true; } | head -1)"
  [[ -n "$raw" ]] && printf '%s' "$raw" || printf '0.0.0'
}

# true when nginx >= 1.25.1, i.e. when the `http2 on;` directive exists
nginx_supports_http2_on() {
  local v major minor patch
  v="$(nginx_version)"
  IFS=. read -r major minor patch <<<"$v"
  patch="${patch:-0}"
  [[ "$major" -gt 1 ]] && return 0
  [[ "$major" -eq 1 && "$minor" -gt 25 ]] && return 0
  [[ "$major" -eq 1 && "$minor" -eq 25 && "$patch" -ge 1 ]] && return 0
  return 1
}

# ---------------------------------------------------------------------------
# render_vhost: $VHOST_SRC → $1, with the host and the document root replaced.
#
# The template is written with the production values in it, so the substitution
# must be anchored rather than global. A plain `s/popopx\.chat/$SITE_HOST/g`
# matches inside `node.popopx.chat` and `mp.popopx.chat` too — the two sibling
# portals named in the template's comments — and rewrites them into
# `node.<SITE_HOST>`, which is how a staging render ends up pointing at a domain
# nobody owns. So the two sibling hostnames and the default document root are
# lifted out into tokens first, the bare host is substituted, and the tokens are
# put back.
# ---------------------------------------------------------------------------
render_vhost() {
  local target="$1"
  sed -e 's#node\.popopx\.chat#@@POPOPX_NODE_HOST@@#g' \
      -e 's#mp\.popopx\.chat#@@POPOPX_MP_HOST@@#g' \
      -e 's#/var/www/popopx\.chat#@@POPOPX_WEB_ROOT@@#g' \
      -e 's#popopx\.chat#'"${SITE_HOST}"'#g' \
      -e 's#@@POPOPX_NODE_HOST@@#node.popopx.chat#g' \
      -e 's#@@POPOPX_MP_HOST@@#mp.popopx.chat#g' \
      -e 's#@@POPOPX_WEB_ROOT@@#'"${WEB_ROOT}"'#g' \
      "$VHOST_SRC" >"$target"

  # Prove the surgery worked before anything installs the result. Both checks
  # are must-be-true assertions: if the anchoring is ever broken the render
  # fails here instead of on a production `nginx -t`.
  grep -qE "server_name[[:space:]]+${SITE_HOST};" "$target" \
    || die "rendered vhost has no 'server_name ${SITE_HOST};' — the substitution did not apply"
  grep -qE "root[[:space:]]+${WEB_ROOT};" "$target" \
    || die "rendered vhost has no 'root ${WEB_ROOT};' — the substitution did not apply"
  if [[ "$SITE_HOST" != "popopx.chat" ]]; then
    # Only a non-default host can mangle a sibling: with SITE_HOST=popopx.chat
    # the two sibling names are supposed to survive verbatim, so this assertion
    # would fire on a correct render.
    if grep -qE "(node|mp)\.${SITE_HOST}" "$target"; then
      die "rendered vhost contains a mangled sibling hostname (node./mp. + ${SITE_HOST}); refusing to install it"
    fi
    grep -q "node.popopx.chat" "$target" \
      || die "the sibling portals disappeared from the rendered vhost — anchor protection failed"
  fi
}

# ---------------------------------------------------------------------------
# 1. Preflight
# ---------------------------------------------------------------------------
log "POPOPX main portal deployment"
log "host=${SITE_HOST}  web root=${WEB_ROOT}  origin=${SITE_ORIGIN}"

# `--check` only reads, so it is the one mode that is useful from an
# unprivileged shell; every other mode mutates this machine and has to say so
# before it starts changing it.
if [[ "$(id -u)" -ne 0 && "$CHECK_ONLY" -eq 0 ]]; then
  die "run as root: sudo ./deploy/centos/deploy_centos.sh  (or add --check for a read-only report)"
fi
[[ -r "$VHOST_SRC" ]] || die "vhost template missing: $VHOST_SRC"

if [[ -z "$SOURCE_DIR" ]]; then
  for candidate in "${REPO_ROOT}/out" "${REPO_ROOT}/dist"; do
    if [[ -f "${candidate}/index.html" ]]; then
      SOURCE_DIR="$candidate"
      break
    fi
  done
fi
[[ -n "$SOURCE_DIR" ]] || die "no built export found. Run 'npm run build' first, or pass --source DIR"
[[ -f "${SOURCE_DIR}/index.html" ]] || die "${SOURCE_DIR}/index.html is missing — that is not a static export"
ok "static export: ${SOURCE_DIR} ($(find "$SOURCE_DIR" -type f | wc -l | tr -d ' ') files)"

if [[ "$SKIP_CERTBOT" -eq 0 && -z "$CERT_EMAIL" ]]; then
  # `--check` is a report: it lists what a real run would refuse on instead of
  # refusing, so the operator sees every finding in one pass.
  if [[ "$CHECK_ONLY" -eq 1 ]]; then
    warn "--email is not set; a real run would require it (or --no-certbot)"
  else
    die "--email is required for Let's Encrypt (or pass --no-certbot to install HTTP-only for now)"
  fi
fi

for asset in favicon.png logo-popopx.png apple-touch-icon.png site.webmanifest robots.txt sitemap.xml; do
  [[ -f "${SOURCE_DIR}/${asset}" ]] || warn "${asset} is missing from ${SOURCE_DIR}; the browser or the crawler will 404 it"
done

# A static export has no runtime, so the one class of broken deploy left is an
# artifact that still names a machine-local path or a third-party origin.
if grep -qaE '(/Users/|/home/[a-z]|googletagmanager|fonts\.googleapis)' "$SOURCE_DIR/index.html"; then
  die "${SOURCE_DIR}/index.html contains a local path or a third-party origin — run 'npm run check:out' before deploying"
fi

if command -v nginx >/dev/null 2>&1; then
  ok "nginx present: $(nginx_version)"
elif command -v dnf >/dev/null 2>&1; then
  warn "nginx not installed; dnf will install it"
elif [[ "$CHECK_ONLY" -eq 1 ]]; then
  warn "no nginx and no dnf here — this script targets CentOS / RHEL / Rocky / Alma, so a real run on this machine would stop"
else
  die "no nginx and no dnf — this script targets CentOS / RHEL / Rocky / Alma"
fi

if command -v getenforce >/dev/null 2>&1 && [[ "$(getenforce)" == "Enforcing" ]]; then
  warn "SELinux is enforcing — restorecon will be applied to ${WEB_ROOT}"
fi

if [[ "$CHECK_ONLY" -eq 1 ]]; then
  TMP_CHECK="$(mktemp)"
  render_vhost "$TMP_CHECK"
  ok "rendered vhost verified for host=${SITE_HOST} root=${WEB_ROOT}"
  rm -f "$TMP_CHECK"
  log "--check: preflight passed, nothing changed."
  exit 0
fi

if [[ "$DRY_RUN" -eq 0 && "$ASSUME_YES" -eq 0 ]]; then
  if [[ -t 0 ]]; then
    read -r -p "Proceed with the steps above? [y/N] " reply
    [[ "$reply" =~ ^[Yy]$ ]] || die "aborted by operator"
  else
    die "non-interactive run without --yes; refusing to change this machine"
  fi
fi

# ---------------------------------------------------------------------------
# 2. Packages
# ---------------------------------------------------------------------------
log "installing packages"
if command -v dnf >/dev/null 2>&1; then
  PM="dnf -y"
else
  PM="yum -y"
fi

run sh -c "${PM} install -y nginx"
if [[ "$SKIP_CERTBOT" -eq 0 ]]; then
  # certbot lives in EPEL on EL8/EL9 and in the appstream on CentOS Stream 9.
  if ! command -v certbot >/dev/null 2>&1; then
    run sh -c "command -v dnf >/dev/null && dnf -y install epel-release || true"
    run sh -c "${PM} install -y certbot python3-certbot-nginx || ${PM} install -y certbot"
  fi
fi
ok "packages ready"

# ---------------------------------------------------------------------------
# 3. Publish the export
# ---------------------------------------------------------------------------
log "publishing ${SOURCE_DIR} -> ${WEB_ROOT}"
run install -d -m 0755 "$WEB_ROOT"
# rsync keeps mtime and deletes stale files from the previous release; tar+cp is
# the fallback on a minimal install without rsync.
if command -v rsync >/dev/null 2>&1; then
  run rsync -a --delete "${SOURCE_DIR}/" "${WEB_ROOT}/"
else
  run cp -a "${SOURCE_DIR}/." "${WEB_ROOT}/"
fi
run chown -R nginx:nginx "$WEB_ROOT" 2>/dev/null || run chown -R www-data:www-data "$WEB_ROOT" 2>/dev/null || warn "could not set ownership; nginx may still read 0644 files"
run find "$WEB_ROOT" -type d -exec chmod 0755 {} \;
run find "$WEB_ROOT" -type f -exec chmod 0644 {} \;
ok "document root populated"

# ---------------------------------------------------------------------------
# 4. SELinux
# ---------------------------------------------------------------------------
if command -v restorecon >/dev/null 2>&1; then
  log "restoring SELinux labels"
  run restorecon -Rv "$WEB_ROOT" || warn "restorecon failed; check 'semanage fcontext' if nginx returns 403"
fi

# ---------------------------------------------------------------------------
# 5. Certificate
# ---------------------------------------------------------------------------
LIVE_DIR="/etc/letsencrypt/live/${SITE_HOST}"
if [[ "$SKIP_CERTBOT" -eq 0 ]]; then
  if [[ -d "$LIVE_DIR" ]] && [[ -f "${LIVE_DIR}/fullchain.pem" ]]; then
    ok "certificate already issued for ${SITE_HOST}; reusing it"
  else
    log "requesting a certificate for ${SITE_HOST} (webroot challenge against ${WEB_ROOT})"
    # The certificate has to exist BEFORE the vhost is installed, because that
    # file references ${LIVE_DIR}/*.pem and `nginx -t` fails on a missing key.
    # The HTTP block above must already be loaded for the webroot challenge to
    # answer, which is why the first deploy of a brand-new host is:
    #   --no-certbot once (installs the vhost, HTTP only) → rerun with --email.
    run certbot certonly --webroot \
      -w "$WEB_ROOT" \
      -d "$SITE_HOST" \
      --non-interactive \
      --agree-tos \
      --email "$CERT_EMAIL" \
      --key-type rsa \
      --rsa-key-size 2048
    ok "certificate issued"
  fi
  warn "alternative one-liner (Certbot rewrites the vhost itself): certbot --nginx -d ${SITE_HOST}"
  warn "renewal is handled by the certbot systemd timer; verify with: certbot renew --dry-run"
else
  warn "--no-certbot: the HTTPS block will not load until ${LIVE_DIR} exists"
fi

# ---------------------------------------------------------------------------
# 6. Nginx vhost
# ---------------------------------------------------------------------------
log "installing vhost -> /etc/nginx/conf.d/${NGINX_CONF_NAME}"
run install -d -m 0755 /etc/nginx/conf.d

if [[ "$DRY_RUN" -eq 1 ]]; then
  printf '\033[1;36m[dry-run]\033[0m render %s for host=%s root=%s\n' "$VHOST_SRC" "$SITE_HOST" "$WEB_ROOT"
else
  TMP_CONF="/tmp/${NGINX_CONF_NAME}.popopx.$$"
  render_vhost "$TMP_CONF"
  ok "rendered vhost verified for host=${SITE_HOST} root=${WEB_ROOT}"
  # The template ships the portable `listen … 443 ssl http2;` form, so nothing has to
  # be rewritten on any nginx from 1.9.5 upward. Guard only the way this breaks: an
  # operator who switches the template to the 1.25.1+ `http2 on;` directive and then
  # deploys to an older box, where it is an [emerg] that fails the whole config test.
  if command -v nginx >/dev/null 2>&1; then
    if grep -qE '^[[:space:]]*http2[[:space:]]+on;' "$TMP_CONF" && ! nginx_supports_http2_on; then
      rm -f "$TMP_CONF"
      die "the vhost uses 'http2 on;' but nginx $(nginx_version) predates that directive (needs >= 1.25.1); use the listen parameter form instead"
    elif nginx_supports_http2_on; then
      warn "nginx $(nginx_version) may print a deprecation notice for 'listen … http2' in nginx -t; harmless, and the form still works"
    fi
  fi
  CONF_TARGET="/etc/nginx/conf.d/${NGINX_CONF_NAME}"
  CONF_PREV="/tmp/${NGINX_CONF_NAME}.previous.$$"
  # Keep the file being replaced. An installed vhost that nginx rejects is not a
  # no-op: it fails `nginx -t` for every later config change on the machine and
  # silently pins the old runtime config in place.
  if [[ -f "$CONF_TARGET" ]]; then
    cp -a "$CONF_TARGET" "$CONF_PREV"
  fi
  mv "$TMP_CONF" "$CONF_TARGET"
fi

if command -v nginx >/dev/null 2>&1 && [[ "$DRY_RUN" -eq 0 ]]; then
  log "nginx -t"
  if out="$(nginx -t 2>&1)"; then
    if [[ -n "$out" ]]; then printf '%s\n' "$out"; fi
  else
    printf '%s\n' "$out"
    if [[ -n "${CONF_PREV:-}" && -f "$CONF_PREV" ]]; then
      cp -a "$CONF_PREV" "$CONF_TARGET"
      rm -f "$CONF_PREV"
      warn "restored the previous vhost — ${SITE_HOST} keeps serving exactly what it served before"
    else
      rm -f "${CONF_TARGET:-}"
      warn "removed the new vhost so nginx -t is not left failing on this machine"
    fi
    if ! nginx -t >/dev/null 2>&1; then
      warn "nginx -t still fails after the rollback — the fault is outside this vhost"
    fi
    die "vhost rejected by nginx -t: nothing was reloaded, nothing was left installed"
  fi
fi

if has_systemd; then
  run systemctl enable nginx
  run systemctl reload nginx 2>/dev/null || run systemctl restart nginx
else
  warn "no systemd; start nginx yourself: nginx -s reload"
fi
ok "nginx serving ${SITE_HOST}"

# ---------------------------------------------------------------------------
# 7. Firewall
# ---------------------------------------------------------------------------
if command -v firewall-cmd >/dev/null 2>&1 && firewall-cmd --state >/dev/null 2>&1; then
  log "opening 80/443 in firewalld"
  run firewall-cmd --permanent --add-service=http
  run firewall-cmd --permanent --add-service=https
  run firewall-cmd --reload
  ok "firewalld updated"
else
  warn "firewalld not active — check your cloud security group / iptables rules yourself"
fi

# ---------------------------------------------------------------------------
# 8. Summary
# ---------------------------------------------------------------------------
cat <<EOF

$(log 'deployment finished')

  public URL        https://${SITE_HOST}
  canonical origin  ${SITE_ORIGIN}
  document root     ${WEB_ROOT}
  vhost file        /etc/nginx/conf.d/${NGINX_CONF_NAME}
  certificate       ${LIVE_DIR}

verify it:
  curl -sI https://${SITE_HOST}/ | sed -n '1,24p'
  curl -s  https://${SITE_HOST}/ | grep -c 'POPOPX'
  curl -sI https://${SITE_HOST}/ | grep -i content-security-policy
  nginx -T | grep -E 'server_name|root ' | sort -u
  certbot renew --dry-run

redeploy after a copy change:
  npm run build && npm run check:out && sudo ./deploy/centos/deploy_centos.sh --email ${CERT_EMAIL:-you@example.com} --yes

EOF
ok "done"
