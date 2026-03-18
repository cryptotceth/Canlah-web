<script setup lang="ts">
const visible = ref(false)

onMounted(() => {
  const onScroll = () => {
    const scrollY = window.scrollY
    const docHeight = document.documentElement.scrollHeight
    const winHeight = window.innerHeight
    const nearBottom = scrollY + winHeight > docHeight - 400

    visible.value = scrollY > 600 && !nearBottom
  }
  window.addEventListener('scroll', onScroll, { passive: true })
  onUnmounted(() => window.removeEventListener('scroll', onScroll))
})
</script>

<template>
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    leave-active-class="transition-all duration-200 ease-in"
    enter-from-class="translate-y-full opacity-0"
    leave-to-class="translate-y-full opacity-0"
  >
    <div
      v-show="visible"
      class="fixed bottom-0 left-0 right-0 z-40 md:bottom-6 md:left-auto md:right-6 md:w-auto"
    >
      <!-- Mobile: full-width bar -->
      <div class="md:hidden flex items-center justify-between gap-3 px-5 py-3 bg-[#070d16]/95 backdrop-blur-lg border-t border-white/10 shadow-[0_-4px_30px_rgba(0,0,0,0.5)]">
        <div class="min-w-0">
          <div class="text-[13px] font-semibold text-white truncate">{{ $t('floatingCta.title') }}</div>
          <div class="text-[11px] text-[#5a7090] truncate">{{ $t('floatingCta.sub') }}</div>
        </div>
        <a href="https://app.canmarket.ai" target="_blank"
          class="flex-shrink-0 px-5 py-2.5 rounded-full text-[13px] font-semibold bg-gradient-to-r from-[#0d47e0] to-[#00d4ff] text-white shadow-[0_0_20px_rgba(0,212,255,0.3)]">
          {{ $t('floatingCta.cta') }} →
        </a>
      </div>

      <!-- Desktop: compact pill -->
      <div class="hidden md:flex items-center gap-3 px-5 py-3 rounded-2xl bg-[#070d16]/90 backdrop-blur-lg border border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.5)]">
        <span class="text-[13px] text-[#7090b8]">{{ $t('floatingCta.sub') }}</span>
        <a href="https://app.canmarket.ai" target="_blank"
          class="group px-5 py-2 rounded-full text-[13px] font-semibold bg-gradient-to-r from-[#0d47e0] to-[#00d4ff] text-white hover:shadow-[0_0_24px_rgba(0,212,255,0.4)] transition-all hover:scale-[1.03] flex items-center gap-1.5">
          {{ $t('floatingCta.cta') }}
          <span class="group-hover:translate-x-0.5 transition-transform">→</span>
        </a>
      </div>
    </div>
  </Transition>
</template>
