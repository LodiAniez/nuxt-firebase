module.exports = {
  purge: [],
  darkMode: 'class', // or 'media' or 'class'
  theme: {},
  variants: {
    extend: {
      backgroundColor: [
        'dark',
        'dark-hover',
        'dark-group-hover',
        'dark-even',
        'dark-odd',
      ],
      margin: {
        86: '22rem',
      },
      borderColor: ['dark', 'dark-focus', 'dark-focus-within'],
      textColor: ['dark', 'dark-hover', 'dark-active'],
    },
  },
  plugins: [],
}
