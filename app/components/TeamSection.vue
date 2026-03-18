<script setup lang="ts">
const { tm } = useI18n()
const members = computed(() => tm('team.members') as { initials: string; name: string; role: string; cred: string; tag: string }[])

const avatarColors = [
  { from: '#0d47e0', to: '#00d4ff' },
  { from: '#643cdc', to: '#b450ff' },
  { from: '#00b4c8', to: '#00e5a0' },
]
</script>

<template>
  <section class="py-16 px-6">
    <div v-reveal class="max-w-[1400px] mx-auto">

      <!-- Section header -->
      <div class="flex items-center gap-4 mb-10">
        <div class="flex-1 h-px bg-gradient-to-r from-transparent to-white/8"></div>
        <div class="text-center">
          <div class="font-mono text-[10px] text-[#00d4ff] tracking-[4px] mb-1">{{ $t('team.sectionTag') }}</div>
          <h2 class="font-display font-extrabold text-2xl text-white">{{ $t('team.title') }}</h2>
        </div>
        <div class="flex-1 h-px bg-gradient-to-l from-transparent to-white/8"></div>
      </div>

      <!-- Team cards + award -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        <div
          v-for="(m, i) in members"
          :key="i"
          class="flex items-start gap-4 p-5 rounded-2xl border border-white/8 bg-white/[0.025] hover:border-white/15 hover:bg-white/[0.04] transition-all duration-200"
        >
          <!-- Avatar -->
          <div
            class="w-11 h-11 rounded-xl flex items-center justify-center font-display font-bold text-sm text-white flex-shrink-0 shadow-lg"
            :style="{ background: `linear-gradient(135deg, ${avatarColors[i].from}, ${avatarColors[i].to})` }"
          >{{ m.initials }}</div>

          <!-- Info -->
          <div class="min-w-0">
            <div class="font-semibold text-[14px] text-white leading-snug">{{ m.name }}</div>
            <div class="text-[11px] font-mono text-[#4a6a90] mt-0.5 mb-2 tracking-wide">{{ m.role }}</div>
            <div class="text-[12px] text-[#7090b8] leading-snug mb-2">{{ m.cred }}</div>
            <span class="inline-block text-[10px] font-mono px-2 py-0.5 rounded border border-[#00d4ff]/20 text-[#00d4ff]/70 bg-[#00d4ff]/5">
              {{ m.tag }}
            </span>
          </div>
        </div>
      </div>

      <!-- MWC award banner -->
      <div class="flex items-center justify-center gap-4 py-4 px-6 rounded-xl border border-[#f5a623]/20 bg-[#f5a623]/[0.04] w-fit mx-auto">
        <span class="text-xl">🏅</span>
        <div>
          <span class="text-[12px] font-semibold text-[#f5c842]">{{ $t('team.award') }}</span>
          <span class="text-[12px] text-[#8a7040] ml-2">{{ $t('team.awardSub') }}</span>
        </div>
      </div>

    </div>
  </section>
</template>
