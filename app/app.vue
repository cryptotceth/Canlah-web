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
  description: 'Intelligent automation for marketing, sales, service, and commerce.',
})
</script>

<template>
  <div class="min-h-screen bg-[#050d1a] text-[#e8f0ff] font-sans selection:bg-[#00d4ff] selection:text-black relative overflow-x-hidden">
    <!-- Animated grid background -->
    <div class="fixed inset-0 pointer-events-none z-0 opacity-100"
      style="background-image: linear-gradient(rgba(0,212,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.04) 1px, transparent 1px); background-size: 60px 60px;">
    </div>

    <!-- Ambient glow blobs -->
    <div class="fixed w-[500px] h-[500px] rounded-full blur-[80px] opacity-[0.12] pointer-events-none z-0 bg-[#0d47e0] -top-[100px] -left-[100px] animate-pulse"></div>
    <div class="fixed w-[400px] h-[400px] rounded-full blur-[80px] opacity-[0.12] pointer-events-none z-0 bg-[#00d4ff] -bottom-[50px] -right-[50px] animate-pulse"></div>
    <div class="fixed w-[300px] h-[300px] rounded-full blur-[80px] opacity-[0.12] pointer-events-none z-0 bg-[#00e5a0] top-[40%] left-[50%] animate-pulse"></div>

    <div class="relative z-[1]">
      <SiteHeader />
      <HeroSection />
      <ProductsSection />
      <PlatformSection />
      <StudioSection />
      <SiteFooter />
    </div>
  </div>
</template>
