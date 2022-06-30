module.exports = {
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    theme: {
      extend: {
        colors: {
          'blue': '#1fb6ff',
          'purple': '#7e5bef',
          'pink': '#ff49db',
          'orange': '#ff7849',
          'green': '#13ce66',
          'yellow': '#ffc82c',
          'gray-dark': '#2f3e52',
          'gray': '#8492a6',
          'gray-light': '#d3dce6',
          'primary': '#454ADE',
          'gray-darkest': '#161D27'
        },
        backgroundImage: {
          'grid-pattern': "url('/pics/grid.png')",
        }
      },
    },
    plugins: [
      require('@tailwindcss/typography')
    ],  
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      mono: ['Space Mono', 'monospace']
    },
}