<script setup lang="ts">
const { tm } = useI18n()
const features = computed(() => tm('studio.features') as string[])
const featureIcons = ['🗂', '🔧', '💬', '📚', '🔗', '🏢']
</script>

<template>
  <section class="py-20 px-6">
    <div class="max-w-[1400px] mx-auto">
      <!-- Connector -->
      <div class="w-0.5 h-10 bg-gradient-to-b from-[#6496ff]/50 to-transparent mx-auto mb-8 relative">
        <span class="absolute -bottom-3 left-1/2 -translate-x-1/2 text-[10px] text-[#6496ff]/50">▼</span>
      </div>

      <!-- Section header -->
      <div class="flex items-center gap-4 mb-10">
        <div class="flex-1 h-px bg-gradient-to-r from-[#6496ff]/30 to-transparent"></div>
        <div class="text-center">
          <div class="font-mono text-[10px] text-[#00d4ff] tracking-[3px] mb-1">{{ $t('studio.sectionTag') }}</div>
        </div>
        <div class="flex-1 h-px bg-gradient-to-l from-[#6496ff]/30 to-transparent"></div>
      </div>

      <!-- Studio box -->
      <div class="rounded-2xl border border-[#6496ff]/25 bg-gradient-to-br from-[#141e3c]/90 to-[#0a142d]/95 p-8 hover:border-[#6496ff]/50 hover:shadow-[0_0_40px_rgba(100,150,255,0.1)] hover:-translate-y-0.5 transition-all duration-300">
        <div class="flex gap-10 flex-col md:flex-row">
          <!-- Title block -->
          <div class="md:w-56 flex-shrink-0">
            <h3 class="font-display text-xl font-bold text-white">{{ $t('studio.name') }}</h3>
            <div class="font-mono text-xs text-[#6496ff]/80 mt-1 tracking-wide">{{ $t('studio.tag') }}</div>
            <div class="mt-4 text-[11px] text-[#00e5a0] bg-[#00e5a0]/[0.06] border border-[#00e5a0]/20 rounded-md px-3 py-2 font-mono">
              ⚙ {{ $t('studio.note') }}
            </div>
          </div>

          <!-- Feature grid -->
          <div class="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            <div v-for="(feat, i) in features" :key="i"
              class="flex items-center gap-2 px-3.5 py-2.5 rounded-lg bg-[#6496ff]/[0.05] border border-[#6496ff]/12 text-xs text-[#c8d7ff]/80 hover:bg-[#6496ff]/12 hover:border-[#6496ff]/35 hover:text-white hover:scale-[1.02] transition-all">
              <span class="text-base flex-shrink-0">{{ featureIcons[i] }}</span>
              {{ feat }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
