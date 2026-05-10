<script setup lang="ts">
const stats = ['revenue', 'engagement', 'cost', 'clients']
</script>

<template>
  <section class="section px-4 sm:px-6 lg:px-10 xl:px-14">
    <div v-reveal class="w-full flex flex-col gap-10 sm:gap-12">
      <div v-for="key in stats" :key="key" class="text-center">
        <div class="font-display font-bold text-[40px] sm:text-[56px] md:text-[72px] leading-none mb-2 sm:mb-3 text-grad">
          {{ $t(`stats.${key}.value`) }}
        </div>
        <div class="eyebrow justify-center text-[11px] sm:text-[13px]">{{ $t(`stats.${key}.label`) }}</div>
      </div>
    </div>
  </section>
</template>
