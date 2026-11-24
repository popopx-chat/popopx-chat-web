/**
 * Single source of truth for the hosts, URLs and section anchors the portal
 * publishes. Change a domain here and every component follows.
 *
 * One host everywhere: `https://popopx.chat` is simultaneously the SEO
 * `metadataBase`, the canonical link, the Open Graph URL, the sitemap location
 * and the Nginx `server_name` (see `deploy/centos/nginx-popopx-main.conf`), so
 * a crawler, a link unfolder and the web server all agree.
 *
 * The four hosted portals are separate origins and are linked as such — the
 * measured `server_name` or vhost of each sibling project, not a guess:
 *   popopx.chat        this portal (iOS flagship client)
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
 * This constant is the engine repository, and it stays published next to the
 * portal link on purpose: at the same measurement its published tree was one
 * file, its `AGPL-3.0-only` `LICENSE`, so no feature of the product is repeated
 * here. The portal states its own; `../popopx-bot-studio-web` publishes that page.
 */
export const BOT_STUDIO_REPO_URL = "https://github.com/popopx-chat/popopx-bot-studio";

export const LICENSE_URL = `${IOS_REPO_URL}/blob/master/LICENSE`;

export const TRADEMARK_URL = `${IOS_REPO_URL}/blob/master/TRADEMARK-POPOPX.md`;

export const ASSETS_LICENSE_URL = `${IOS_REPO_URL}/blob/master/ASSETS_LICENSE-POPOPX.md`;

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

/** The five anchored sections of the single-page portal, in navbar order. */
export const NAV_SECTIONS = [
  { id: "features" },
  { id: "security" },
  { id: "comparison" },
  { id: "ecosystem" },
  { id: "download" },
] as const;

export type NavSectionId = (typeof NAV_SECTIONS)[number]["id"];

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
