module.exports = {
  content: ["app/**/*.tsx"],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            a: {
              color: "#3b82f6",
              "&:visited": {
                color: "#7c3aed",
              },
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
