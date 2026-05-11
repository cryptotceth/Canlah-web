<script setup lang="ts">
const capabilities = useTmList<{ icon: string, label: string, desc: string }[]>('platform.capabilities')
</script>

<template>
  <section id="platform" class="section px-3 sm:px-6">
    <div class="wide">

      <!-- Section header -->
      <div v-reveal class="text-center mb-14">
        <div class="font-mono text-[10px] text-[#BDD1F6] tracking-[4px] mb-3">{{ $t('platform.sectionTag') }}</div>
        <h2 class="font-display font-bold text-[16px] md:text-5xl text-[#efefe5] leading-[1.15]">
          <span v-html="$t('platform.title', { highlight: `<span class='bg-gradient-to-r from-[#BDD1F6] to-[#91B3F0] bg-clip-text text-transparent'>${$t('platform.highlight')}</span>` })"></span>
        </h2>
        <p class="mt-4 text-[15px] text-[#BABABA] max-w-lg mx-auto">{{ $t('platform.subtitle') }}</p>
      </div>

      <!-- Architecture diagram-style layout -->
      <div v-reveal="{ delay: 100 }" class="relative rounded-[2px] border border-[#BDD1F6]/20 bg-gradient-to-br from-[#0B0A10] via-[#0B0A10] to-[#0B0A10] p-3 md:p-10 overflow-hidden">
        <!-- Top accent line -->
        <div class="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#BDD1F6]/60 to-transparent"></div>

        <!-- Center label -->
        <div class="text-center mb-10">
          <div class="inline-flex items-center gap-3 px-6 py-3 rounded-[2px] border border-[#BDD1F6]/30 bg-[#BDD1F6]/5">
            <span class="w-1.5 h-1.5 rounded-[2px] bg-[#BDD1F6] shadow-[0_0_6px_#BDD1F6]"></span>
            <span class="font-mono text-sm font-bold text-[#BDD1F6] tracking-wider">CANLAH AI AGENT PLATFORM</span>
            <span class="w-1.5 h-1.5 rounded-[2px] bg-[#BDD1F6] shadow-[0_0_6px_#BDD1F6]"></span>
          </div>
        </div>

        <!-- Capability grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          <div
            v-for="(cap, i) in capabilities" :key="i"
            class="group flex items-start gap-4 p-3 md:p-5 rounded-[2px] border border-[#BDD1F6]/10 bg-[#BDD1F6]/[0.03] hover:border-[#BDD1F6]/35 hover:bg-[#BDD1F6]/[0.07] transition-all duration-200 cursor-default"
          >
            <div class="text-xl flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-[2px] bg-[#BDD1F6]/10 group-hover:bg-[#BDD1F6]/20 transition-colors">{{ cap.icon }}</div>
            <div>
              <div class="text-[16px] md:text-[13px] font-bold text-[#efefe5] mb-0.5">{{ cap.label }}</div>
              <div class="text-[12px] md:text-[11px] text-[#BABABA] leading-[1.5]">{{ cap.desc }}</div>
            </div>
          </div>
        </div>

        <!-- Corner decorations -->
        <div class="absolute bottom-4 right-4 font-mono text-[10px] text-[#BDD1F6]/20 tracking-wider select-none">v2.0 · MULTI-VERTICAL</div>
      </div>
    </div>
  </section>
</template>
