/**
 * POPOPX main portal — Next.js static export.
 *
 * `output: "export"` makes `next build` write a plain, dependency-free `out/`
 * directory that Nginx (or any static host) serves with no Node runtime and no
 * server-side rendering — the same delivery model as the sibling portals at
 * node.popopx.chat and mp.popopx.chat.
 *
 * `images.unoptimized` is required for export and is also the privacy-correct
 * choice: no remote image loader, no third-party image proxy, every asset is
 * served from this origin.
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  assetPrefix: undefined,
  // No `env` block on purpose: the published host lives in exactly one place,
  // `src/lib/site.ts` (`SITE_HOST` / `SITE_ORIGIN` = https://popopx.chat), which
  // is also the Nginx `server_name`. A second copy in build config is how a
  // domain drifts.
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
