import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "main-background": "var(--main-background)",
        "sec-background": "var(--second-background)",
        "third-background": "var(--third-background)",
        "b-color": "var(--border-color)",
        "border-color-hover": "var(--border-color-hover)",
        "main-text": "var(--main-text)",
        "sec-text": "var(--second-text)",
        "btn-prim": "var(--btn-prim)",
        "btn-text": "var(--btn-text)",
        "btn-sec": "var(--btn-sec)",
      },
      animation: {
        "gradient-x": "gradient-x 1s ease infinite",
        "slide-left": "slide-left 0.4s ease-out",
      },
      keyframes: {
        "gradient-x": {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        "slide-left": {
          from: { transform: "translateX(1000px)" },
          to: { transform: "translateX(0px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
