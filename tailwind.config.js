/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: [
    './views/**/*.pug',
    './views/*.pug',
    './views/layout/*.pug',
    './views/errors/*.pug',
    './views/icons/*.pug',
    './views/ui/*.pug',
    './views/ui/badges/*.pug',
    './views/ui/card/*.pug',
    './views/ui/card/cardOffer.pug',
    './public/js/*.js',
    './public/css/*.css',
    './public/css/tailwind/*.css'
  ],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ['Satoshi', 'sans-serif']
      },
      screens: {
        xs: '420px'
      },
      animation: {
        border: 'background ease infinite'
      },
      keyframes: {
        background: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' }
        }
      }
    }
  },
  plugins: []
}
