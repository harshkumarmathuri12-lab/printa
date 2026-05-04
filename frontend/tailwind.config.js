/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,jsx}', './components/**/*.{js,jsx}', './editor/**/*.{js,jsx}', './lib/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#17211f',
        sea: '#1f6f68',
        coral: '#d1495b',
        paper: '#f7f8f3',
        wheat: '#fff7ed'
      },
      boxShadow: {
        panel: '0 12px 36px rgba(23, 33, 31, 0.08)'
      }
    }
  },
  plugins: []
};
