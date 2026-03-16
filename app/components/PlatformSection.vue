<script setup lang="ts">
const { tm } = useI18n()
const capabilities = computed(() => tm('platform.capabilities') as string[])
</script>

<template>
  <section id="platform" class="py-20 px-6">
    <div class="max-w-[1400px] mx-auto">
      <!-- Connector -->
      <div class="w-0.5 h-10 bg-gradient-to-b from-[#00d4ff]/50 to-transparent mx-auto mb-8 relative">
        <span class="absolute -bottom-3 left-1/2 -translate-x-1/2 text-[10px] text-[#00d4ff]/50">▼</span>
      </div>

      <!-- Section header -->
      <div class="flex items-center gap-4 mb-10">
        <div class="flex-1 h-px bg-gradient-to-r from-[#00d4ff]/30 to-transparent"></div>
        <div class="text-center">
          <div class="font-mono text-[10px] text-[#00d4ff] tracking-[3px] mb-1">{{ $t('platform.sectionTag') }}</div>
          <h2 class="font-display font-bold text-2xl text-white">
            <span v-html="$t('platform.title', { highlight: `<span class='text-[#00d4ff]'>${$t('platform.highlight')}</span>` })"></span>
          </h2>
        </div>
        <div class="flex-1 h-px bg-gradient-to-l from-[#00d4ff]/30 to-transparent"></div>
      </div>

      <!-- Platform box -->
      <div class="relative rounded-2xl border border-[#00d4ff]/30 bg-gradient-to-br from-[#071035] via-[#0a1a40] to-[#060e2a] p-8 overflow-hidden group hover:border-[#00d4ff]/60 hover:shadow-[0_0_40px_rgba(0,212,255,0.15)] transition-all duration-300">
        <!-- Scanline -->
        <div class="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent animate-pulse"></div>

        <div class="flex items-center gap-10 flex-wrap">
          <!-- Title block -->
          <div class="flex-shrink-0">
            <div class="font-display text-xl font-bold text-white tracking-wide">CANLAH AI</div>
            <div class="font-display text-xl font-bold text-white tracking-wide">AGENT PLATFORM</div>
            <div class="font-mono text-xs text-[#00d4ff] mt-1 tracking-wider">Multi-Vertical Operating Layer</div>
          </div>

          <!-- Divider -->
          <div class="hidden md:block w-px h-16 bg-gradient-to-b from-transparent via-[#00d4ff]/30 to-transparent flex-shrink-0"></div>

          <!-- Capability pills -->
          <div class="flex flex-wrap gap-2.5 flex-1">
            <div v-for="(cap, i) in capabilities" :key="i"
              class="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#00d4ff]/[0.06] border border-[#00d4ff]/20 text-xs text-[#c8dcff]/85 hover:bg-[#00d4ff]/15 hover:border-[#00d4ff]/50 hover:text-white hover:-translate-y-0.5 transition-all cursor-default">
              <span class="w-1.5 h-1.5 rounded-full bg-[#00d4ff] shadow-[0_0_6px_#00d4ff] flex-shrink-0"></span>
              {{ cap }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
