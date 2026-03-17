<script setup lang="ts">
const { tm } = useI18n()
const features = computed(() => tm('studio.features') as { icon: string, title: string, desc: string }[])
</script>

<template>
  <section class="py-20 px-6">
    <div class="max-w-[1400px] mx-auto">

      <!-- Section header -->
      <div class="text-center mb-14">
        <div class="font-mono text-[10px] text-[#6496ff] tracking-[4px] mb-3">{{ $t('studio.sectionTag') }}</div>
        <h2 class="font-display font-extrabold text-4xl md:text-5xl text-white leading-tight">
          {{ $t('studio.name') }}
        </h2>
        <p class="mt-4 text-[15px] text-[#5a7099] max-w-lg mx-auto">{{ $t('studio.tag') }}</p>
      </div>

      <!-- Two-column layout -->
      <div class="grid md:grid-cols-2 gap-6">
        <!-- Left: Description + CTA -->
        <div class="rounded-2xl border border-[#6496ff]/20 bg-gradient-to-br from-[#0e1530]/90 to-[#060d22]/95 p-8 flex flex-col">
          <div class="flex-1">
            <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#00e5a0]/5 border border-[#00e5a0]/20 mb-6">
              <span class="w-1.5 h-1.5 rounded-full bg-[#00e5a0] shadow-[0_0_6px_#00e5a0]"></span>
              <span class="text-[11px] font-mono text-[#00e5a0]">{{ $t('studio.note') }}</span>
            </div>
            <h3 class="font-display font-bold text-2xl text-white mb-4">{{ $t('studio.headline') }}</h3>
            <p class="text-[14px] text-[#5a7099] leading-relaxed mb-8">{{ $t('studio.body') }}</p>
          </div>
          <a href="https://canmarket.ai" target="_blank"
            class="inline-flex items-center gap-2 text-sm font-semibold text-[#6496ff] hover:text-white border border-[#6496ff]/30 hover:border-[#6496ff]/70 rounded-full px-6 py-3 w-fit transition-all hover:bg-[#6496ff]/10">
            {{ $t('studio.cta') }} →
          </a>
        </div>

        <!-- Right: Feature grid -->
        <div class="grid grid-cols-2 gap-3">
          <div
            v-for="(feat, i) in features" :key="i"
            class="group flex flex-col gap-3 p-5 rounded-xl border border-[#6496ff]/12 bg-[#6496ff]/[0.04] hover:border-[#6496ff]/35 hover:bg-[#6496ff]/[0.08] transition-all duration-200 cursor-default"
          >
            <span class="text-2xl">{{ feat.icon }}</span>
            <div>
              <div class="text-[13px] font-semibold text-white mb-0.5">{{ feat.title }}</div>
              <div class="text-[11px] text-[#5a7099] leading-relaxed">{{ feat.desc }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
