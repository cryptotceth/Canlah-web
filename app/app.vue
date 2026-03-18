<script setup lang="ts">
useHead({
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&family=Outfit:wght@300;400;500;600&display=swap' },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'CANLAH AI',
        url: 'https://canlah.ai',
        logo: 'https://canlah.ai/favicon.svg',
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
  <div class="min-h-screen bg-[#070d16] text-[#e8f0ff] font-sans selection:bg-[#00d4ff] selection:text-black relative overflow-x-hidden">

    <!-- Film grain texture — 2025 premium feel -->
    <svg class="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-[0.028]" xmlns="http://www.w3.org/2000/svg">
      <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/></filter>
      <rect width="100%" height="100%" filter="url(#grain)"/>
    </svg>

    <!-- Subtle dot grid background — toned down -->
    <div class="fixed inset-0 pointer-events-none z-0"
      style="background-image: radial-gradient(circle, rgba(100,150,255,0.025) 1px, transparent 1px); background-size: 40px 40px; opacity: 0.5;">
    </div>

    <!-- Ambient glow blobs — softer, less saturated -->
    <div class="fixed w-[700px] h-[700px] rounded-full blur-[140px] opacity-[0.05] pointer-events-none z-0 bg-[#0d3ab0] -top-[200px] -left-[200px]"></div>
    <div class="fixed w-[500px] h-[500px] rounded-full blur-[120px] opacity-[0.04] pointer-events-none z-0 bg-[#1090c8] top-[60%] -right-[100px]"></div>
    <div class="fixed w-[400px] h-[400px] rounded-full blur-[120px] opacity-[0.035] pointer-events-none z-0 bg-[#4a6aaf] top-[30%] left-[40%]"></div>

    <div class="relative z-[1]">
      <SiteHeader />
      <HeroSection />
      <StatsSection />
      <HowItWorks />
      <TestimonialsSection />
      <ComparisonSection />
      <ProductsSection />
      <PlatformSection />
      <StudioSection />
      <PricingSection />
      <FaqSection />
      <CtaSection />
      <SiteFooter />
      <FloatingCta />
    </div>
  </div>
</template>
