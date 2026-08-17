export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: { sans: ["Vazirmatn", "Tahoma", "Arial", "sans-serif"] },
      colors: {
        somak: {
          950: "#120304",
          900: "#1a0507",
          850: "#230709",
          800: "#2d090b",
          700: "#3c0d10",
          600: "#5b1619",
          500: "#7b2525",
          gold: "#e6a62e",
          gold2: "#f2c55d",
          cream: "#f8ead0",
          muted: "#d7bfa8",
        },
      },
      boxShadow: {
        gold: "0 0 0 1px rgba(230,166,46,.22),0 18px 50px rgba(0,0,0,.28)",
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg,#f5d26b,#d9931e)",
      },
    },
  },
  plugins: [],
};
