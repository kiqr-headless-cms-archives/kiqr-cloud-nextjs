/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

const PRIMARY_COLOR = process.env.TAILWIND_PRIMARY_COLOR || 'cyan'
const NEUTRAL_COLOR = process.env.TAILWIND_NEUTRAL_COLOR || 'slate'

module.exports = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: colors[PRIMARY_COLOR],
        neutral: colors[NEUTRAL_COLOR],
      },
    },
  },
  plugins: [],
  corePlugins: { preflight: false },
}
