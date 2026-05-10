<script setup lang="ts">
const allCards = useTmList<any[]>('products.cards')
const cards = allCards

const waitlistEmails = reactive<Record<number, string>>({})
const waitlistSubmitted = reactive<Record<number, boolean>>({})
const active = ref(0)
const textReveal = ref(0) // 0 → 1: text + indicator + features fade in
const ipReveal = ref(0)   // 0 → 1: CanMarket silhouette → color mask reveal (intro only)
const trackEl = ref<HTMLElement | null>(null)

let raf = 0
function compute() {
  raf = 0
  const el = trackEl.value
  const len = cards.value?.length || 0
  if (!el || !len) return
  const rect = el.getBoundingClientRect()
  const total = rect.height - window.innerHeight
  if (total <= 0) { active.value = 0; textReveal.value = 0; return }
  const p = Math.max(0, Math.min(0.9999, -rect.top / total))
  // Layout: 2 intro (CanMarket) + (N-1) cards × 2 units + 1 extra stay
  // Each card has IP entrance, text reveal, then a full ~viewport buffer after CTA appears.
  const cardUnit = 2
  const intro = cardUnit
  const cardsCount = len - 1
  const remaining = cardsCount * cardUnit
  const extra = 1
  const totalUnits = intro + remaining + extra
  const introEnd = intro / totalUnits
  const cardsEnd = (intro + remaining) / totalUnits
  if (p < introEnd) {
    // Intro = CanMarket: IP mask 0..30%, text reveal 30..50%, full-viewport buffer 50..100%
    active.value = 0
    const introP = p / introEnd
    ipReveal.value = Math.max(0, Math.min(1, introP / 0.30))
    textReveal.value = Math.max(0, Math.min(1, (introP - 0.30) / 0.20))
  } else if (p < cardsEnd) {
    // active 1..N-1 (CanArt, CanSell, CanService, CanCommerce)
    const cardP = (p - introEnd) / (cardsEnd - introEnd)
    const offset = Math.min(cardsCount - 1, Math.floor(cardP * cardsCount))
    const cardLocalP = cardP * cardsCount - offset
    active.value = 1 + offset
    // cardLocalP 0..0.15 = IP only, 0.15..0.50 = text fades in (CTA finishes around 0.50),
    // 0.50..1.0 = full viewport buffer where everything stays on screen
    textReveal.value = Math.max(0, Math.min(1, (cardLocalP - 0.15) / 0.35))
    ipReveal.value = 1
  } else {
    // Extra stay on last card (CanCommerce)
    active.value = len - 1
    textReveal.value = 1
    ipReveal.value = 1
  }
}
function onScroll() { if (!raf) raf = requestAnimationFrame(compute) }

onMounted(() => {
  compute()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
})

function submitWaitlist(index: number) {
  const email = waitlistEmails[index]?.trim()
  if (!email || !email.includes('@')) return
  const existing = JSON.parse(localStorage.getItem('canlah_waitlist') || '[]')
  existing.push({ email, product: cards.value[index]?.name, timestamp: new Date().toISOString() })
  localStorage.setItem('canlah_waitlist', JSON.stringify(existing))
  waitlistSubmitted[index] = true
}

// Reactive viewport size for px-accurate indicator positioning
const vpW = ref(1280)
const vpH = ref(800)
const stickyCanvasEl = ref<HTMLElement | null>(null)
const featuresWrapperEl = ref<HTMLElement | null>(null)
const ipBoxEl = ref<HTMLElement | null>(null)
const featuresUls: (HTMLElement | null)[] = []
function setFeaturesUl(el: any, i: number) {
  if (el) featuresUls[i] = el as HTMLElement
}
const indicator = reactive({
  startX: 0, startY: 0, kinkX: 0, kinkY: 0, endX: 0, endY: 0,
  canvasW: 0, canvasH: 0,
})

