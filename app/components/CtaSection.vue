<template>
  <section class="section px-6">
    <div class="max-w-[900px] mx-auto">
      <div v-reveal class="relative rounded-[2px] overflow-hidden border border-[#BDD1F6]/25 bg-gradient-to-br from-[#0B0A10] via-[#0B0A10] to-[#0a090f] p-12 md:p-16 text-center">

        <!-- Top glow line -->
        <div class="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#BDD1F6]/70 to-transparent"></div>

        <!-- Background radial glow -->
        <div class="absolute inset-0 pointer-events-none"
          style="background: radial-gradient(ellipse 70% 50% at 50% 0%, rgba(145,179,240,0.18), transparent)"></div>

        <div class="relative z-[1]">
          <!-- Label -->
          <div class="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-[2px] border border-[#BDD1F6]/25 bg-[#BDD1F6]/5">
            <span class="w-1.5 h-1.5 rounded-[2px] bg-[#BDD1F6] shadow-[0_0_8px_#BDD1F6] animate-pulse"></span>
            <span class="text-[11px] font-mono text-[#BDD1F6] tracking-[2px]">{{ $t('cta.badge') }}</span>
          </div>

          <!-- Headline -->
          <h2 class="font-display font-bold text-[38px] md:text-[52px] text-[#efefe5] leading-[1.2] tracking-tight mb-5">
            {{ $t('cta.headline') }}
          </h2>

          <!-- Sub -->
          <p class="text-[16px] text-[#BABABA] max-w-xl mx-auto mb-10 leading-[1.5]">
            {{ $t('cta.sub') }}
          </p>

          <!-- CTA buttons -->
          <div class="flex gap-4 justify-center flex-wrap mb-7">
            <a href="https://app.canmarket.ai" target="_blank"
              class="border-rainbow rounded-[2px] inline-flex items-center gap-3 px-7 py-4 cockpit-label !text-[12px] !text-[#efefe5] hover:opacity-90 transition-opacity whitespace-nowrap">
              <span class="inline-grid grid-cols-2 gap-[2px]"><span v-for="d in 4" :key="d" class="w-[3px] h-[3px] bg-current rounded-[2px]"></span></span>
              {{ $t('cta.primary') }} <span>→</span>
            </a>
            <a href="mailto:hello@canlah.ai"
              class="rounded-[2px] inline-flex items-center gap-3 px-7 py-4 cockpit-label !text-[12px] text-[#efefe5]/70 border border-white/15 hover:border-[#BDD1F6]/50 hover:text-[#efefe5] hover:bg-white/5 transition-all whitespace-nowrap">
              {{ $t('cta.secondary') }}
            </a>
          </div>

          <!-- Reassurance microcopy -->
          <div class="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <span v-for="note in [$t('cta.note1'), $t('cta.note2'), $t('cta.note3')]" :key="note"
              class="flex items-center gap-2 text-[12px] text-[#5C6470] font-mono">
              <span class="text-[#BDD1F6]">✓</span> {{ note }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
