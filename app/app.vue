<script setup lang="ts">
const { t } = useI18n()
const brandLogos = [
  { src: '/brands/Alibaba.png', alt: 'Alibaba' },
  { src: '/brands/ByteDance.png', alt: 'ByteDance' },
  { src: '/brands/MaCann.png', alt: 'McCann' },
  { src: '/brands/Starbucks.png', alt: 'Starbucks' },
]
const brandsLoop = [...brandLogos, ...brandLogos, ...brandLogos, ...brandLogos]

useHead({
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Bai+Jamjuree:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=DM+Mono:wght@300;400;500&display=swap' },
  ],
  script: [
    { src: 'https://mcp.figma.com/mcp/html-to-design/capture.js', async: true },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'CANLAH AI',
        url: 'https://canlah.ai',
        logo: 'https://canlah.ai/logo-mascot.png',
        description: 'AI platform company building intelligent agents for marketing, sales, service, and commerce.',
        foundingDate: '2024',
        sameAs: [],
        contactPoint: {
          '@type': 'ContactPoint',
          email: 'hello@canlah.ai',
          contactType: 'sales',
        },
        offers: {
          '@type': 'Offer',
          name: 'CanMarket',
          description: 'AI Marketing Agent with Style Genome™ brand memory',
          url: 'https://app.canmarket.ai',
          price: '0',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
        },
      }),
    },
  ],
})

// Disable browser auto-scroll-restore + clear hash to prevent jumping to #pricing on refresh
onMounted(() => {
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
  if (location.hash) history.replaceState(null, '', location.pathname + location.search)
  window.scrollTo(0, 0)
})

useSeoMeta({
  title: 'CANLAH AI — AI Agents for Every Business Function',
  description: 'The AI platform company behind CanMarket, CanService, CanSales & CanCommerce. Intelligent agents that automate marketing, sales, service, and commerce.',
  ogType: 'website',
  ogSiteName: 'CANLAH AI',
  ogTitle: 'CANLAH AI — AI Agents for Every Business Function',
  ogDescription: 'Intelligent AI agents that automate marketing, sales, service, and commerce. Style Genome™ brand memory ensures every output looks like your team made it. Trusted by Haleon, Starbucks, Publicis.',
  ogUrl: 'https://canlah.ai',
  twitterCard: 'summary_large_image',
  twitterTitle: 'CANLAH AI — AI Agents for Every Business Function',
  twitterDescription: 'AI agents that automate marketing, sales, service & commerce with brand memory. Start free.',
})
</script>

<template>
  <div class="min-h-screen bg-[#0a090f] text-[#efefe5] font-sans selection:bg-[#815ff7] selection:text-[#efefe5] relative overflow-x-clip crosshair-frame">
    <i aria-hidden="true"></i>
    <i class="edge top" aria-hidden="true"></i>
    <i class="edge bottom" aria-hidden="true"></i>
    <i class="edge left" aria-hidden="true"></i>
    <i class="edge right" aria-hidden="true"></i>

    <!-- chaingpt-style 3 vertical decorative lines — sits BEHIND content (z-0) so mascot covers them -->
    <div class="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
      <div class="absolute top-0 bottom-0 left-1/4  w-px bg-[#efefe5]/25"></div>
      <div class="absolute top-0 bottom-0 left-1/2  w-px bg-[#efefe5]/30"></div>
      <div class="absolute top-0 bottom-0 left-3/4  w-px bg-[#efefe5]/25"></div>
    </div>

    <svg class="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
      <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/></filter>
      <rect width="100%" height="100%" filter="url(#grain)"/>
    </svg>

    <div class="fixed inset-0 pointer-events-none z-0 opacity-50"
      style="background-image: radial-gradient(circle, rgba(189,209,246,0.04) 1px, transparent 1px); background-size: 40px 40px;">
    </div>

    <div class="fixed w-[700px] h-[700px] rounded-[2px] blur-[140px] opacity-[0.05] pointer-events-none z-0 bg-[#91B3F0] -top-[200px] -left-[200px]"></div>
    <div class="fixed w-[500px] h-[500px] rounded-[2px] blur-[120px] opacity-[0.04] pointer-events-none z-0 bg-[#BDD1F6] top-[60%] -right-[100px]"></div>

    <!-- Brand logo marquee — full-width fixed strip flush with viewport bottom -->
    <div class="fixed bottom-0 left-0 right-0 z-[20] pointer-events-none bg-[#0B0A10]/92 backdrop-blur-md border-t border-[#efefe5]/10 py-3 sm:py-4">
      <div class="w-full overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)]">
        <div class="flex items-center gap-12 sm:gap-16 lg:gap-24 anim-logo-loop whitespace-nowrap">
          <img v-for="(b, bi) in brandsLoop" :key="bi" :src="b.src" :alt="b.alt" class="h-5 sm:h-6 w-auto opacity-65 flex-shrink-0 select-none" loading="lazy" draggable="false" />
        </div>
      </div>
    </div>

    <!-- chaingpt vertical labels (right side) — INTRO / MENU / SCROLL -->
    <div class="hidden xl:flex flex-col gap-6 fixed right-4 top-1/2 -translate-y-1/2 z-30 items-center pointer-events-none">
      <span class="vlabel">INTRO</span>
      <div class="flex flex-col gap-1.5">
        <span v-for="i in 6" :key="i" class="w-1 h-1 rounded-[2px] bg-[#efefe5]/30"></span>
      </div>
      <span class="vlabel">MENU</span>
    </div>

    <div class="relative z-[1]">
      <a href="#main-content"
        class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:rounded-[2px] focus:bg-[#91B3F0] focus:text-[#0a090f] focus:text-sm focus:font-bold focus:shadow-lg focus:outline-none">
        Skip to main content
      </a>

      <NuxtPage />
    </div>
  </div>
</template>
