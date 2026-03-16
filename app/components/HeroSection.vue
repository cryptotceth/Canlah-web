<template>
  <section class="pt-32 pb-20 px-6 text-center min-h-[70vh] flex flex-col items-center justify-center">
    <div class="max-w-4xl mx-auto">
      <!-- Badges -->
      <div class="flex gap-3 justify-center mb-8">
        <span class="text-[11px] font-mono px-3 py-1 rounded-full border border-[#00d4ff]/40 text-[#00d4ff] bg-[#00d4ff]/5 tracking-wider">
          {{ $t('hero.badge1') }}
        </span>
        <span class="text-[11px] font-mono px-3 py-1 rounded-full border border-[#00e5a0]/40 text-[#00e5a0] bg-[#00e5a0]/5 tracking-wider">
          {{ $t('hero.badge2') }}
        </span>
      </div>

      <!-- Title -->
      <h1 class="font-display font-bold text-5xl md:text-7xl tracking-tight mb-6">
        <span v-html="$t('hero.title', { highlight: `<span class='bg-gradient-to-r from-[#00d4ff] to-[#0d47e0] bg-clip-text text-transparent'>${$t('hero.highlight')}</span>` })"></span>
      </h1>

      <!-- Description -->
      <p class="text-lg text-[#6b82b5] max-w-2xl mx-auto mb-10 leading-relaxed">
        {{ $t('hero.description') }}
      </p>

      <!-- CTAs -->
      <div class="flex gap-4 justify-center flex-wrap">
        <a href="#products"
          class="px-8 py-3 rounded-full font-semibold bg-gradient-to-r from-[#0d47e0] to-[#00d4ff] text-white hover:shadow-[0_0_30px_rgba(0,212,255,0.4)] transition-all hover:scale-[1.02]">
          {{ $t('hero.cta') }}
        </a>
        <a href="https://canmarket.ai" target="_blank"
          class="px-8 py-3 rounded-full font-semibold border border-white/20 text-white hover:border-[#00d4ff]/50 hover:bg-white/5 transition-all">
          {{ $t('hero.cta2') }}
        </a>
      </div>
    </div>
  </section>
</template>
