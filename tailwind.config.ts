import type { Config } from "tailwindcss";

/**
 * Design tokens for the POPOPX main portal.
 *
 * Palette (the values the portal brief specifies, in the same token names the
 * sibling portals use so a component reads the same on all three hosts):
 *  - `ink`        Deep-space background (#07080D).
 *  - `brand*`     Electric violet = the "encrypted / online" accent (#6E3FF3).
 *  - `mesh*`      Neon cyan-green = the "offline BLE mesh" secondary (#10B981).
 *  - `warn`       Amber for quota / timing signals, `alert` red for the
 *                 `security` card and the PanicWipe row.
 *
 * Every colour is used as a Tailwind utility (`bg-brand`, `text-mesh-soft`,
 * `border-hair`), so adding a token here is enough — there is no separate CSS
 * file to keep in sync.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#07080D",
          800: "#0C0E16",
          700: "#12151F",
          600: "#181C29",
          500: "#212636",
        },
        brand: {
          DEFAULT: "#6E3FF3",
          soft: "#9B7BFF",
          deep: "#4B21C4",
          glow: "rgba(110, 63, 243, 0.35)",
        },
        mesh: {
          DEFAULT: "#10B981",
          soft: "#34E0B4",
          deep: "#0B8468",
          glow: "rgba(16, 185, 129, 0.30)",
        },
        warn: {
          DEFAULT: "#F5A524",
          soft: "#FFC960",
        },
        alert: {
          DEFAULT: "#FF453A",
          soft: "#FF6961",
        },
        hair: "rgba(255, 255, 255, 0.08)",
        "hair-strong": "rgba(255, 255, 255, 0.16)",
        mute: "rgba(233, 233, 245, 0.62)",
        faint: "rgba(233, 233, 245, 0.40)",
      },
      fontFamily: {
        // System stack only: no webfont, no external CDN, no cross-origin request.
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Text",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "PingFang SC",
          "Hiragino Sans GB",
          "Microsoft YaHei",
          "sans-serif",
        ],
        mono: [
          "ui-monospace",
          "SF Mono",
          "SFMono-Regular",
          "Menlo",
          "Consolas",
          "Liberation Mono",
          "monospace",
        ],
      },
      backgroundImage: {
        "brand-halo":
          "radial-gradient(60% 60% at 50% 45%, rgba(110, 63, 243, 0.30) 0%, rgba(110, 63, 243, 0.11) 40%, transparent 75%)",
        "mesh-halo":
          "radial-gradient(50% 50% at 50% 50%, rgba(16, 185, 129, 0.22) 0%, transparent 72%)",
        "flow-brand":
          "linear-gradient(90deg, transparent 0%, rgba(155, 123, 255, 0.75) 45%, rgba(155, 123, 255, 0.75) 55%, transparent 100%)",
        "flow-mesh":
          "linear-gradient(90deg, transparent 0%, rgba(52, 224, 180, 0.70) 45%, rgba(52, 224, 180, 0.70) 55%, transparent 100%)",
      },
      boxShadow: {
        glass: "0 1px 0 0 rgba(255,255,255,0.06) inset, 0 24px 60px -30px rgba(0,0,0,0.9)",
        "brand-ring": "0 0 0 1px rgba(110,63,243,0.45), 0 0 40px -12px rgba(110,63,243,0.65)",
        "mesh-ring": "0 0 0 1px rgba(52,224,180,0.40), 0 0 40px -12px rgba(16,185,129,0.55)",
      },
      animation: {
        "flow-x": "flowX 6s linear infinite",
        "pulse-soft": "pulseSoft 3.2s ease-in-out infinite",
        "spin-slow": "spin 18s linear infinite",
        "rise-in": "riseIn 0.45s ease-out both",
      },
      keyframes: {
        flowX: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "1" },
        },
        riseIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      screens: {
        xs: "480px",
      },
    },
  },
  plugins: [],
};

export default config;
