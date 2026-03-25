<script setup lang="ts">
const { t, tm } = useI18n()
const cards = computed(() => tm('products.cards') as any[])

const waitlistEmails = reactive<Record<number, string>>({})
const waitlistSubmitted = reactive<Record<number, boolean>>({})

function submitWaitlist(index: number) {
  const email = waitlistEmails[index]?.trim()
  if (!email || !email.includes('@')) return

  // Store locally (replace with API call when backend is ready)
  const existing = JSON.parse(localStorage.getItem('canlah_waitlist') || '[]')
  existing.push({ email, product: cards.value[index]?.name, timestamp: new Date().toISOString() })
  localStorage.setItem('canlah_waitlist', JSON.stringify(existing))

  waitlistSubmitted[index] = true
}

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
    icon: '🎨',
    accentFrom: '#e04690',
    accentTo: '#ff6ba6',
    borderColor: 'border-[#ff6ba6]/25',
    bgColor: 'from-[#2a0a1a]/80 to-[#061030]/90',
    glowColor: 'rgba(255,107,166,0.08)',
    glowHoverColor: 'rgba(255,107,166,0.15)',
    scanline: true,
  },
  {
    icon: '🛒',
    accentFrom: '#00b4c8',
    accentTo: '#00e5a0',
    borderColor: 'border-[#00e5a0]/25',
    bgColor: 'from-[#071a1a]/80 to-[#061030]/90',
    glowColor: 'rgba(0,229,160,0.08)',
    glowHoverColor: 'rgba(0,229,160,0.15)',
    scanline: true,
  },
  {
    icon: '💬',
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
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div
          v-for="(card, i) in cards"
          :key="i"
          v-reveal="{ delay: i * 100 }"
          class="group relative rounded-2xl border bg-gradient-to-br backdrop-blur-md p-7 cursor-default transition-all duration-300 hover:-translate-y-2 overflow-hidden"
          :class="[cardConfig[i].borderColor, cardConfig[i].bgColor, 'hover:border-opacity-70']"
          :style="{ boxShadow: `0 0 40px ${cardConfig[i].glowColor}` }"
        >
          <!-- Active scanline for first card -->
          <div v-if="cardConfig[i].scanline"
            class="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00d4ff]/60 to-transparent"></div>

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
            <div v-else>
              <!-- Waitlist success -->
              <div v-if="waitlistSubmitted[i]" class="flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-[#00e5a0]"></span>
                <span class="text-[11px] font-mono text-[#00e5a0]">We'll notify you at launch!</span>
              </div>
              <!-- Waitlist form -->
              <form v-else class="flex gap-1.5" @submit.prevent="submitWaitlist(i)">
                <input
                  v-model="waitlistEmails[i]"
                  type="email"
                  placeholder="you@company.com"
                  required
                  class="flex-1 min-w-0 px-3 py-1.5 rounded-lg text-[11px] bg-white/5 border border-white/10 text-white placeholder-[#3d5080] outline-none focus:border-white/25 transition-colors"
                />
                <button
                  type="submit"
                  class="flex-shrink-0 px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all hover:brightness-110"
                  :style="{ background: cardConfig[i].accentFrom + '30', color: cardConfig[i].accentTo }"
                >
                  Notify me
                </button>
              </form>
            </div>
          </div>

          <!-- Hover glow overlay -->
          <div class="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            :style="{ background: `radial-gradient(circle at 50% 0%, ${cardConfig[i].accentFrom}10, transparent 60%)` }"></div>
        </div>
      </div>
    </div>
  </section>
</template>
