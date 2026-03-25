<script setup lang="ts">
const { tm, t } = useI18n()

const rows = computed(() => tm('comparison.rows') as {
  label: string
  generic: { icon: string; text: string }
  agency: { icon: string; text: string }
  canlah: { icon: string; text: string }
}[])
</script>

<template>
  <section class="py-20 px-6">
    <div class="max-w-[1000px] mx-auto">

      <!-- Section header -->
      <div class="text-center mb-14">
        <div class="font-mono text-[10px] text-[#00d4ff] tracking-[4px] mb-3">{{ $t('comparison.sectionTag') }}</div>
        <h2 class="font-display font-bold text-4xl md:text-5xl text-white leading-tight mb-4">
          {{ $t('comparison.title') }}
          <span class="bg-gradient-to-r from-[#00d4ff] to-[#0d47e0] bg-clip-text text-transparent">{{ $t('comparison.highlight') }}</span>
        </h2>
        <p class="text-[16px] text-[#5070a0] max-w-xl mx-auto">{{ $t('comparison.subtitle') }}</p>
      </div>

      <!-- Comparison table -->
      <div v-reveal class="overflow-x-auto -mx-6 px-6">
        <table class="w-full min-w-[640px] border-collapse">

          <!-- Column headers -->
          <thead>
            <tr>
              <th class="pb-4 pr-4 text-left w-[30%]"></th>

              <!-- Generic AI -->
              <th class="pb-4 px-4 text-center w-[23%]">
                <div class="inline-block px-4 py-2 rounded-xl border border-white/8 bg-white/[0.02]">
                  <div class="text-[11px] font-mono text-[#4a6a90] tracking-[1.5px] mb-0.5">{{ $t('comparison.col1.label') }}</div>
                  <div class="text-[13px] font-semibold text-[#6080a0]">{{ $t('comparison.col1.name') }}</div>
                </div>
              </th>

              <!-- Agency -->
              <th class="pb-4 px-4 text-center w-[23%]">
                <div class="inline-block px-4 py-2 rounded-xl border border-white/8 bg-white/[0.02]">
                  <div class="text-[11px] font-mono text-[#4a6a90] tracking-[1.5px] mb-0.5">{{ $t('comparison.col2.label') }}</div>
                  <div class="text-[13px] font-semibold text-[#6080a0]">{{ $t('comparison.col2.name') }}</div>
                </div>
              </th>

              <!-- CANLAH — highlighted -->
              <th class="pb-4 px-4 text-center w-[24%]">
                <div class="inline-block px-4 py-2 rounded-xl border border-[#00d4ff]/30 bg-[#00d4ff]/[0.06] shadow-[0_0_20px_rgba(0,212,255,0.12)]">
                  <div class="text-[11px] font-mono text-[#00d4ff]/70 tracking-[1.5px] mb-0.5">{{ $t('comparison.col3.label') }}</div>
                  <div class="text-[13px] font-semibold text-[#00d4ff]">{{ $t('comparison.col3.name') }}</div>
                </div>
              </th>
            </tr>
          </thead>

          <!-- Rows -->
          <tbody>
            <tr
              v-for="(row, i) in rows"
              :key="i"
              class="border-t border-white/5"
            >
              <!-- Feature label -->
              <td class="py-4 pr-4">
                <span class="text-[13px] font-medium text-[#7090b8]">{{ row.label }}</span>
              </td>

              <!-- Generic AI cell -->
              <td class="py-4 px-4 text-center">
                <div class="flex flex-col items-center gap-1">
                  <span class="text-lg leading-none">{{ row.generic.icon }}</span>
                  <span class="text-[11px] text-[#4a6080] leading-snug">{{ row.generic.text }}</span>
                </div>
              </td>

              <!-- Agency cell -->
              <td class="py-4 px-4 text-center">
                <div class="flex flex-col items-center gap-1">
                  <span class="text-lg leading-none">{{ row.agency.icon }}</span>
                  <span class="text-[11px] text-[#4a6080] leading-snug">{{ row.agency.text }}</span>
                </div>
              </td>

              <!-- CANLAH cell — highlighted column -->
              <td class="py-4 px-4 text-center bg-[#00d4ff]/[0.025] border-x border-[#00d4ff]/10">
                <div class="flex flex-col items-center gap-1">
                  <span class="text-lg leading-none">{{ row.canlah.icon }}</span>
                  <span class="text-[11px] text-[#7ab8d0] font-medium leading-snug">{{ row.canlah.text }}</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Bottom CTA nudge -->
      <div class="text-center mt-12">
        <a href="https://app.canmarket.ai" target="_blank"
          class="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-sm bg-gradient-to-r from-[#0d47e0] to-[#00d4ff] text-white hover:shadow-[0_0_40px_rgba(0,212,255,0.4)] transition-all hover:scale-[1.03]">
          {{ $t('comparison.cta') }}
          <span class="group-hover:translate-x-1 transition-transform">→</span>
        </a>
        <p class="text-[12px] text-[#3d5880] mt-3">{{ $t('comparison.ctaNote') }}</p>
      </div>

    </div>
  </section>
</template>