let measureRaf = 0
function measureIndicator() {
  if (typeof window === 'undefined') return
  vpW.value = window.innerWidth
  vpH.value = window.innerHeight
  const canvas = stickyCanvasEl.value
  if (!canvas) return
  const cRect = canvas.getBoundingClientRect()
  indicator.canvasW = cRect.width
  indicator.canvasH = cRect.height

  // Start = active features ul left edge, vertically centered, relative to canvas
  let startX = cRect.width * 0.72
  let startY = cRect.height * 0.22
  const ul = featuresUls[active.value]
  if (ul) {
    const r = ul.getBoundingClientRect()
    startX = r.left - cRect.left
    startY = r.top + r.height * 0.5 - cRect.top
  } else if (featuresWrapperEl.value) {
    const r = featuresWrapperEl.value.getBoundingClientRect()
    startX = r.right - cRect.left - 280
    startY = r.top + r.height * 0.5 - cRect.top
  }
  // End = near the mascot's body (inside IP box, accounting for PNG transparent padding)
  let endX = cRect.width * 0.5
  let endY = cRect.height * 0.55
  if (ipBoxEl.value) {
    const r = ipBoxEl.value.getBoundingClientRect()
    endX = r.left + r.width * 0.6 - cRect.left
    endY = r.top + r.height * 0.55 - cRect.top
  }
  indicator.startX = Math.round(startX)
  indicator.startY = Math.round(startY)
  // short horizontal segment from start, then long diagonal down-left to end
  indicator.kinkX = Math.round(startX - 30)
  indicator.kinkY = Math.round(startY)
  indicator.endX = Math.round(endX)
  indicator.endY = Math.round(endY)
}
function scheduleMeasure() {
  if (measureRaf) return
  measureRaf = requestAnimationFrame(() => { measureRaf = 0; measureIndicator() })
}
onMounted(() => {
  nextTick(measureIndicator)
  window.addEventListener('resize', scheduleMeasure, { passive: true })
  window.addEventListener('scroll', scheduleMeasure, { passive: true })
})
onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', scheduleMeasure)
    window.removeEventListener('scroll', scheduleMeasure)
  }
  if (measureRaf) cancelAnimationFrame(measureRaf)
})
watch(active, () => nextTick(measureIndicator))

const cardConfig = [
  { icon: '/agents/CanMarket.png',  darkIcon: '/agents/CanMarket-dark.png', accentFrom: '#91B3F0', accentTo: '#BDD1F6' },
  { icon: '/agents/CanArt.png',     accentFrom: '#91B3F0', accentTo: '#91B3F0' },
  { icon: '/agents/CanSell.png',    accentFrom: '#BDD1F6', accentTo: '#BDD1F6' },
  { icon: '/agents/CanService.png', accentFrom: '#91B3F0', accentTo: '#BDD1F6' },
  { icon: '/agents/CanCommerce.png',accentFrom: '#BDD1F6', accentTo: '#91B3F0' },
]

const total = computed(() => cards.value?.length || 0)
const pad2 = (n: number) => String(n).padStart(2, '0')
function featReveal(j: number) {
  return Math.max(0, Math.min(1, (textReveal.value - j * 0.15) / 0.3))
}
// Reveal each quadrant in reading order: TL → TR → BL → BR
const quadrantReveal = computed(() => {
  const t = textReveal.value
  return [
    Math.max(0, Math.min(1, (t - 0.00) / 0.32)), // 0: top-left  (AGENT label + name)
    Math.max(0, Math.min(1, (t - 0.22) / 0.32)), // 1: top-right (features list)
    Math.max(0, Math.min(1, (t - 0.44) / 0.32)), // 2: bottom-left (description)
    Math.max(0, Math.min(1, (t - 0.66) / 0.34)), // 3: bottom-right (CTA)
  ]
})
</script>

