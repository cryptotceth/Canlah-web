<script setup lang="ts">
const { locale, locales, setLocale } = useI18n()
const isMenuOpen = ref(false)
</script>

<template>
  <header class="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#050d1a]/80 border-b border-white/5">
    <div class="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
      <!-- Logo -->
      <a href="/" class="flex items-center gap-3">
        <div class="w-9 h-9 rounded-lg bg-gradient-to-br from-[#0d47e0] to-[#00d4ff] flex items-center justify-center text-base shadow-[0_0_20px_rgba(0,212,255,0.4)]">
          ⬡
        </div>
        <span class="font-display font-bold text-xl tracking-wide text-white">CANLAH AI</span>
      </a>

      <!-- Nav -->
      <nav class="hidden md:flex items-center gap-8">
        <a href="#products" class="text-sm text-[#6b82b5] hover:text-[#00d4ff] transition-colors">{{ $t('nav.products') }}</a>
        <a href="#platform" class="text-sm text-[#6b82b5] hover:text-[#00d4ff] transition-colors">{{ $t('nav.platform') }}</a>

        <!-- Language switcher -->
        <select
          :value="locale"
          @change="setLocale(($event.target as HTMLSelectElement).value)"
          class="bg-transparent border border-white/10 rounded-md px-2 py-1 text-xs text-[#6b82b5] cursor-pointer outline-none"
        >
          <option v-for="loc in locales" :key="loc.code" :value="loc.code" class="bg-[#0a1628]">
            {{ loc.name }}
          </option>
        </select>

        <a href="https://canmarket.ai" target="_blank"
          class="text-sm font-medium px-5 py-2 rounded-full border border-[#00d4ff]/30 text-[#00d4ff] hover:bg-[#00d4ff]/10 transition-all">
          {{ $t('nav.contact') }}
        </a>
      </nav>

      <!-- Mobile menu button -->
      <button @click="isMenuOpen = !isMenuOpen" class="md:hidden text-white">
        <span class="text-2xl">{{ isMenuOpen ? '✕' : '☰' }}</span>
      </button>
    </div>

    <!-- Mobile menu -->
    <div v-if="isMenuOpen" class="md:hidden px-6 pb-4 flex flex-col gap-3 bg-[#050d1a]/95">
      <a href="#products" class="text-sm text-[#6b82b5] py-2" @click="isMenuOpen = false">{{ $t('nav.products') }}</a>
      <a href="#platform" class="text-sm text-[#6b82b5] py-2" @click="isMenuOpen = false">{{ $t('nav.platform') }}</a>
      <select :value="locale" @change="setLocale(($event.target as HTMLSelectElement).value)"
        class="bg-transparent border border-white/10 rounded-md px-2 py-1 text-xs text-[#6b82b5] w-fit">
        <option v-for="loc in locales" :key="loc.code" :value="loc.code" class="bg-[#0a1628]">{{ loc.name }}</option>
      </select>
    </div>
  </header>
</template>
