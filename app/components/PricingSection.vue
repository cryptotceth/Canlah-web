<script setup lang="ts">
const tiers = useTmList<{
  name: string; tag: string; price: string; priceSub: string
  highlight: boolean; cta: string; ctaUrl?: string; ctaStyle: string
  features: string[]
}[]>('pricing.tiers')
</script>

<template>
  <section id="pricing" class="section px-6">
    <div class="max-w-[1100px] mx-auto">

      <!-- Section header -->
      <div v-reveal class="text-center mb-14">
        <div class="font-mono text-[10px] text-[#BDD1F6] tracking-[4px] mb-3">{{ $t('pricing.sectionTag') }}</div>
        <h2 class="font-display font-bold text-4xl md:text-5xl text-[#efefe5] leading-[1.15] mb-4">
          {{ $t('pricing.title') }}
        </h2>
        <p class="text-[15px] text-[#BABABA] max-w-lg mx-auto">{{ $t('pricing.subtitle') }}</p>
      </div>

      <!-- Pricing cards -->
      <div v-reveal="{ delay: 80 }" class="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div
          v-for="(tier, i) in tiers"
          :key="i"
          class="group relative rounded-[2px] p-8 flex flex-col transition-all duration-300 backdrop-blur-md hover:-translate-y-1.5 hover:scale-[1.015]"
          :class="tier.highlight
            ? 'border-rainbow-anim bg-[#0B0A10]/90 shadow-[0_0_80px_rgba(189,209,246,0.35),0_0_140px_rgba(145,179,240,0.18),inset_0_0_30px_rgba(189,209,246,0.06)] hover:shadow-[0_0_110px_rgba(189,209,246,0.55),0_0_180px_rgba(145,179,240,0.28),inset_0_0_40px_rgba(189,209,246,0.10)]'
            : 'border border-[#efefe5]/12 bg-[#0B0A10]/75 hover:border-[#efefe5]/40 hover:bg-[#0B0A10]/90 hover:shadow-[0_0_50px_rgba(189,209,246,0.18),0_18px_40px_rgba(0,0,0,0.5)]'"
        >
          <!-- Popular badge -->
          <div v-if="tier.highlight" class="absolute -top-3.5 left-1/2 -translate-x-1/2">
            <span class="text-[10px] font-mono px-3 py-1 rounded-[2px] bg-gradient-to-r from-[#91B3F0] to-[#BDD1F6] text-[#efefe5] shadow-[0_0_16px_rgba(189,209,246,0.4)]">
              {{ $t('pricing.popularBadge') }}
            </span>
          </div>

          <!-- Tier header -->
          <div class="mb-6">
            <div class="text-[11px] font-mono tracking-[2px] mb-2"
              :class="tier.highlight ? 'text-[#BDD1F6]' : 'text-[#BABABA]'">
              {{ tier.tag }}
            </div>
            <h3 class="font-display font-bold text-[22px] text-[#efefe5] mb-4">{{ tier.name }}</h3>
            <div class="flex items-baseline gap-2">
              <span class="font-display font-bold text-[38px] leading-none"
                :class="tier.highlight ? 'text-[#efefe5]' : 'text-[#efefe5]'">
                {{ tier.price }}
              </span>
              <span class="text-[13px] text-[#BABABA]">{{ tier.priceSub }}</span>
            </div>
          </div>

          <!-- Divider -->
          <div class="h-px mb-6"
            :class="tier.highlight ? 'bg-[#BDD1F6]/15' : 'bg-white/6'"></div>

          <!-- Feature list -->
          <ul class="space-y-3 flex-1 mb-8">
            <li v-for="(feat, j) in tier.features" :key="j"
              class="flex items-start gap-3 text-[13px]"
              :class="tier.highlight ? 'text-[#efefe5]' : 'text-[#BABABA]'">
              <span class="mt-[3px] flex-shrink-0 w-4 h-4 rounded-[2px] flex items-center justify-center text-[9px] font-bold"
                :class="tier.highlight ? 'bg-[#BDD1F6]/15 text-[#BDD1F6]' : 'bg-white/8 text-[#BABABA]'">✓</span>
              {{ feat }}
            </li>
          </ul>

          <!-- CTA -->
          <a
            :href="tier.ctaUrl || 'mailto:hello@canlah.ai'"
            :target="tier.ctaUrl ? '_blank' : undefined"
            class="w-full py-3 rounded-[2px] text-sm font-bold text-center transition-all"
            :class="tier.ctaStyle"
          >
            {{ tier.cta }}
          </a>
        </div>
      </div>

      <!-- Bottom note -->
      <p v-reveal="{ delay: 200 }" class="text-center text-[12px] font-mono text-[#5C6470] mt-8">
        {{ $t('pricing.note') }}
      </p>

    </div>
  </section>
</template>
