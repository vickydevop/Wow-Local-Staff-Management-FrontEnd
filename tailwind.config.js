/** @type {import('tailwindcss').Config} */
module.exports = {
 content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      // ------------------- Colors ----------------------
      colors: {
        primary: "#3366ff",
        secondary: "#9a9a9a",
        red:'#FF0404'
      },

      // ------------------- Screen BreakPoints ----------------------
      screens: {
        xs: { max: "599px" },
        // => @media (max-width: 599px) { ... }
        "lt-xs": { max: "598px" },
        // => @media (max-width: 598px) { ... }
        "gt-xs": { min: "600px" },
        // => @media (min-width: 600px) { ... }

        sm: { min: "600px", max: "767px" },
        // => @media (min-width: 600px and max-width: 767px) { ... }
        "lt-sm": { max: "599px" },
        // => @media (max-width: 598px) { ... }
        "gt-sm": { min: "768px" },
        // => @media (min-width: 768px) { ... }

        md: { min: "768px", max: "1023px" },
        // => @media (min-width: 768px and max-width: 1023px) { ... }
        "lt-md": { max: "767px" },
        // => @media (max-width: 767px) { ... }
        "gt-md": { min: "1024px" },
        // => @media (min-width: 1024px) { ... }

        lg: { min: "1024px", max: "1279px" },
        // => @media (min-width: 1024px and max-width: 1279px) { ... }
        "lt-lg": { max: "1023px" },
        // => @media (max-width: 1023px) { ... }
        "gt-lg": { min: "1278px" },
        // => @media (min-width: 1278px) { ... }

        xl: { min: "1280px", max: "1535px" },
        // => @media (min-width: 1280px and max-width: 1535px) { ... }
        "lt-xl": { max: "1279px" },
        // => @media (max-width: 1279px) { ... }
        "gt-xl": { min: "1534px" },
        // => @media (min-width: 1534px) { ... }

        xxl: { min: "1536px" },
        // => @media (min-width: 1536px) { ... }

        mobile: { max: "599px" },
        // => @media (min-width: 100px) { ... }

        tablet: "640px",
        // => @media (min-width: 640px) { ... }

        laptop: "1024px",
        // => @media (min-width: 1024px) { ... }

        desktop: "1280px",
        // => @media (min-width: 1280px) { ... }
      },

      gridTemplateColumns: {
        "auto-fit": "repeat(auto-fit, minmax(0, 1fr))",
        "auto-fill": "repeat(auto-fill, minmax(0, 1fr))",
      },
      gridTemplateRows: {
        "auto-fit": "repeat(auto-fit, minmax(0, 1fr))",
        "auto-fill": "repeat(auto-fill, minmax(0, 1fr))",
      },
    },
  },
  plugins: [],
}
