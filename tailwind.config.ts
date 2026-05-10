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
        display: ['"Bai Jamjuree"', 'system-ui', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        muted: '#BABABA',
      },
    },
  },
  plugins: [],
}
