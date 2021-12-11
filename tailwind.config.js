module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    backgroundColor: theme => ({
      ...theme('colors'),
      'primary': '#E1E7F7',
      'pink': '#DE2B64',
      'lightPrimary': '#B6C8EB',
      'white': '#fff'
    }),
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
