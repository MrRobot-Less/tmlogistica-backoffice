/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.{html,njk}"],
  theme: {
    extend: {
      height: {
        'dashboard-height': 'calc(100dvh - 5rem)'
      }
    }
  },
  plugins: [
    {
      tailwindcss: {},
      autoprefixer: {},
    },
  ],
};