<template>
  <section id="products" class="section px-6">
    <div class="wide">
      <!-- Section header -->
      <div class="text-center mb-14">
        <div class="font-mono text-[10px] text-[#BDD1F6] tracking-[4px] mb-3">{{ $t('products.sectionTag') }}</div>
        <h2 class="font-display font-bold text-4xl md:text-5xl text-[#efefe5] leading-[1.15]">
          <span v-html="$t('products.title', { highlight: `<span class='bg-gradient-to-r from-[#BDD1F6] to-[#91B3F0] bg-clip-text text-transparent'>${$t('products.highlight')}</span>` })"></span>
        </h2>
        <p class="mt-4 text-[15px] text-[#BABABA] max-w-xl mx-auto">{{ $t('products.subtitle') }}</p>
      </div>
    </div>

    <!-- DESKTOP (lg+): scroll-pinned flex stage: left text · center IP · right text — fully fluid -->
    <div ref="trackEl" class="hidden lg:block relative -mx-6" :style="{ height: `${(total * 2 + 1) * 220}vh` }">
      <div ref="stickyCanvasEl" class="sticky top-[var(--nav-h,4rem)] h-[calc(100vh-var(--nav-h,4rem))] overflow-hidden">

        <!-- Indicator line: appears with the features list (reveal #1) -->
        <div class="absolute inset-0 pointer-events-none z-[5]" aria-hidden="true" :style="{ opacity: quadrantReveal[1] }">
          <svg class="absolute inset-0 w-full h-full" :viewBox="`0 0 ${indicator.canvasW || 1} ${indicator.canvasH || 1}`" preserveAspectRatio="none">
            <polyline
              :points="`${indicator.startX},${indicator.startY} ${indicator.kinkX},${indicator.kinkY} ${indicator.endX},${indicator.endY}`"
              fill="none" stroke="#91B3F0" stroke-opacity="0.7" stroke-width="1.5"
              vector-effect="non-scaling-stroke" />
          </svg>
          <!-- Start dot — at features list left edge -->
          <div class="absolute w-[10px] h-[10px] rounded-full"
            :style="{ left: indicator.startX + 'px', top: indicator.startY + 'px', background: '#91B3F0', transform: 'translate(-50%, -50%)', boxShadow: '0 0 12px rgba(145,179,240,.6)' }"></div>
          <!-- End dot — on the mascot / IP -->
          <div class="absolute w-[10px] h-[10px] rounded-full"
            :style="{ left: indicator.endX + 'px', top: indicator.endY + 'px', background: '#91B3F0', transform: 'translate(-50%, -50%)', boxShadow: '0 0 12px rgba(145,179,240,.6)' }"></div>
        </div>

        <div class="absolute inset-0 flex items-stretch gap-8 px-10 py-8 xl:gap-12 xl:px-14 xl:py-12">

          <!-- LEFT COL: top = AGENT label + Name; bottom = description -->
          <div class="flex-1 min-w-0 flex flex-col justify-between items-start py-4">
            <!-- top-left (reveal #0) -->
            <div class="grid w-fit max-w-[clamp(260px,28vw,440px)] will-change-[opacity,transform]"
              :style="{ opacity: quadrantReveal[0], transform: `translateY(${(1 - quadrantReveal[0]) * 14}px)` }">
              <div
                v-for="(card, i) in cards"
                :key="`tl-${i}`"
                class="col-start-1 row-start-1 transition-opacity duration-500 ease-out"
                :class="active === i ? 'opacity-100' : 'opacity-0 pointer-events-none'"
              >
                <!-- ROW 1: AGENT 0N inside 4-corner rainbow frame; ROW 2: tag below -->
                <div class="flex flex-col items-start gap-3 mb-6">
                  <div class="relative inline-flex items-center justify-center px-5 py-2.5">
                    <span class="absolute top-0 left-0 w-[12px] h-[12px] border-l border-t" style="border-color:#4DD9FF"></span>
                    <span class="absolute top-0 right-0 w-[12px] h-[12px] border-r border-t" style="border-color:#91B3F0"></span>
                    <span class="absolute bottom-0 left-0 w-[12px] h-[12px] border-l border-b" style="border-color:#4DD9FF"></span>
                    <span class="absolute bottom-0 right-0 w-[12px] h-[12px] border-r border-b" style="border-color:#FF9C66"></span>
                    <span class="font-mono text-[13px] text-[#efefe5] tracking-[0.18em] uppercase whitespace-nowrap">AGENT&nbsp;{{ pad2(i + 1) }}</span>
                  </div>
                  <div class="font-mono text-[11px] tracking-[2.5px] uppercase text-[#efefe5]/60 leading-[1.4]">
                    {{ card.tag }}
                  </div>
                </div>
                <h3 class="font-display font-bold leading-[1] tracking-[-0.01em] text-[#efefe5]"
                  style="font-size: clamp(36px, 4vw, 60px)">
                  {{ card.name }}
                </h3>
              </div>
            </div>
            <!-- bottom-left (reveal #2) -->
            <div class="grid w-fit max-w-[clamp(240px,24vw,380px)] will-change-[opacity,transform]"
              :style="{ opacity: quadrantReveal[2], transform: `translateY(${(1 - quadrantReveal[2]) * 14}px)` }">
              <p
                v-for="(card, i) in cards"
                :key="`bl-${i}`"
                class="col-start-1 row-start-1 text-[#BABABA] leading-[1.6] transition-opacity duration-500 ease-out"
                style="font-size: clamp(13px, 0.95vw, 15px)"
                :class="active === i ? 'opacity-100' : 'opacity-0 pointer-events-none'"
              >{{ card.description }}</p>
            </div>
          </div>

          <!-- CENTER COL: IP layers — fully fluid; vw-driven width, vh-driven height -->
          <div class="flex-shrink-0 flex items-center justify-center">
            <div ref="ipBoxEl" class="relative w-[clamp(500px,52vw,900px)] h-[clamp(600px,96vh,1100px)]">
              <div
                v-for="(card, i) in cards"
                :key="`ip-${i}`"
                class="absolute inset-0 transition-opacity duration-500 ease-out will-change-[opacity]"
                :class="active === i ? 'opacity-100' : 'opacity-0'"
              >
                <!-- For CanMarket (i=0): silhouette dissolves bottom→top, color reveals bottom→top -->
                <template v-if="i === 0 && cardConfig[i].darkIcon">
                  <img
                    :src="cardConfig[i].darkIcon"
                    :alt="card.name + ' silhouette'"
                    class="ip-anim absolute inset-0 m-auto w-full h-full object-contain select-none"
                    :style="{
                      maskImage: `linear-gradient(to top, transparent 0%, transparent ${ipReveal*100}%, black ${ipReveal*100}%, black 100%)`,
                      WebkitMaskImage: `linear-gradient(to top, transparent 0%, transparent ${ipReveal*100}%, black ${ipReveal*100}%, black 100%)`
                    }"
                  />
                  <img
                    :src="cardConfig[i].icon"
                    :alt="card.name"
                    class="ip-anim absolute inset-0 m-auto w-full h-full object-contain select-none"
                    :style="{
                      maskImage: `linear-gradient(to top, black 0%, black ${ipReveal*100}%, transparent ${ipReveal*100}%, transparent 100%)`,
                      WebkitMaskImage: `linear-gradient(to top, black 0%, black ${ipReveal*100}%, transparent ${ipReveal*100}%, transparent 100%)`
                    }"
                  />
                </template>
                <img
                  v-else
                  :src="cardConfig[i].icon"
                  :alt="card.name"
                  class="ip-anim absolute inset-0 m-auto w-full h-full object-contain select-none"
                />
              </div>
            </div>
          </div>

          <!-- RIGHT COL: top = features; bottom = CTA -->
          <div class="flex-1 min-w-0 flex flex-col justify-between items-stretch py-4">
            <!-- top-right (reveal #1) -->
            <div ref="featuresWrapperEl" class="relative w-full min-h-[220px] will-change-[opacity,transform]"
              :style="{ opacity: quadrantReveal[1], transform: `translateY(${(1 - quadrantReveal[1]) * 14}px)` }">
              <ul
                v-for="(card, i) in cards"
                :key="`tr-${i}`"
                :ref="(el) => setFeaturesUl(el, i)"
                class="absolute top-0 right-0 space-y-3 transition-opacity duration-500 ease-out"
                :class="active === i ? 'opacity-100' : 'opacity-0 pointer-events-none'"
              >
                <li v-for="(feat, j) in card.features" :key="j"
                  class="text-[#91B3F0] leading-[1.35] flex items-start gap-3 whitespace-nowrap will-change-[opacity,transform]"
                  :style="{
                    fontSize: 'clamp(15px, 1.25vw, 19px)',
                    opacity: featReveal(j),
                    transform: `translateX(${(1 - featReveal(j)) * 16}px)`
                  }">
                  <span class="mt-[10px] w-1 h-1 rounded-full bg-[#91B3F0] flex-shrink-0"></span>
                  <span>{{ feat }}</span>
                </li>
              </ul>
            </div>
            <!-- bottom-right (reveal #3) -->
            <div class="relative w-full min-h-[60px] will-change-[opacity,transform]"
              :style="{ opacity: quadrantReveal[3], transform: `translateY(${(1 - quadrantReveal[3]) * 14}px)` }">
              <div
                v-for="(card, i) in cards"
                :key="`br-${i}`"
                class="absolute bottom-0 right-0 transition-opacity duration-500 ease-out"
                :class="active === i ? 'opacity-100' : 'opacity-0 pointer-events-none'"
              >
                <a v-if="card.url" :href="card.url" target="_blank"
                  class="border-rainbow rounded-[2px] inline-flex items-center justify-center gap-3 w-[240px] px-6 py-3.5 cockpit-label !text-[12px] !text-[#efefe5] hover:opacity-90 transition-opacity whitespace-nowrap"
                >
                  <span class="inline-grid grid-cols-2 gap-[2px]"><span v-for="d in 4" :key="d" class="w-[3px] h-[3px] bg-current rounded-[2px]"></span></span>
                  Try {{ card.name }} <span>→</span>
                </a>
                <div v-else>
                  <div v-if="waitlistSubmitted[i]"
                    class="border-rainbow rounded-[2px] inline-flex items-center justify-center gap-3 w-[240px] px-6 py-3.5 cockpit-label !text-[11px] !text-[#BDD1F6]">
                    <span class="w-1.5 h-1.5 rounded-[2px] bg-[#BDD1F6] shadow-[0_0_6px_#BDD1F6]"></span>
                    We'll notify you at launch
                  </div>
                  <form v-else class="flex flex-col gap-2 items-stretch w-[240px]" @submit.prevent="submitWaitlist(i)">
                    <input
                      v-model="waitlistEmails[i]"
                      type="email"
                      placeholder="you@company.com"
                      required
                      class="rounded-[2px] bg-[#0B0A10]/80 border border-[#efefe5]/30 text-[#efefe5] placeholder-[#efefe5]/35 outline-none focus:border-[#efefe5]/60 px-4 py-3.5 text-[12px] font-mono w-full"
                    />
                    <button type="submit"
                      class="border-rainbow rounded-[2px] inline-flex items-center justify-center gap-3 w-full px-6 py-3.5 cockpit-label !text-[12px] !text-[#efefe5] hover:opacity-90 transition-opacity whitespace-nowrap">
                      <span class="inline-grid grid-cols-2 gap-[2px]"><span v-for="d in 4" :key="d" class="w-[3px] h-[3px] bg-current rounded-[2px]"></span></span>
                      Notify me <span>→</span>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- MOBILE / TABLET (<lg): plain stacked -->
    <div class="lg:hidden wide flex flex-col gap-12 px-2">
      <div v-for="(card, i) in cards" :key="`m-${i}`"
        class="flex flex-col items-center text-center gap-4">
        <div class="font-mono text-[11px] tracking-[2.5px] uppercase text-[#efefe5]/60">
          AGENT&nbsp;{{ pad2(i + 1) }} · {{ card.tag }}
        </div>
        <img :src="cardConfig[i].icon" :alt="card.name" class="w-64 h-64 object-contain" />
        <h3 class="font-display font-bold text-[32px] text-[#efefe5]">{{ card.name }}</h3>
        <p class="text-[13px] text-[#BABABA] leading-[1.6] max-w-[480px]">{{ card.description }}</p>
        <ul class="space-y-2 self-start mx-auto text-left">
          <li v-for="(feat, j) in card.features" :key="j" class="text-[15px] text-[#efefe5] flex items-start gap-3">
            <span class="mt-[9px] w-1 h-1 rounded-full bg-[#efefe5] flex-shrink-0"></span>
            <span>{{ feat }}</span>
          </li>
        </ul>
        <a v-if="card.url" :href="card.url" target="_blank"
          class="border-rainbow rounded-[2px] inline-flex items-center justify-center gap-3 w-[220px] px-6 py-3 cockpit-label !text-[12px] !text-[#efefe5] hover:opacity-90 transition-opacity whitespace-nowrap mt-2">
          <span class="inline-grid grid-cols-2 gap-[2px]"><span v-for="d in 4" :key="d" class="w-[3px] h-[3px] bg-current rounded-[2px]"></span></span>
          Try {{ card.name }} <span>→</span>
        </a>
        <form v-else-if="!waitlistSubmitted[i]" class="flex flex-col gap-2 items-stretch w-[220px] mt-2" @submit.prevent="submitWaitlist(i)">
          <input v-model="waitlistEmails[i]" type="email" placeholder="you@company.com" required
            class="w-full rounded-[2px] bg-[#0B0A10]/80 border border-[#efefe5]/30 text-[#efefe5] placeholder-[#efefe5]/35 outline-none focus:border-[#efefe5]/60 px-3 py-3 text-[12px] font-mono" />
          <button type="submit"
            class="border-rainbow rounded-[2px] inline-flex items-center justify-center gap-3 w-full px-6 py-3 cockpit-label !text-[12px] !text-[#efefe5] hover:opacity-90 transition-opacity whitespace-nowrap">
            <span class="inline-grid grid-cols-2 gap-[2px]"><span v-for="d in 4" :key="d" class="w-[3px] h-[3px] bg-current rounded-[2px]"></span></span>
            Notify me <span>→</span>
          </button>
        </form>
        <div v-else class="border-rainbow rounded-[2px] inline-flex items-center justify-center gap-3 w-[220px] px-6 py-3 cockpit-label !text-[11px] !text-[#BDD1F6] mt-2">
          <span class="w-1.5 h-1.5 rounded-[2px] bg-[#BDD1F6] shadow-[0_0_6px_#BDD1F6]"></span>
          We'll notify you at launch
        </div>
      </div>
    </div>
  </section>
</template>
