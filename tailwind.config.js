module.exports = {
  content: [
    './src/**/*{html,js,jsx}',
  ],
  // darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        norway: "url('https://images.pexels.com/photos/290595/pexels-photo-290595.jpeg?auto=compress&cs=tinysrgb&w=1600')",
      },
      backgroundColor: theme => ({
        'primary': '#002a52',
        'secondary': '#005251',
        'tertiary': '#000152',
      }),
      textColor: {
        'primary': '#002a52',
        'secondary': '#005251',
        'tertiary': '#000152',
      },
      fontFamily: {
        Montserrat: ["Montserrat", "sans-serif"],
      },
      ringColor: {
        'primary': '#002a52',
        'secondary': '#005251',
        'tertiary': '#000152',
      },
    },
  },
  plugins: [
    // require('@tailwindcss/forms'),
  ],
};