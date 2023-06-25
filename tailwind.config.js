/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
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
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "r-8": "8px",
        "r-12": "12px",
        "r-6": "6px",
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
      },
      boxShadow: {
        match: "0px 16px 42px rgba(0, 0, 0, 0.07)",
        opening: "0px 1px 4px rgba(17, 17, 17, 0.12)",
      },
      lineHeight: {
        "extra-loose": "2.5",
        12: "3rem",
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
