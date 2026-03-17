<template>
  <section class="py-14 px-6">
    <div class="max-w-[1400px] mx-auto">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div
          v-for="stat in stats"
          :key="stat.key"
          class="relative rounded-2xl border border-white/8 bg-white/[0.03] backdrop-blur-sm p-6 text-center hover:border-[#00d4ff]/30 hover:bg-[#00d4ff]/[0.04] transition-all duration-300 group"
        >
          <div class="font-display font-extrabold text-[38px] leading-none mb-1 bg-gradient-to-br from-white to-[#7090c8] bg-clip-text text-transparent group-hover:from-[#00d4ff] group-hover:to-white transition-all duration-300">
            {{ $t(`stats.${stat.key}.value`) }}
          </div>
          <div class="text-[11px] font-mono text-[#4a5a7a] tracking-wider mt-2">
            {{ $t(`stats.${stat.key}.label`) }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const stats = [
  { key: 'revenue' },
  { key: 'engagement' },
  { key: 'cost' },
  { key: 'clients' },
]
</script>
