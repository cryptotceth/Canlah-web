<script setup lang="ts">
const { tm } = useI18n()
const capabilities = computed(() => tm('platform.capabilities') as { icon: string, label: string, desc: string }[])
</script>

<template>
  <section id="platform" class="py-20 px-6">
    <div class="max-w-[1400px] mx-auto">

      <!-- Section header -->
      <div v-reveal class="text-center mb-14">
        <div class="font-mono text-[10px] text-[#00d4ff] tracking-[4px] mb-3">{{ $t('platform.sectionTag') }}</div>
        <h2 class="font-display font-extrabold text-4xl md:text-5xl text-white leading-tight">
          <span v-html="$t('platform.title', { highlight: `<span class='bg-gradient-to-r from-[#00d4ff] to-[#3b7fff] bg-clip-text text-transparent'>${$t('platform.highlight')}</span>` })"></span>
        </h2>
        <p class="mt-4 text-[15px] text-[#5a7099] max-w-lg mx-auto">{{ $t('platform.subtitle') }}</p>
      </div>

      <!-- Architecture diagram-style layout -->
      <div v-reveal="{ delay: 100 }" class="relative rounded-3xl border border-[#00d4ff]/20 bg-gradient-to-br from-[#071035] via-[#0a1a40] to-[#060e2a] p-10 overflow-hidden">
        <!-- Top accent line -->
        <div class="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00d4ff]/60 to-transparent"></div>

        <!-- Center label -->
        <div class="text-center mb-10">
          <div class="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-[#00d4ff]/30 bg-[#00d4ff]/5">
            <span class="w-2 h-2 rounded-full bg-[#00d4ff] shadow-[0_0_10px_#00d4ff] animate-pulse"></span>
            <span class="font-mono text-sm font-semibold text-[#00d4ff] tracking-wider">CANLAH AI AGENT PLATFORM</span>
            <span class="w-2 h-2 rounded-full bg-[#00d4ff] shadow-[0_0_10px_#00d4ff] animate-pulse"></span>
          </div>
        </div>

        <!-- Capability grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="(cap, i) in capabilities" :key="i"
            class="group flex items-start gap-4 p-5 rounded-xl border border-[#00d4ff]/10 bg-[#00d4ff]/[0.03] hover:border-[#00d4ff]/35 hover:bg-[#00d4ff]/[0.07] transition-all duration-200 cursor-default"
          >
            <div class="text-xl flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-lg bg-[#00d4ff]/10 group-hover:bg-[#00d4ff]/20 transition-colors">{{ cap.icon }}</div>
            <div>
              <div class="text-[13px] font-semibold text-white mb-0.5">{{ cap.label }}</div>
              <div class="text-[11px] text-[#5a7099] leading-relaxed">{{ cap.desc }}</div>
            </div>
          </div>
        </div>

        <!-- Corner decorations -->
        <div class="absolute bottom-4 right-4 font-mono text-[10px] text-[#00d4ff]/20 tracking-wider select-none">v2.0 · MULTI-VERTICAL</div>
      </div>
    </div>
  </section>
</template>
