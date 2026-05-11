<script setup lang="ts">
const quotes = useTmList<{ quote: string; role: string; company: string; metric: string; metricLabel: string }[]>('testimonials.quotes')
</script>

<template>
  <section class="section px-3 sm:px-6 lg:px-10 xl:px-14">
    <div class="w-full">

      <!-- Section header -->
      <div v-reveal class="text-center mb-14">
        <div class="font-mono text-[10px] text-[#BDD1F6] tracking-[4px] mb-3">{{ $t('testimonials.sectionTag') }}</div>
        <h2 class="font-display font-bold text-4xl md:text-5xl text-[#efefe5] leading-[1.15]">
          {{ $t('testimonials.title') }}
        </h2>
      </div>

      <!-- Horizontal 3-up grid — span same range as nav (logo ↔ TRY FREE) -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-5 lg:gap-6 w-full">
        <div
          v-for="(q, i) in quotes"
          :key="i"
          v-reveal="{ delay: i * 100 }"
          class="group relative rounded-[2px] border border-[#efefe5]/12 bg-[#0B0A10]/75 hover:bg-[#0B0A10]/90 hover:border-[#BDD1F6]/30 backdrop-blur-md p-3 sm:p-9 flex flex-col transition-colors duration-300 min-h-[320px]"
        >
          <!-- Top accent -->
          <div class="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-[#BDD1F6]/30 to-transparent"></div>

          <!-- Quote mark -->
          <div class="font-display text-[56px] leading-none text-[#BDD1F6]/15 mb-2 select-none">"</div>

          <!-- Quote text -->
          <p class="text-[14px] text-[#efefe5] leading-[1.5] flex-1 mb-6">{{ q.quote }}</p>

          <!-- Metric callout -->
          <div class="flex items-center gap-3 mb-5 p-3 rounded-[2px] bg-[#BDD1F6]/5 border border-[#BDD1F6]/15">
            <span class="font-display font-bold text-[26px] text-[#BDD1F6] leading-none">{{ q.metric }}</span>
            <span class="text-[11px] text-[#5C6470] leading-[1.15]">{{ q.metricLabel }}</span>
          </div>

          <!-- Attribution -->
          <div class="flex items-center gap-3">
            <img
              :src="`/testimonials/avatar${i + 1}.webp?v=2`"
              :alt="q.role"
              loading="lazy"
              class="w-9 h-9 rounded-full object-cover flex-shrink-0 ring-1 ring-[#BDD1F6]/25"
            />
            <div>
              <div class="text-[12px] font-bold text-[#efefe5]/80">{{ q.role }}</div>
              <div class="text-[11px] font-mono text-[#BABABA] tracking-wide">{{ q.company }}</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>
