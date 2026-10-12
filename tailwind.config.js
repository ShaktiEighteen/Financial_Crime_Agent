/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        serif: ['Newsreader', 'Georgia', 'serif'],
        sans: ['Newsreader', 'Georgia', 'serif'],
        mono: ['"Space Mono"', 'Consolas', 'monospace'],
      },
      colors: {
        paper: {
          base: '#121110',
          card: '#1a1917',
          raised: '#22201d',
          sheet: '#282622',
        },
        docket: {
          border: '#2c2924',
          'border-strong': '#3f3b34',
          rule: '#23211d',
          amber: '#c27803',
          'amber-bg': '#26180a',
          'amber-border': '#5a3507',
        },
        ink: {
          DEFAULT: '#ece7de',
          bright: '#faf7f2',
          muted: '#9e988a',
          faint: '#656157',
        },
        crimson: {
          DEFAULT: '#c92a2a',
          bright: '#e03131',
          bg: '#251212',
          border: '#5c1919',
        },
      },
    },
  },
  plugins: [],
}
