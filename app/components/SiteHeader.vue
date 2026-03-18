<script setup lang="ts">
const { locale, locales, setLocale } = useI18n()
const isMenuOpen = ref(false)
const scrolled = ref(false)

onMounted(() => {
  const onScroll = () => { scrolled.value = window.scrollY > 60 }
  window.addEventListener('scroll', onScroll, { passive: true })
  onUnmounted(() => window.removeEventListener('scroll', onScroll))
})
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 backdrop-blur-md transition-all duration-300"
    :class="scrolled
      ? 'bg-[#050d1a]/95 border-b border-white/10 shadow-[0_4px_40px_rgba(0,0,0,0.4)]'
      : 'bg-[#050d1a]/70 border-b border-white/5'"
  >
    <div class="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between gap-6">

      <!-- Logo -->
      <a href="/" class="flex items-center gap-3 flex-shrink-0">
        <div class="w-9 h-9 rounded-lg bg-gradient-to-br from-[#0d47e0] to-[#00d4ff] flex items-center justify-center text-base shadow-[0_0_20px_rgba(0,212,255,0.4)]">⬡</div>
        <span class="font-display font-bold text-xl tracking-wide text-white">CANLAH AI</span>
      </a>

      <!-- Desktop Nav -->
      <nav class="hidden md:flex items-center gap-6 flex-1 justify-center">
        <a href="#products" class="text-sm text-[#6b82b5] hover:text-white transition-colors">{{ $t('nav.products') }}</a>
        <a href="#platform" class="text-sm text-[#6b82b5] hover:text-white transition-colors">{{ $t('nav.platform') }}</a>
        <a href="#faq" class="text-sm text-[#6b82b5] hover:text-white transition-colors">{{ $t('nav.faq') }}</a>
      </nav>

      <!-- Desktop right actions -->
      <div class="hidden md:flex items-center gap-3 flex-shrink-0">
        <!-- Language switcher -->
        <select
          :value="locale"
          @change="setLocale(($event.target as HTMLSelectElement).value)"
          class="bg-transparent border border-white/10 rounded-md px-2 py-1 text-xs text-[#6b82b5] cursor-pointer outline-none hover:border-white/25 transition-colors"
        >
          <option v-for="loc in locales" :key="loc.code" :value="loc.code" class="bg-[#0a1628]">
            {{ loc.name }}
          </option>
        </select>

        <!-- Book Demo ghost -->
        <a href="mailto:hello@canlah.ai"
          class="text-sm text-[#6b82b5] hover:text-white transition-colors px-3 py-2">
          {{ $t('nav.demo') }}
        </a>

        <!-- Try Free primary CTA -->
        <a href="https://app.canmarket.ai" target="_blank"
          class="group text-sm font-semibold px-5 py-2 rounded-full bg-gradient-to-r from-[#0d47e0] to-[#00d4ff] text-white hover:shadow-[0_0_24px_rgba(0,212,255,0.45)] transition-all hover:scale-[1.03] flex items-center gap-1.5">
          {{ $t('nav.tryFree') }}
          <span class="group-hover:translate-x-0.5 transition-transform text-xs">→</span>
        </a>
      </div>

      <!-- Mobile menu toggle -->
      <button @click="isMenuOpen = !isMenuOpen" class="md:hidden text-white p-1" :aria-label="isMenuOpen ? 'Close menu' : 'Open menu'">
        <span class="text-xl leading-none">{{ isMenuOpen ? '✕' : '☰' }}</span>
      </button>
    </div>

    <!-- Mobile menu -->
    <div v-if="isMenuOpen" class="md:hidden border-t border-white/8 bg-[#050d1a]/98 px-6 py-5 flex flex-col gap-4">
      <a href="#products" class="text-sm text-[#8ba4cc] py-1" @click="isMenuOpen = false">{{ $t('nav.products') }}</a>
      <a href="#platform" class="text-sm text-[#8ba4cc] py-1" @click="isMenuOpen = false">{{ $t('nav.platform') }}</a>
      <a href="#faq" class="text-sm text-[#8ba4cc] py-1" @click="isMenuOpen = false">{{ $t('nav.faq') }}</a>
      <div class="border-t border-white/8 pt-4 flex flex-col gap-3">
        <select :value="locale" @change="setLocale(($event.target as HTMLSelectElement).value)"
          class="bg-transparent border border-white/10 rounded-md px-2 py-1 text-xs text-[#6b82b5] w-fit">
          <option v-for="loc in locales" :key="loc.code" :value="loc.code" class="bg-[#0a1628]">{{ loc.name }}</option>
        </select>
        <a href="mailto:hello@canlah.ai" class="text-sm text-[#6b82b5]" @click="isMenuOpen = false">{{ $t('nav.demo') }}</a>
        <a href="https://app.canmarket.ai" target="_blank"
          class="text-sm font-semibold px-5 py-2.5 rounded-full bg-gradient-to-r from-[#0d47e0] to-[#00d4ff] text-white text-center"
          @click="isMenuOpen = false">
          {{ $t('nav.tryFree') }} →
        </a>
      </div>
    </div>
  </header>
</template>
