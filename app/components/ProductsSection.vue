<script setup lang="ts">
const { t, tm } = useI18n()
const cards = computed(() => tm('products.cards') as any[])

const cardIcons = ['📣', '💬', '📈', '🛍️']
const cardGradients = [
  'from-[#0d47e0]/50 to-[#00d4ff]/30',
  'from-[#00b4c8]/40 to-[#00e5a0]/20',
  'from-[#643cdc]/40 to-[#b450ff]/20',
  'from-[#f5a623]/30 to-[#ff6432]/20',
]
</script>

<template>
  <section id="products" class="py-20 px-6">
    <div class="max-w-[1400px] mx-auto">
      <!-- Section header -->
      <div class="flex items-center gap-4 mb-12">
        <div class="flex-1 h-px bg-gradient-to-r from-[#00d4ff]/30 to-transparent"></div>
        <div class="text-center">
          <div class="font-mono text-[10px] text-[#00d4ff] tracking-[3px] mb-1">{{ $t('products.sectionTag') }}</div>
          <h2 class="font-display font-bold text-2xl text-white">
            <span v-html="$t('products.title', { highlight: `<span class='text-[#00d4ff]'>${$t('products.highlight')}</span>` })"></span>
          </h2>
        </div>
        <div class="flex-1 h-px bg-gradient-to-l from-[#00d4ff]/30 to-transparent"></div>
      </div>

      <!-- Product grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          v-for="(card, i) in cards"
          :key="i"
          class="group relative rounded-2xl border backdrop-blur-md p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1.5 overflow-hidden"
          :class="[
            i === 0
              ? 'bg-gradient-to-br from-[#0d47e0]/25 to-[#0d1937]/90 border-[#00d4ff]/40 shadow-[0_0_30px_rgba(0,212,255,0.1)]'
              : 'bg-[#0d1937]/85 border-[#00d4ff]/18 hover:border-[#00d4ff]/50'
          ]"
        >
          <!-- Featured top line -->
          <div v-if="i === 0" class="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent animate-pulse"></div>

          <!-- Badge -->
          <div class="absolute top-3 right-3 text-[10px] font-mono px-2 py-0.5 rounded"
            :class="card.badgeType === 'live'
              ? 'text-[#00e5a0] bg-[#00e5a0]/10 border border-[#00e5a0]/30'
              : 'text-[#6b82b5] bg-white/5 border border-white/10'">
            {{ card.badge }}
          </div>

          <!-- Icon -->
          <div class="w-10 h-10 rounded-xl flex items-center justify-center text-lg mb-4 bg-gradient-to-br shadow-lg"
            :class="cardGradients[i]">
            {{ cardIcons[i] }}
          </div>

          <!-- Name & tag -->
          <h3 class="font-display font-bold text-[17px] text-white mb-1">{{ card.name }}</h3>
          <div class="text-[11px] font-mono text-[#6b82b5] tracking-wide mb-4">{{ card.tag }}</div>

          <!-- Description -->
          <p class="text-xs text-[#b4c8f0]/70 mb-4 leading-relaxed">{{ card.description }}</p>

          <!-- Features -->
          <ul class="mb-4">
            <li v-for="(feat, j) in card.features" :key="j"
              class="text-xs text-[#b4c8f0]/80 py-1.5 flex items-center gap-2 border-b border-white/[0.04]">
              <span class="w-1 h-1 rounded-full bg-[#00d4ff] shadow-[0_0_4px_#00d4ff] flex-shrink-0"></span>
              {{ feat }}
            </li>
          </ul>

          <!-- CTA for live product -->
          <a v-if="card.url" :href="card.url" target="_blank"
            class="inline-flex items-center gap-2 text-xs font-mono text-[#00d4ff] hover:text-white transition-colors mt-2">
            {{ card.cta }} →
          </a>

          <!-- Bottom glow line on hover -->
          <div class="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>
      </div>
    </div>
  </section>
</template>
