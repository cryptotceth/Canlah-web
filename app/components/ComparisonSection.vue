<script setup lang="ts">
const rows = useTmList<{
  label: string
  generic: { icon: string; text: string }
  agency: { icon: string; text: string }
  canlah: { icon: string; text: string }
}[]>('comparison.rows')

function isPositive(icon: string) {
  return icon === '✓' || icon === '✅' || icon === '⭐' || icon === '★'
}
</script>

<template>
  <section class="section px-2 sm:px-6 relative">
    <!-- ambient backdrop glow -->
    <div class="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[480px] pointer-events-none opacity-50"
      style="background: radial-gradient(ellipse 60% 60% at 50% 50%, rgba(145,179,240,0.12), transparent 70%)"></div>

    <div class="max-w-[1080px] mx-auto relative">

      <!-- Section header -->
      <div class="text-center mb-16" v-reveal>
        <div class="inline-flex items-center gap-2 mb-5">
          <span class="h-px w-8 bg-gradient-to-r from-transparent to-[#BDD1F6]/10"></span>
          <span class="font-mono text-[10px] text-[#BDD1F6] tracking-[4px]">{{ $t('comparison.sectionTag') }}</span>
          <span class="h-px w-8 bg-gradient-to-l from-transparent to-[#BDD1F6]/10"></span>
        </div>
        <h2 class="font-display font-bold text-[16px] md:text-5xl text-[#efefe5] leading-[1.15] mb-4">
          {{ $t('comparison.title') }}
          <span class="bg-gradient-to-r from-[#BDD1F6] to-[#91B3F0] bg-clip-text text-transparent">{{ $t('comparison.highlight') }}</span>
        </h2>
        <p class="text-[15px] text-[#BABABA] max-w-xl mx-auto leading-[1.6]">{{ $t('comparison.subtitle') }}</p>
      </div>

      <!-- Comparison frame -->
      <div v-reveal class="relative rounded-[3px] overflow-hidden">
        <!-- top rainbow accent -->
        <div class="absolute top-0 left-0 right-0 h-[1px]" style="background: var(--rainbow); opacity: 0.1"></div>

        <div class="rounded-[3px] border border-[#efefe5]/12 bg-[#0B0A10]/80 backdrop-blur-md p-2 sm:p-10">

          <!-- Column headers -->
          <div class="grid grid-cols-[1.4fr_1fr_1fr_1.2fr] gap-2 sm:gap-4 mb-2">
            <div></div>
            <!-- Generic AI -->
            <div class="rounded-[2px] border border-[#efefe5]/10 bg-white/[0.02] px-2 py-2 sm:px-4 sm:py-4 text-center">
              <div class="font-mono text-[10px] text-[#5C6470] tracking-[2px] mb-1.5">{{ $t('comparison.col1.label') }}</div>
              <div class="text-[12px] sm:text-[14px] font-bold text-[#BABABA]">{{ $t('comparison.col1.name') }}</div>
            </div>
            <!-- Agency -->
            <div class="rounded-[2px] border border-[#efefe5]/10 bg-white/[0.02] px-2 py-2 sm:px-4 sm:py-4 text-center">
              <div class="font-mono text-[10px] text-[#5C6470] tracking-[2px] mb-1.5">{{ $t('comparison.col2.label') }}</div>
              <div class="text-[12px] sm:text-[14px] font-bold text-[#BABABA]">{{ $t('comparison.col2.name') }}</div>
            </div>
            <!-- CANLAH — featured -->
            <div class="border-rainbow rounded-[2px] px-2 py-2 sm:px-4 sm:py-4 text-center bg-gradient-to-b from-[#BDD1F6]/[0.10] to-[#91B3F0]/[0.06]">
              <div class="font-mono text-[10px] text-[#BDD1F6] tracking-[2px] mb-1.5 flex items-center justify-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-[2px] bg-[#BDD1F6] shadow-[0_0_6px_#BDD1F6] animate-pulse"></span>
                {{ $t('comparison.col3.label') }}
              </div>
              <div class="text-[12px] sm:text-[14px] font-bold text-[#efefe5]">{{ $t('comparison.col3.name') }}</div>
            </div>
          </div>

          <!-- Rows -->
          <div class="grid grid-cols-[1.4fr_1fr_1fr_1.2fr] gap-2 sm:gap-4">
            <template v-for="(row, i) in rows" :key="i">
              <!-- Feature label -->
              <div class="py-2 px-2 flex items-center">
                <span class="text-[12px] sm:text-[14px] text-[#efefe5]/90 font-medium">{{ row.label }}</span>
              </div>
              <!-- Generic AI -->
              <div class="py-2 px-2 sm:px-3 flex flex-row items-center justify-start gap-2 text-left">
                <span class="text-[18px] leading-none"
                  :class="isPositive(row.generic.icon) ? 'text-[#91B3F0]' : 'text-[#5C6470]'">
                  {{ row.generic.icon }}
                </span>
                <span class="text-[12px] sm:text-[11px] text-[#BABABA]/80 leading-[1.4]">{{ row.generic.text }}</span>
              </div>
              <!-- Agency -->
              <div class="py-2 px-2 sm:px-3 flex flex-row items-center justify-start gap-2 text-left">
                <span class="text-[18px] leading-none"
                  :class="isPositive(row.agency.icon) ? 'text-[#91B3F0]' : 'text-[#5C6470]'">
                  {{ row.agency.icon }}
                </span>
                <span class="text-[12px] sm:text-[11px] text-[#BABABA]/80 leading-[1.4]">{{ row.agency.text }}</span>
              </div>
              <!-- CANLAH — highlighted column -->
              <div class="relative py-2 px-2 sm:px-3 flex flex-row items-center justify-start gap-2 text-left bg-gradient-to-b from-[#BDD1F6]/[0.04] to-[#BDD1F6]/[0.02]">
                <span class="text-[18px] leading-none text-[#BDD1F6] drop-shadow-[0_0_6px_rgba(189,209,246,0.5)]">
                  {{ row.canlah.icon }}
                </span>
                <span class="text-[12px] text-[#efefe5] font-medium leading-[1.4]">{{ row.canlah.text }}</span>
              </div>
            </template>
          </div>

          <!-- bottom rainbow accent (subtle) -->
          <div class="mt-4 h-[1px] mx-auto max-w-[60%] opacity-10" style="background: var(--rainbow)"></div>
        </div>
      </div>

      <!-- Bottom CTA -->
      <div v-reveal class="text-center mt-14">
        <a href="https://app.canmarket.ai" target="_blank"
          class="border-rainbow rounded-[2px] inline-flex items-center gap-3 px-7 py-4 cockpit-label !text-[12px] !text-[#efefe5] hover:opacity-90 transition-opacity whitespace-nowrap">
          <span class="inline-grid grid-cols-2 gap-[2px]"><span v-for="d in 4" :key="d" class="w-[3px] h-[3px] bg-current rounded-[2px]"></span></span>
          {{ $t('comparison.cta') }}
          <span>→</span>
        </a>
        <p class="text-[12px] text-[#5C6470] mt-4">{{ $t('comparison.ctaNote') }}</p>
      </div>

    </div>
  </section>
</template>
