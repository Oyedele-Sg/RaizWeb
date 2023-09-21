/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    transparent: "transparent",
    current: "currentColor",
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },

    fontFamily: {
      manrope: ["Manrope", "sans-serif"],
    },
    boxShadow: {
      "auth-btn":
        "0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)",
    },
    extend: {
      colors: {
        tremor: {
          brand: {
            faint: "#eff6ff", // blue-50
            muted: "#bfdbfe", // blue-200
            subtle: "#60a5fa", // blue-400
            DEFAULT: "#3b82f6", // blue-500
            emphasis: "#1d4ed8", // blue-700
            inverted: "#ffffff", // white
          },
          background: {
            muted: "#f9fafb", // gray-50
            subtle: "#f3f4f6", // gray-100
            DEFAULT: "#F4F4F4", // white
            emphasis: "#374151", // gray-700
          },
          border: {
            DEFAULT: "#e5e7eb", // gray-200
          },
          ring: {
            DEFAULT: "#e5e7eb", // gray-200
          },
          content: {
            subtle: "#9ca3af", // gray-400
            DEFAULT: "#6b7280", // gray-500
            emphasis: "#374151", // gray-700
            strong: "#111827", // gray-900
            inverted: "#ffffff", // white
          },
        },
        "dark-tremor": {
          brand: {
            faint: "#0B1229", // custom
            muted: "#172554", // blue-950
            subtle: "#1e40af", // blue-800
            DEFAULT: "#3b82f6", // blue-500
            emphasis: "#60a5fa", // blue-400
            inverted: "#030712", // gray-950
          },
          background: {
            muted: "#131A2B", // custom
            subtle: "#1f2937", // gray-800
            DEFAULT: "#111827", // gray-900
            emphasis: "#d1d5db", // gray-300
          },
          border: {
            DEFAULT: "#1f2937", // gray-800
          },
          ring: {
            DEFAULT: "#1f2937", // gray-800
          },
          content: {
            subtle: "#4b5563", // gray-600
            DEFAULT: "#6b7280", // gray-600
            emphasis: "#e5e7eb", // gray-200
            strong: "#f9fafb", // gray-50
            inverted: "#000000", // black
          },
        },
        "loading-bg": "rgba(0, 0, 0, 0.584)",
        white: "#FFFFFF",
        purple: "#4B0082",
        yellow: "#FFC857",
        grey: "#F4F4F4",
        error: "#B3261E",
        "neutral-10": "#FDFDFD",
        "neutral-20": "#F0EBF4",
        "neutral-30": "#E7DFEE",
        "neutral-40": "#DFD2EB",
        "neutral-50": "#CEBFDD",
        "neutral-60": "#BFABD3",
        "neutral-70": "#9881AE",
        "neutral-80": "#7E6298",
        "neutral-90": "#64497D",
        "neutral-100": "#493260",
        positive: "#7ABA98",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontSize: {
        "t-18": "1.125rem",
        "t-16": "1rem",
        "t-40": "2.5rem",
        "t-24": "1.5rem",
        "t-20": "1.25rem",
        "t-14": "0.875rem",
        "t-12": "0.75rem",
        "t-36": "2.25rem",
        "t-57": "3.5625rem",
        "t-45": "2.8125rem",
        "t-32": "2rem",
        "t-28": "1.75rem",
        "t-22": "1.375rem",
        "t-11": "0.6875rem",
        "tremor-label": ["0.75rem"],
        "tremor-default": ["0.875rem", { lineHeight: "1.25rem" }],
        "tremor-title": ["1.125rem", { lineHeight: "1.75rem" }],
        "tremor-metric": ["1.875rem", { lineHeight: "2.25rem" }],
      },
      fontWeight: {
        light: 300,
        regular: 400,
        "semi-mid": 500,
        medium: 600,
        bold: 700,
        "extra-bold": 800,
      },
      borderRadius: {
        "r-8": "8px",
        "r-12": "12px",
        "r-6": "6px",
        "tremor-small": "0.375rem",
        "tremor-default": "0.5rem",
        "tremor-full": "9999px",
      },

      boxShadow: {
        match: "0px 16px 42px rgba(0, 0, 0, 0.07)",
        opening: "0px 1px 4px rgba(17, 17, 17, 0.12)",
        // light
      },
      lineHeight: {
        "extra-loose": "2.5",
        12: "3rem",
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "loading-animation-left-right":
          "loading-animation-left-right 2s ease  infinite ",
        "loading-animation-top": "loading-animation-top 2s infinite ",
        "loading-animation-bottom": "loading-animation-bottom 2s  infinite ",
        "loading-animation-middle": "loading-animation-middle 2s  infinite ",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "loading-animation-left-right": {
          "0%": {
            opacity: 1,
          },
          "25%": {
            opacity: 0,
          },
          "50%": {
            opacity: 1,
          },
          "75%": {
            opacity: 0,
          },
          "100%": {
            opacity: 1,
          },
        },
        "loading-animation-top": {
          "0%": {
            opacity: 0,
          },
          "25%": {
            opacity: 1,
          },
          "50%": {
            opacity: 0,
          },
          "75%": {
            opacity: 0,
          },
          "100%": {
            opacity: 0,
          },
        },
        "loading-animation-bottom": {
          "0%": {
            opacity: 0,
          },
          "25%": {
            opacity: 0,
          },
          "50%": {
            opacity: 0,
          },
          "75%": {
            opacity: 1,
          },
          "100%": {
            opacity: 0,
          },
        },
        "loading-animation-middle": {
          "0%": {
            background: "#ffff",
          },
          "25%": {
            background: "#FFC857",
          },
          "50%": {
            background: "#ffff",
          },
          "75%": {
            background: "#FFC857",
          },
          "100%": {
            background: "#ffff",
          },
        },
      },
      backgroundImage: {
        "auth-pattern": "url('/patterns/auth-bg-pattern.svg')",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "profile-1": "url('/patterns/profile-1.svg')",
        "ajo-pattern": "url('/patterns/ajo-bg-pattern.svg')",
      },
    },
  },
  safelist: [
    {
      pattern:
        /^(bg-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(text-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(border-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(ring-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(stroke-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(fill-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
  ],
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/forms")({
      strategy: "class", // only generate classes
    }),
    require("@headlessui/tailwindcss"),
  ],
}

// tremor style
// "tremor-input": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
// "tremor-card":
//   "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
// "tremor-dropdown":
//   "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
// // dark
// "dark-tremor-input": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
// "dark-tremor-card":
//   "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
// "dark-tremor-dropdown":
//   "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
// lg: "var(--radius)",
// md: "calc(var(--radius) - 2px)",
// sm: "calc(var(--radius) - 4px)",
