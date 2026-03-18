<template>
  <section class="py-24 px-6">
    <div class="max-w-[900px] mx-auto">
      <div v-reveal class="relative rounded-3xl overflow-hidden border border-[#00d4ff]/25 bg-gradient-to-br from-[#071035] via-[#0b1945] to-[#060d22] p-12 md:p-16 text-center">

        <!-- Top glow line -->
        <div class="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00d4ff]/70 to-transparent"></div>

        <!-- Background radial glow -->
        <div class="absolute inset-0 pointer-events-none"
          style="background: radial-gradient(ellipse 70% 50% at 50% 0%, rgba(13,71,224,0.18), transparent)"></div>

        <div class="relative z-[1]">
          <!-- Label -->
          <div class="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-[#00e5a0]/25 bg-[#00e5a0]/5">
            <span class="w-1.5 h-1.5 rounded-full bg-[#00e5a0] shadow-[0_0_8px_#00e5a0] animate-pulse"></span>
            <span class="text-[11px] font-mono text-[#00e5a0] tracking-[2px]">{{ $t('cta.badge') }}</span>
          </div>

          <!-- Headline -->
          <h2 class="font-display font-extrabold text-[38px] md:text-[52px] text-white leading-[1.1] tracking-tight mb-5">
            {{ $t('cta.headline') }}
          </h2>

          <!-- Sub -->
          <p class="text-[16px] text-[#6080a8] max-w-xl mx-auto mb-10 leading-relaxed">
            {{ $t('cta.sub') }}
          </p>

          <!-- CTA buttons -->
          <div class="flex gap-4 justify-center flex-wrap mb-7">
            <a href="https://app.canmarket.ai" target="_blank"
              class="group px-9 py-4 rounded-full font-bold text-[15px] bg-gradient-to-r from-[#0d47e0] to-[#00d4ff] text-white hover:shadow-[0_0_50px_rgba(0,212,255,0.5)] transition-all hover:scale-[1.04] flex items-center gap-2">
              {{ $t('cta.primary') }}
              <span class="group-hover:translate-x-1 transition-transform">→</span>
            </a>
            <a href="mailto:hello@canlah.ai"
              class="px-9 py-4 rounded-full font-semibold text-[15px] border border-white/15 text-white/80 hover:border-[#00d4ff]/50 hover:text-white hover:bg-white/5 transition-all">
              {{ $t('cta.secondary') }}
            </a>
          </div>

          <!-- Reassurance microcopy -->
          <div class="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <span v-for="note in [$t('cta.note1'), $t('cta.note2'), $t('cta.note3')]" :key="note"
              class="flex items-center gap-1.5 text-[12px] text-[#3d5880] font-mono">
              <span class="text-[#00e5a0]">✓</span> {{ note }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
