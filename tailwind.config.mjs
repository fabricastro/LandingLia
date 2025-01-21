
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        textos: ['Alegreya Sans', 'sans-serif'],
      },
      colors: {
        primary: {
          default: '#2B4437',
          oscuro: '#2B4437',
        },
        secondary: {
          default: '#A98E6B',
          claro: "#DBD4CC",
          oscuro: "#91775C",
          texto: "#A78C6B",
        },
      },
      backgroundImage: {
        'hero': "url('/home.webp')",
      },
    },
  },
  plugins: [],
}