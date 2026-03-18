<script setup lang="ts">
useHead({
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&family=Outfit:wght@300;400;500;600&display=swap' },
  ]
})

useSeoMeta({
  title: 'CANLAH AI — AI Agents for Every Business Function',
  description: 'The AI platform company behind CanMarket, CanService, CanSales & CanCommerce. Intelligent agents that automate marketing, sales, service, and commerce.',
})
</script>

<template>
  <div class="min-h-screen bg-[#050d1a] text-[#e8f0ff] font-sans selection:bg-[#00d4ff] selection:text-black relative overflow-x-hidden">

    <!-- Subtle dot grid background -->
    <div class="fixed inset-0 pointer-events-none z-0"
      style="background-image: radial-gradient(circle, rgba(0,212,255,0.06) 1px, transparent 1px); background-size: 40px 40px; opacity: 0.6;">
    </div>

    <!-- Ambient glow blobs -->
    <div class="fixed w-[700px] h-[700px] rounded-full blur-[120px] opacity-[0.07] pointer-events-none z-0 bg-[#0d47e0] -top-[200px] -left-[200px]"></div>
    <div class="fixed w-[500px] h-[500px] rounded-full blur-[100px] opacity-[0.07] pointer-events-none z-0 bg-[#00d4ff] top-[60%] -right-[100px]"></div>
    <div class="fixed w-[400px] h-[400px] rounded-full blur-[100px] opacity-[0.05] pointer-events-none z-0 bg-[#6496ff] top-[30%] left-[40%]"></div>

    <div class="relative z-[1]">
      <SiteHeader />
      <HeroSection />
      <StatsSection />
      <TeamSection />
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
    </div>
  </div>
</template>
