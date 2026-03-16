import type { Config } from 'tailwindcss'
export default <Partial<Config>>{
  content: [
    './app/app.vue',
    './app/components/**/*.{vue,js,ts}',
    './nuxt.config.{js,ts}'
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
        sans: ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
