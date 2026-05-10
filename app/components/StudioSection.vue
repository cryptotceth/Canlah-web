<script setup lang="ts">
const features = useTmList<{ icon: string, title: string, desc: string }[]>('studio.features')
</script>

<template>
  <section class="section px-6">
    <div class="wide">

      <!-- Section header -->
      <div class="text-center mb-14">
        <div class="font-mono text-[10px] text-[#91B3F0] tracking-[4px] mb-3">{{ $t('studio.sectionTag') }}</div>
        <h2 class="font-display font-bold text-4xl md:text-5xl text-[#efefe5] leading-[1.15]">
          {{ $t('studio.name') }}
        </h2>
        <p class="mt-4 text-[15px] text-[#BABABA] max-w-lg mx-auto">{{ $t('studio.tag') }}</p>
      </div>

      <!-- Two-column layout -->
      <div v-reveal class="grid md:grid-cols-2 gap-6">
        <!-- Left: Description + CTA -->
        <div class="rounded-[2px] border border-[#91B3F0]/20 bg-gradient-to-br from-[#1E222A]/90 to-[#0a090f]/95 p-8 flex flex-col">
          <div class="flex-1">
            <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-[2px] bg-[#BDD1F6]/5 border border-[#BDD1F6]/20 mb-6">
              <span class="w-1.5 h-1.5 rounded-[2px] bg-[#BDD1F6] shadow-[0_0_6px_#BDD1F6]"></span>
              <span class="text-[11px] font-mono text-[#BDD1F6]">{{ $t('studio.note') }}</span>
            </div>
            <h3 class="font-display font-bold text-2xl text-[#efefe5] mb-4">{{ $t('studio.headline') }}</h3>
            <p class="text-[14px] text-[#BABABA] leading-[1.5] mb-8">{{ $t('studio.body') }}</p>
          </div>
          <a href="https://canmarket.ai" target="_blank"
            class="inline-flex items-center gap-2 text-sm font-bold text-[#91B3F0] hover:text-[#efefe5] border border-[#91B3F0]/30 hover:border-[#91B3F0]/70 rounded-[2px] px-6 py-3 w-fit transition-all hover:bg-[#91B3F0]/10">
            {{ $t('studio.cta') }} →
          </a>
        </div>

        <!-- Right: Feature grid -->
        <div class="grid grid-cols-2 gap-3">
          <div
            v-for="(feat, i) in features" :key="i"
            class="group flex flex-col gap-3 p-5 rounded-[2px] border border-[#91B3F0]/12 bg-[#91B3F0]/[0.04] hover:border-[#91B3F0]/35 hover:bg-[#91B3F0]/[0.08] transition-all duration-200 cursor-default"
          >
            <span class="text-2xl">{{ feat.icon }}</span>
            <div>
              <div class="text-[13px] font-bold text-[#efefe5] mb-0.5">{{ feat.title }}</div>
              <div class="text-[11px] text-[#BABABA] leading-[1.5]">{{ feat.desc }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
