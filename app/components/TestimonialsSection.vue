<script setup lang="ts">
const { tm } = useI18n()
const quotes = computed(() => tm('testimonials.quotes') as { quote: string; role: string; company: string; metric: string; metricLabel: string }[])
</script>

<template>
  <section class="py-20 px-6">
    <div class="max-w-[1400px] mx-auto">

      <!-- Section header -->
      <div v-reveal class="text-center mb-14">
        <div class="font-mono text-[10px] text-[#00e5a0] tracking-[4px] mb-3">{{ $t('testimonials.sectionTag') }}</div>
        <h2 class="font-display font-bold text-4xl md:text-5xl text-white leading-tight">
          {{ $t('testimonials.title') }}
        </h2>
      </div>

      <!-- Quote cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="(q, i) in quotes"
          :key="i"
          v-reveal="{ delay: i * 120 }"
          class="group relative rounded-2xl border border-white/8 bg-white/[0.025] backdrop-blur-sm p-7 flex flex-col hover:border-[#00e5a0]/25 hover:bg-white/[0.04] transition-all duration-300"
        >
          <!-- Top accent -->
          <div class="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-[#00e5a0]/30 to-transparent"></div>

          <!-- Quote mark -->
          <div class="font-display text-[56px] leading-none text-[#00e5a0]/15 mb-2 select-none">"</div>

          <!-- Quote text -->
          <p class="text-[14px] text-[#8faad4] leading-relaxed flex-1 mb-6">{{ q.quote }}</p>

          <!-- Metric callout -->
          <div class="flex items-center gap-3 mb-5 p-3 rounded-xl bg-[#00e5a0]/5 border border-[#00e5a0]/15">
            <span class="font-display font-extrabold text-[26px] text-[#00e5a0] leading-none">{{ q.metric }}</span>
            <span class="text-[11px] text-[#5a8a70] leading-tight">{{ q.metricLabel }}</span>
          </div>

          <!-- Attribution -->
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-full bg-gradient-to-br from-[#0d47e0]/50 to-[#00d4ff]/30 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
              {{ q.company.charAt(0) }}
            </div>
            <div>
              <div class="text-[12px] font-semibold text-white/80">{{ q.role }}</div>
              <div class="text-[11px] font-mono text-[#4a6a88] tracking-wide">{{ q.company }}</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>
