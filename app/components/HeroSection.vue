<script setup lang="ts">
const words = ['Marketing', 'Sales', 'Service', 'Commerce']
const currentWord = ref(0)
const displayed = ref(words[0])
const isAnimating = ref(false)

let interval: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  interval = setInterval(() => {
    isAnimating.value = true
    setTimeout(() => {
      currentWord.value = (currentWord.value + 1) % words.length
      displayed.value = words[currentWord.value]
      isAnimating.value = false
    }, 300)
  }, 2400)
})

onUnmounted(() => {
  if (interval) clearInterval(interval)
})
</script>

<template>
  <section id="main-content" role="main" aria-label="CANLAH AI — AI Agents for Every Business Function" class="pt-28 pb-16 px-6 text-center flex flex-col items-center justify-center relative">
    <div v-reveal class="max-w-5xl mx-auto">

      <!-- Top badge -->
      <div class="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-[#00e5a0]/30 bg-[#00e5a0]/5">
        <span class="w-1.5 h-1.5 rounded-full bg-[#00e5a0] shadow-[0_0_8px_#00e5a0] animate-pulse"></span>
        <span class="text-[11px] font-mono text-[#00e5a0] tracking-[2px]">{{ $t('hero.badge1') }} · {{ $t('hero.badge2') }}</span>
      </div>

      <!-- Main headline -->
      <h1 class="font-display font-bold text-[48px] md:text-[72px] leading-[1.08] tracking-[-0.02em] mb-6">
        <span class="text-white">{{ $t('hero.line1') }}<br /></span>
        <span class="relative inline-block">
          <span
            class="bg-gradient-to-r from-[#00d4ff] via-[#3b7fff] to-[#0d47e0] bg-clip-text text-transparent transition-all duration-300"
            :class="isAnimating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'"
            style="display:inline-block"
          >{{ displayed }}</span>
        </span>
        <span class="text-white">&nbsp;{{ $t('hero.line3') }}</span>
      </h1>

      <!-- Subheadline -->
      <p class="text-[17px] text-[#7090c8] max-w-2xl mx-auto mb-10 leading-relaxed">
        {{ $t('hero.description') }}
      </p>

      <!-- CTA row -->
      <div class="flex gap-4 justify-center flex-wrap mb-14">
        <a href="https://app.canmarket.ai" target="_blank"
          class="group px-8 py-3.5 rounded-full font-semibold text-sm bg-gradient-to-r from-[#0d47e0] to-[#00d4ff] text-white hover:shadow-[0_0_40px_rgba(0,212,255,0.5)] transition-all hover:scale-[1.03] flex items-center gap-2">
          {{ $t('hero.cta') }}
          <span class="group-hover:translate-x-1 transition-transform">→</span>
        </a>
        <a href="#products"
          class="px-8 py-3.5 rounded-full font-semibold text-sm border border-white/15 text-white/80 hover:border-[#00d4ff]/50 hover:text-white hover:bg-white/5 transition-all">
          {{ $t('hero.cta2') }}
        </a>
      </div>

      <!-- Trust strip — client logos -->
      <div class="border-t border-white/5 pt-10">
        <p class="text-[11px] font-mono text-[#4a5a7a] tracking-[2px] mb-6">{{ $t('hero.trustedBy') }}</p>
        <div class="flex flex-wrap justify-center items-center gap-x-10 gap-y-4">
          <span v-for="brand in [$t('hero.brand1'), $t('hero.brand2'), $t('hero.brand3'), $t('hero.brand4'), $t('hero.brand5'), $t('hero.brand6')]" :key="brand"
            class="text-sm font-semibold text-[#3d5080] tracking-widest hover:text-[#7090c8] transition-colors cursor-default select-none">
            {{ brand }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
