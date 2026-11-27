/**
 * Single source of truth for the hosts, URLs and routes the portal publishes.
 * Change a domain here and every component follows.
 *
 * One host everywhere: `https://popopx.chat` is simultaneously the SEO
 * `metadataBase`, the canonical link, the Open Graph URL, the sitemap location
 * and the Nginx `server_name` (see `deploy/centos/nginx-popopx-main.conf`), so
 * a crawler, a link unfolder and the web server all agree. The canonical link
 * is per-route, not one value for all seven documents — `layout.tsx` sets a
 * default, and every `page.tsx` overrides it.
 *
 * The four hosted portals are separate origins and are linked as such — the
 * measured `server_name` or vhost of each sibling project, not a guess:
 *   popopx.chat        this portal (platform site: client, ecosystem, sources)
 *   node.popopx.chat   Mac Node edge-services engine (`../node-popopx-chat-web`)
 *   mp.popopx.chat     service accounts & zero-knowledge channels (`../popopx-service-suite-web`)
 *   bot.popopx.chat    Bot Studio, the self-hosted bot workbench (`BOT_STUDIO_URL`)
 */

export const SITE_HOST = "popopx.chat";

export const SITE_ORIGIN = "https://popopx.chat";

export const SITE_URL = SITE_ORIGIN;

export const NODE_PORTAL_HOST = "node.popopx.chat";

export const MP_PORTAL_HOST = "mp.popopx.chat";

export const BOT_STUDIO_HOST = "bot.popopx.chat";

export const NODE_PORTAL_URL = `https://${NODE_PORTAL_HOST}`;

export const MP_PORTAL_URL = `https://${MP_PORTAL_HOST}`;

export const BOT_STUDIO_URL = `https://${BOT_STUDIO_HOST}`;

/**
 * Repositories. `popopx-chat` is the iOS client (its default branch is
 * `master`, measured with `gh api repos/popopx-chat/popopx-chat`); the portal
 * and the service suite publish from `main`, so the two blob prefixes differ.
 */
export const IOS_REPO_URL = "https://github.com/popopx-chat/popopx-chat";

export const WEB_REPO_URL = "https://github.com/popopx-chat/popopx-chat-web";

export const SUITE_REPO_URL = "https://github.com/popopx-chat/popopx-service-suite";

export const NODE_REPO_URL = "https://github.com/popopx-chat/popopx-mac-node";

/**
 * POPOPX Bot Studio — the self-hosted bot workbench.
 *
 * The portal has answered on `BOT_STUDIO_HOST` since 2026-11-24, measured the
 * same day (recipe in `docs/FACTS.md` §15): plain HTTP redirects to HTTPS, port
 * 443 returns `HTTP/2 200` under a Let's Encrypt certificate issued for that
 * name, and the page loads nothing but its own files.
 *
 * This constant is the engine repository. Measured again on 2026-11-25 its
 * published tree is open source under AGPL-3.0-only — README, `studio/`,
 * `official_tools/` and `docs/` included — where the 2026-11-24 measurement had
 * found nothing but the license file. The portal still does not restate the
 * product's feature list; that is the repo's own claim to make.
 */
export const BOT_STUDIO_REPO_URL = "https://github.com/popopx-chat/popopx-bot-studio";

/** `popopx-bot-studio-web` publishes the page served at `bot.popopx.chat`. */
export const BOT_STUDIO_WEB_REPO_URL = "https://github.com/popopx-chat/popopx-bot-studio-web";

/** The service-account suite repository behind `mp.popopx.chat`. */
export const SUITE_WEB_REPO_URL = "https://github.com/popopx-chat/popopx-service-suite-web";

/** `popopxmq` — the SMP/XFTP protocol implementation the relays run. */
export const MQ_REPO_URL = "https://github.com/popopx-chat/popopxmq";

export const LICENSE_URL = `${IOS_REPO_URL}/blob/master/LICENSE`;

export const TRADEMARK_URL = `${IOS_REPO_URL}/blob/master/TRADEMARK-POPOPX.md`;

