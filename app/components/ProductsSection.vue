<script setup lang="ts">
const { t, tm } = useI18n()
const cards = computed(() => tm('products.cards') as any[])

const cardConfig = [
  {
    icon: '📣',
    accentFrom: '#0d47e0',
    accentTo: '#00d4ff',
    borderColor: 'border-[#00d4ff]/35',
    bgColor: 'from-[#071a4a]/80 to-[#061030]/90',
    glowColor: 'rgba(0,212,255,0.12)',
    glowHoverColor: 'rgba(0,212,255,0.2)',
    scanline: true,
  },
  {
    icon: '💬',
    accentFrom: '#00b4c8',
    accentTo: '#00e5a0',
    borderColor: 'border-white/10',
    bgColor: 'from-[#071a1a]/80 to-[#061030]/90',
    glowColor: 'transparent',
    glowHoverColor: 'rgba(0,229,160,0.08)',
    scanline: false,
  },
  {
    icon: '📈',
    accentFrom: '#643cdc',
    accentTo: '#b450ff',
    borderColor: 'border-white/10',
    bgColor: 'from-[#130b2e]/80 to-[#061030]/90',
    glowColor: 'transparent',
    glowHoverColor: 'rgba(180,80,255,0.08)',
    scanline: false,
  },
  {
    icon: '🛍️',
    accentFrom: '#f5a623',
    accentTo: '#ff6432',
    borderColor: 'border-white/10',
    bgColor: 'from-[#1f1205]/80 to-[#061030]/90',
    glowColor: 'transparent',
    glowHoverColor: 'rgba(245,166,35,0.08)',
    scanline: false,
  },
]
</script>

<template>
  <section id="products" class="py-20 px-6">
    <div class="max-w-[1400px] mx-auto">
      <!-- Section header -->
      <div class="text-center mb-14">
        <div class="font-mono text-[10px] text-[#00d4ff] tracking-[4px] mb-3">{{ $t('products.sectionTag') }}</div>
        <h2 class="font-display font-extrabold text-4xl md:text-5xl text-white leading-tight">
          <span v-html="$t('products.title', { highlight: `<span class='bg-gradient-to-r from-[#00d4ff] to-[#3b7fff] bg-clip-text text-transparent'>${$t('products.highlight')}</span>` })"></span>
        </h2>
        <p class="mt-4 text-[15px] text-[#5a7099] max-w-xl mx-auto">{{ $t('products.subtitle') }}</p>
      </div>

      <!-- Product grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div
          v-for="(card, i) in cards"
          :key="i"
          class="group relative rounded-2xl border bg-gradient-to-br backdrop-blur-md p-7 cursor-default transition-all duration-300 hover:-translate-y-2 overflow-hidden"
          :class="[cardConfig[i].borderColor, cardConfig[i].bgColor, 'hover:border-opacity-70']"
          :style="{ boxShadow: `0 0 40px ${cardConfig[i].glowColor}` }"
        >
          <!-- Active scanline for first card -->
          <div v-if="cardConfig[i].scanline"
            class="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent animate-pulse"></div>

          <!-- Live badge -->
          <div class="absolute top-4 right-4">
            <span
              class="text-[10px] font-mono px-2.5 py-1 rounded-full"
              :class="card.badgeType === 'live'
                ? 'text-[#00e5a0] bg-[#00e5a0]/10 border border-[#00e5a0]/30 shadow-[0_0_12px_rgba(0,229,160,0.2)]'
                : 'text-[#3d5080] bg-white/3 border border-white/8'"
            >
              <span v-if="card.badgeType === 'live'" class="mr-1.5 inline-block w-1.5 h-1.5 rounded-full bg-[#00e5a0] shadow-[0_0_6px_#00e5a0] relative top-[-1px] animate-pulse"></span>
              {{ card.badge }}
            </span>
          </div>

          <!-- Icon -->
          <div
            class="w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-5 shadow-lg"
            :style="{ background: `linear-gradient(135deg, ${cardConfig[i].accentFrom}44, ${cardConfig[i].accentTo}22)`, border: `1px solid ${cardConfig[i].accentFrom}44` }"
          >
            {{ cardConfig[i].icon }}
          </div>

          <!-- Name & tag -->
          <h3 class="font-display font-bold text-[18px] text-white mb-1">{{ card.name }}</h3>
          <div class="text-[11px] font-mono mb-4 tracking-wide"
            :style="{ color: cardConfig[i].accentFrom + 'bb' }">{{ card.tag }}</div>

          <!-- Description -->
          <p class="text-[13px] text-[#7090c8] mb-5 leading-relaxed">{{ card.description }}</p>

          <!-- Features -->
          <ul class="space-y-2 mb-5">
            <li v-for="(feat, j) in card.features" :key="j"
              class="text-[12px] text-[#8ba4cc] flex items-start gap-2.5">
              <span class="w-1.5 h-1.5 rounded-full mt-[4px] flex-shrink-0 shadow-sm"
                :style="{ background: cardConfig[i].accentTo, boxShadow: `0 0 6px ${cardConfig[i].accentTo}` }"></span>
              {{ feat }}
            </li>
          </ul>

          <!-- CTA -->
          <div class="mt-auto">
            <a v-if="card.url" :href="card.url" target="_blank"
              class="inline-flex items-center gap-1.5 text-[12px] font-semibold transition-all hover:gap-2.5"
              :style="{ color: cardConfig[i].accentTo }">
              {{ card.cta }} <span>→</span>
            </a>
            <span v-else class="text-[11px] font-mono text-[#3d5080]">{{ $t('products.notify') }}</span>
          </div>

          <!-- Hover glow overlay -->
          <div class="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            :style="{ background: `radial-gradient(circle at 50% 0%, ${cardConfig[i].accentFrom}10, transparent 60%)` }"></div>
        </div>
      </div>
    </div>
  </section>
</template>
