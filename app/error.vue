<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

const is404 = computed(() => props.error.statusCode === 404)

const handleClear = () => clearError({ redirect: '/' })
</script>

<template>
  <div class="min-h-screen bg-[#070d16] text-[#e8f0ff] flex items-center justify-center px-6 relative overflow-hidden">

    <!-- Film grain -->
    <svg class="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-[0.028]" xmlns="http://www.w3.org/2000/svg">
      <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/></filter>
      <rect width="100%" height="100%" filter="url(#grain)"/>
    </svg>

    <!-- Ambient glow -->
    <div class="fixed w-[500px] h-[500px] rounded-full blur-[140px] opacity-[0.06] pointer-events-none bg-[#0d3ab0] top-[20%] left-[30%]"></div>

    <div class="relative z-[1] text-center max-w-lg">
      <!-- Error code -->
      <div class="font-display font-extrabold text-[120px] md:text-[160px] leading-none bg-gradient-to-b from-white/20 to-white/5 bg-clip-text text-transparent select-none mb-4">
        {{ error.statusCode }}
      </div>

      <!-- Message -->
      <h1 class="font-display font-bold text-2xl md:text-3xl text-white mb-4">
        {{ is404 ? 'Page not found' : 'Something went wrong' }}
      </h1>
      <p class="text-[15px] text-[#5a7090] mb-10 leading-relaxed">
        {{ is404
          ? 'The page you\'re looking for doesn\'t exist or has been moved. Let\'s get you back on track.'
          : 'An unexpected error occurred. Try refreshing or head back to the homepage.' }}
      </p>

      <!-- CTAs -->
      <div class="flex gap-4 justify-center flex-wrap">
        <button
          @click="handleClear"
          class="group px-8 py-3.5 rounded-full font-semibold text-sm bg-gradient-to-r from-[#0d47e0] to-[#00d4ff] text-white hover:shadow-[0_0_30px_rgba(0,212,255,0.4)] transition-all hover:scale-[1.03] flex items-center gap-2"
        >
          Back to homepage
          <span class="group-hover:translate-x-1 transition-transform">→</span>
        </button>
        <a href="https://app.canmarket.ai" target="_blank"
          class="px-8 py-3.5 rounded-full font-semibold text-sm border border-white/15 text-white/80 hover:border-[#00d4ff]/50 hover:text-white hover:bg-white/5 transition-all">
          Try CanMarket Free
        </a>
      </div>

      <!-- Logo -->
      <div class="mt-16 flex items-center justify-center gap-2 opacity-40">
        <div class="w-6 h-6 rounded-md bg-gradient-to-br from-[#0d47e0] to-[#00d4ff] flex items-center justify-center text-[10px]">⬡</div>
        <span class="font-display font-bold text-sm tracking-wide">CANLAH AI</span>
      </div>
    </div>
  </div>
</template>