/**
 * Renamed to `ASSETS_LICENSE.md` by the client repo on 2026-11-25; the old
 * `-POPOPX` suffix 404s, so this string is load-bearing (ledger §11).
 */
export const ASSETS_LICENSE_URL = `${IOS_REPO_URL}/blob/master/ASSETS_LICENSE.md`;

/**
 * The fork's own root documents, all measured present on `master` on
 * 2026-11-25. `README.md` also carries the license/trademark split in prose.
 */
export const FORK_DOC_URL = `${IOS_REPO_URL}/blob/master/FORK.md`;

export const CHANGELOG_DOC_URL = `${IOS_REPO_URL}/blob/master/CHANGELOG.md`;

export const PRIVACY_DOC_URL = `${IOS_REPO_URL}/blob/master/PRIVACY-POPOPX.md`;

export const AGPL_COMPLIANCE_DOC_URL = `${IOS_REPO_URL}/blob/master/AGPL-COMPLIANCE.md`;

/**
 * The agent protocol specification, measured on `popopxmq` at `master`
 * (AGPL-3.0, `private: false`) on 2026-11-25: `protocol/` also holds
 * `smp.md`, `xftp.md`, `crypto-registry.md`, `security.md` and `pqdr.md`.
 * The repo has no `smp/` directory — an earlier draft of this constant pointed
 * there and would have shipped a dead link.
 */
export const AGENT_PROTOCOL_URL = `${MQ_REPO_URL}/blob/master/protocol/agent-protocol.md`;

/** The relay-side messaging protocol the client speaks. */
export const SMP_PROTOCOL_URL = `${MQ_REPO_URL}/blob/master/protocol/popopx-messaging.md`;

/** Algorithm registry — the list the cryptography baseline on /security cites. */
export const CRYPTO_REGISTRY_URL = `${MQ_REPO_URL}/blob/master/protocol/crypto-registry.md`;

/**
 * Deliberately absent: an App Store or TestFlight URL.
 *
 * The record `https://apps.apple.com/us/app/popopx-chat/id6799146157` does not
 * resolve — `itunes.apple.com/lookup?id=6799146157` answers `resultCount: 0`
 * (measured again while writing this file) — and the only TestFlight join code
 * still floating in the older site sources belongs to another project. The
 * standing ruling (2026-11-16, `../popopx.chat-site/README.md`) is that no
 * store badge or link is rendered until its own record resolves, so this portal
 * states the status in words and points its QR code at `SITE_URL` instead.
 */

/**
 * The seven first-level routes of the portal, in navbar order.
 *
 * `href` carries the trailing slash because `next.config.mjs` sets
 * `trailingSlash: true`: a link without it costs a redirect, and in static
 * export the document is `out/<route>/index.html`. Labels are NOT here — they
 * are 21-slot copy objects and live in `Navbar.tsx`, where `check-i18n` can
 * hold them to the exhaustive-`Localized` rule.
 */
export const ROUTES = [
  { id: "home", href: "/" },
  { id: "products", href: "/products/" },
  { id: "ecosystem", href: "/ecosystem/" },
  { id: "security", href: "/security/" },
  { id: "developers", href: "/developers/" },
  { id: "resources", href: "/resources/" },
  { id: "download", href: "/download/" },
] as const;

export type RouteId = (typeof ROUTES)[number]["id"];

/**
 * Clipboard helper shared by every "copy" button.
 *
 * `navigator.clipboard` only exists on secure contexts, so a self-hosted
 * deployment over plain http (common on a LAN during bring-up) still has to be
 * able to copy a command: the textarea fallback is the reason the copy buttons
 * work from `http://127.0.0.1` too.
 */
export async function copyText(value: string): Promise<boolean> {
  try {
    if (typeof navigator !== "undefined" && navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(value);
      return true;
    }
  } catch {
    // Fall through to the legacy path; a rejected promise is not fatal.
  }
  try {
    const area = document.createElement("textarea");
    area.value = value;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.top = "-1000px";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(area);
    return ok;
  } catch {
    return false;
  }
}
