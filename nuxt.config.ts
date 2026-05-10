export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  css: ['~/assets/css/tailwind.css'],
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/seo', '@nuxtjs/i18n'],
  i18n: {
    locales: [
      { code: 'en', iso: 'en-US', file: 'en.json', name: 'English' },
      { code: 'zh', iso: 'zh-CN', file: 'zh.json', name: '简体中文' },
      { code: 'zh-tw', iso: 'zh-TW', file: 'zh-tw.json', name: '繁體中文' }
    ],
    defaultLocale: 'en',
    lazy: true,
    langDir: 'locales',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: false
  },
  site: {
    url: 'https://canlah.ai',
    name: 'CANLAH AI',
    description: 'AI Agents for Every Business Function.',
    defaultLocale: 'en',
  },
  seo: { redirectToCanonicalSiteUrl: true }
})
