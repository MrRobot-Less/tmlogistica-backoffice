/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/views/**/*.{html,njk}'],
  theme: {
    
  },
  plugins: [
    {
      tailwindcss: {},
      autoprefixer: {},
    },
  ],
};