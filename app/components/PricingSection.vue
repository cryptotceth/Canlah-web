<script setup lang="ts">
const { tm } = useI18n()
const tiers = computed(() => tm('pricing.tiers') as {
  name: string; tag: string; price: string; priceSub: string
  highlight: boolean; cta: string; ctaUrl?: string; ctaStyle: string
  features: string[]
}[])
</script>

<template>
  <section id="pricing" class="py-20 px-6">
    <div class="max-w-[1100px] mx-auto">

      <!-- Section header -->
      <div v-reveal class="text-center mb-14">
        <div class="font-mono text-[10px] text-[#00d4ff] tracking-[4px] mb-3">{{ $t('pricing.sectionTag') }}</div>
        <h2 class="font-display font-extrabold text-4xl md:text-5xl text-white leading-tight mb-4">
          {{ $t('pricing.title') }}
        </h2>
        <p class="text-[15px] text-[#5070a0] max-w-lg mx-auto">{{ $t('pricing.subtitle') }}</p>
      </div>

      <!-- Pricing cards -->
      <div v-reveal="{ delay: 80 }" class="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div
          v-for="(tier, i) in tiers"
          :key="i"
          class="relative rounded-2xl border p-8 flex flex-col transition-all duration-300"
          :class="tier.highlight
            ? 'border-[#00d4ff]/40 bg-gradient-to-br from-[#071a4a]/80 to-[#060f2a]/90 shadow-[0_0_60px_rgba(0,212,255,0.12)]'
            : 'border-white/8 bg-white/[0.025] hover:border-white/15'"
        >
          <!-- Popular badge -->
          <div v-if="tier.highlight" class="absolute -top-3.5 left-1/2 -translate-x-1/2">
            <span class="text-[10px] font-mono px-3 py-1 rounded-full bg-gradient-to-r from-[#0d47e0] to-[#00d4ff] text-white shadow-[0_0_16px_rgba(0,212,255,0.4)]">
              {{ $t('pricing.popularBadge') }}
            </span>
          </div>

          <!-- Tier header -->
          <div class="mb-6">
            <div class="text-[11px] font-mono tracking-[2px] mb-2"
              :class="tier.highlight ? 'text-[#00d4ff]' : 'text-[#4a6a90]'">
              {{ tier.tag }}
            </div>
            <h3 class="font-display font-bold text-[22px] text-white mb-4">{{ tier.name }}</h3>
            <div class="flex items-baseline gap-1.5">
              <span class="font-display font-extrabold text-[38px] leading-none"
                :class="tier.highlight ? 'text-white' : 'text-[#8aa8d0]'">
                {{ tier.price }}
              </span>
              <span class="text-[13px] text-[#4a6a90]">{{ tier.priceSub }}</span>
            </div>
          </div>

          <!-- Divider -->
          <div class="h-px mb-6"
            :class="tier.highlight ? 'bg-[#00d4ff]/15' : 'bg-white/6'"></div>

          <!-- Feature list -->
          <ul class="space-y-3 flex-1 mb-8">
            <li v-for="(feat, j) in tier.features" :key="j"
              class="flex items-start gap-2.5 text-[13px]"
              :class="tier.highlight ? 'text-[#8ab8d4]' : 'text-[#6080a0]'">
              <span class="mt-[3px] flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold"
                :class="tier.highlight ? 'bg-[#00d4ff]/15 text-[#00d4ff]' : 'bg-white/8 text-[#5a7090]'">✓</span>
              {{ feat }}
            </li>
          </ul>

          <!-- CTA -->
          <a
            :href="tier.ctaUrl || 'mailto:hello@canlah.ai'"
            :target="tier.ctaUrl ? '_blank' : undefined"
            class="w-full py-3 rounded-full text-sm font-semibold text-center transition-all"
            :class="tier.ctaStyle"
          >
            {{ tier.cta }}
          </a>
        </div>
      </div>

      <!-- Bottom note -->
      <p v-reveal="{ delay: 200 }" class="text-center text-[12px] font-mono text-[#3d5880] mt-8">
        {{ $t('pricing.note') }}
      </p>

    </div>
  </section>
</template>
