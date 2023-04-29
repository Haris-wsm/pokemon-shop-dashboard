/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        main: "#34d399",
        secondary: "#60a5fa",
        fontMain: "#1e293b", // slate-800
        fontSecondary: "#475569", // slate-800
        bgLight: "#f1f5f9",
      },
      fontFamily: {
        sans: ["Prompt", "sans-serif"],
      },
      screens: {
        xs: "0px",
        // => @media (min-width: 640px) { ... }

        sm: "600px",
        // => @media (min-width: 768px) { ... }

        md: "900px",
        // => @media (min-width: 1024px) { ... }

        lg: "1200px",
        // => @media (min-width: 1280px) { ... }

        xl: "1536px",
        // => @media (min-width: 1536px) { ... }
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
};
