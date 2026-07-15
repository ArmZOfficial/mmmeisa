import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        pink: {
          primary: "#F7A8C0",
          accent: "#F292B0",
          deep: "#E8698C",
          soft: "#FDE6ED",
          glow: "#FF6FA5",
          cream: "#FFF7FA",
        },
        navy: {
          night: "#1E2338",
        },
      },
      fontFamily: {
        thai: ["var(--font-kanit)", "sans-serif"],
        display: ["var(--font-kanit)", "var(--font-baloo)", "sans-serif"],
        sans: ["var(--font-kanit)", "sans-serif"],
      },
      boxShadow: {
        neon: "0 0 20px rgba(255, 111, 165, 0.5), 0 0 40px rgba(247, 168, 192, 0.3)",
        "neon-sm": "0 0 10px rgba(255, 111, 165, 0.4)",
      },
      animation: {
        float: "float 3s ease-in-out infinite",
        "float-slow": "float 5s ease-in-out infinite",
        sparkle: "sparkle 2s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        sparkle: {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "0.8" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 15px rgba(255, 111, 165, 0.4)" },
          "50%": { boxShadow: "0 0 30px rgba(255, 111, 165, 0.7)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
