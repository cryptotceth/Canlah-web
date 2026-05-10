<script setup lang="ts">
const members = useTmList<{ initials: string; name: string; role: string; cred: string; tag: string }[]>('team.members')

const avatarColors = [
  { from: '#91B3F0', to: '#BDD1F6' },
  { from: '#91B3F0', to: '#BDD1F6' },
  { from: '#BDD1F6', to: '#BDD1F6' },
]
</script>

<template>
  <section class="section px-6">
    <div v-reveal class="wide">

      <!-- Section header -->
      <div class="flex items-center gap-4 mb-10">
        <div class="flex-1 h-px bg-gradient-to-r from-transparent to-white/8"></div>
        <div class="text-center">
          <div class="font-mono text-[10px] text-[#BDD1F6] tracking-[4px] mb-1">{{ $t('team.sectionTag') }}</div>
          <h2 class="font-display font-bold text-2xl text-[#efefe5]">{{ $t('team.title') }}</h2>
        </div>
        <div class="flex-1 h-px bg-gradient-to-l from-transparent to-white/8"></div>
      </div>

      <!-- Team cards + award -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        <div
          v-for="(m, i) in members"
          :key="i"
          class="flex items-start gap-4 p-5 rounded-[2px] border border-white/8 bg-white/[0.025] hover:border-white/15 hover:bg-white/[0.04] transition-all duration-200"
        >
          <!-- Avatar -->
          <div
            class="w-11 h-11 rounded-[2px] flex items-center justify-center font-display font-bold text-sm text-[#efefe5] flex-shrink-0 shadow-lg"
            :style="{ background: `linear-gradient(135deg, ${avatarColors[i].from}, ${avatarColors[i].to})` }"
          >{{ m.initials }}</div>

          <!-- Info -->
          <div class="min-w-0">
            <div class="font-bold text-[14px] text-[#efefe5] leading-snug">{{ m.name }}</div>
            <div class="text-[11px] font-mono text-[#BABABA] mt-0.5 mb-2 tracking-wide">{{ m.role }}</div>
            <div class="text-[12px] text-[#BABABA] leading-snug mb-2">{{ m.cred }}</div>
            <span class="inline-block text-[10px] font-mono px-2 py-0.5 rounded border border-[#BDD1F6]/20 text-[#BDD1F6]/70 bg-[#BDD1F6]/5">
              {{ m.tag }}
            </span>
          </div>
        </div>
      </div>

      <!-- MWC award banner -->
      <div class="flex items-center justify-center gap-4 py-4 px-6 rounded-[2px] border border-[#BDD1F6]/20 bg-[#BDD1F6]/[0.04] w-fit mx-auto">
        <span class="text-xl">🏅</span>
        <div>
          <span class="text-[12px] font-bold text-[#BDD1F6]">{{ $t('team.award') }}</span>
          <span class="text-[12px] text-[#5C6470] ml-2">{{ $t('team.awardSub') }}</span>
        </div>
      </div>

    </div>
  </section>
</template>
