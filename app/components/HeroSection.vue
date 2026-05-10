<script setup lang="ts">
const deployTargets = [
  'Brand Memory Vector',
  'Multi-Agent Studio',
  'Cross-Channel Output',
  'Live Marketplace',
]

// HowItWorks steps as chat bubbles around hero IP — scroll-driven progressive reveal
const howSteps = useTmList<{ num: string; title: string; desc: string; detail: string }[]>('how.steps')
const heroEl = ref<HTMLElement | null>(null)
const heroProgress = ref(0)
let heroRaf = 0
function onHeroScroll() {
  if (heroRaf) return
  heroRaf = requestAnimationFrame(() => {
    heroRaf = 0
    const el = heroEl.value
    if (!el) return
    const rect = el.getBoundingClientRect()
    const total = rect.height - window.innerHeight
    if (total <= 0) { heroProgress.value = 0; return }
    heroProgress.value = Math.max(0, Math.min(1, -rect.top / total))
  })
}
onMounted(() => {
  onHeroScroll()
  window.addEventListener('scroll', onHeroScroll, { passive: true })
})
onUnmounted(() => window.removeEventListener('scroll', onHeroScroll))
function lerp(p: number, start: number, end: number) {
  return Math.max(0, Math.min(1, (p - start) / (end - start)))
}
// Bump curve: fade in then fade out, peak between in1 and out0
function bump(p: number, in0: number, in1: number, out0: number, out1: number) {
  const fIn = lerp(p, in0, in1)
  const fOut = 1 - lerp(p, out0, out1)
  return Math.max(0, Math.min(fIn, fOut))
}
const bubbleRanges = [
  [0.05, 0.10, 0.32, 0.38],
  [0.38, 0.44, 0.62, 0.68],
  [0.68, 0.74, 1.05, 1.10],
] as const
const bubbleProgress = computed(() => {
  const p = heroProgress.value
  return bubbleRanges.map(([a, b, c, d]) => bump(p, a, b, c, d))
})
// Direction-aware transforms: entering slides in from +X, exiting slides out to -X (sense of forward motion)
const bubbleStyles = computed(() => {
  const p = heroProgress.value
  return bubbleRanges.map(([a, b, c, d]) => {
    const fIn = lerp(p, a, b)
    const fOut = lerp(p, c, d)
    const opacity = Math.max(0, Math.min(fIn, 1 - fOut))
    const tx = (1 - fIn) * 28 - fOut * 28
    return {
      opacity,
      transform: `translate(${tx}px, ${(1 - opacity) * 6}px)`,
    }
  })
})
// Indicator line is visible whenever any step bubble is visible
const indicatorOpacity = computed(() => Math.max(...bubbleProgress.value))
// Active step index based on which bubble has the highest visibility
const activeStep = computed(() => {
  const arr = bubbleProgress.value
  let idx = 0
  for (let i = 1; i < arr.length; i++) if (arr[i] > arr[idx]) idx = i
  return idx
})
// Per-step fill ratio for the progress bar segments (0..1 each)
const stepFill = computed(() => {
  const p = heroProgress.value
  return bubbleRanges.map(([a, , c]) => Math.max(0, Math.min(1, (p - a) / (c - a))))
})
// 4 hero mascots: default(1) → STEP 01(2) → STEP 02(3) → STEP 03(4)
const heroMascotOpacity = computed(() => {
  const p = heroProgress.value
  return [
    // Default (1.png) — visible at the very start, fades out as STEP 01 appears
    Math.max(0, 1 - lerp(p, 0.03, 0.10)),
    // STEP 01 (2.png) — 2 viewports of scroll
    bump(p, 0.06, 0.12, 0.32, 0.40),
    // STEP 02 (3.png) — 2 viewports of scroll
    bump(p, 0.36, 0.44, 0.62, 0.70),
    // STEP 03 (4.png) — 2 viewports + extra stay so user keeps scrolling
    bump(p, 0.66, 0.74, 1.10, 1.20),
  ]
})
// Indicator line draw progress — drives line lengths so they grow with scroll
const drawT = computed(() => lerp(heroProgress.value, 0.0, 0.12))
const indicatorStyles = computed(() => {
  const t = drawT.value
  // Stage the segments: seg1 0..0.4, diag 0.4..0.75, seg3 0.75..1.0
  const seg1 = Math.max(0, Math.min(1, t / 0.4))
  const diag = Math.max(0, Math.min(1, (t - 0.4) / 0.35))
  const seg3 = Math.max(0, Math.min(1, (t - 0.75) / 0.25))
  return {
    seg1: { width: `${seg1 * 11}vw` },
    diag: { strokeDashoffset: `${(1 - diag) * 100}%` },
    seg3: { width: `${seg3 * 14}vw` },
    dot: { opacity: seg3, transform: `translate(-50%, -50%) scale(${0.6 + seg3 * 0.4})` },
  }
})

// Typewriter effect — cycles Marketing / Sales / Service / Commerce
const words = ['Marketing', 'Sales', 'Service', 'Commerce']
const displayed = ref('')
let wordIdx = 0
let charIdx = 0
let typing = true
let timer: ReturnType<typeof setTimeout> | null = null

function tick() {
  const target = words[wordIdx]
  if (typing) {
    if (charIdx < target.length) {
      charIdx++
      displayed.value = target.slice(0, charIdx)
      timer = setTimeout(tick, 90)
    } else {
      timer = setTimeout(() => { typing = false; tick() }, 1600)
    }
  } else {
    if (charIdx > 0) {
      charIdx--
      displayed.value = target.slice(0, charIdx)
      timer = setTimeout(tick, 45)
    } else {
      wordIdx = (wordIdx + 1) % words.length
      typing = true
      timer = setTimeout(tick, 220)
    }
  }
}

onMounted(() => { tick() })
onUnmounted(() => { if (timer) clearTimeout(timer) })

// Stats 0→N count-up animation
const { t: $t } = useI18n()
const statKeys = ['revenue', 'engagement', 'cost', 'clients']
const statDisplay = reactive<Record<string, string>>({ revenue: '', engagement: '', cost: '', clients: '' })

function countUp(target: string, key: string, delay: number) {
  const m = target.match(/(-?\d+(?:\.\d+)?)/)
  if (!m) { statDisplay[key] = target; return }
  const tgt = parseFloat(m[0])
  const prefix = target.slice(0, m.index)
  const suffix = target.slice(m.index! + m[0].length)
  const isFloat = m[0].includes('.')
  const decimals = isFloat ? (m[0].split('.')[1]?.length ?? 1) : 0
  // start at 0 of correct format
  statDisplay[key] = prefix + (isFloat ? (0).toFixed(decimals) : '0') + suffix
  setTimeout(() => {
    const t0 = performance.now()
    const dur = 1500
    function frame() {
      const tt = Math.min(1, (performance.now() - t0) / dur)
      const eased = 1 - Math.pow(1 - tt, 3)
      const cur = tgt * eased
      statDisplay[key] = prefix + (isFloat ? cur.toFixed(decimals) : Math.round(cur)) + suffix
      if (tt < 1) requestAnimationFrame(frame)
    }
    requestAnimationFrame(frame)
  }, delay)
}

onMounted(() => {
  statKeys.forEach((k, i) => countUp($t(`stats.${k}.value`), k, 250 + i * 220))
})

</script>

<template>
  <section
    ref="heroEl"
    role="main"
    class="relative w-full"
    style="height: 800svh"
  >
  <div class="sticky top-0 left-0 right-0 h-[100svh] min-h-[100svh] flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-10">
    <!-- soft dot grid (drifts) -->
    <div class="absolute inset-0 bg-dots opacity-40 pointer-events-none anim-drift [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]"></div>


    <!-- TOP RIGHT: stats stack — vertical, right-aligned, char-by-char load anim -->
    <div class="hidden md:flex flex-col gap-[60px] absolute top-24 right-6 lg:top-28 lg:right-10 xl:top-32 xl:right-16 z-[3] items-end text-right">
      <div v-for="(key, si) in statKeys" :key="key">
        <div class="font-display font-bold text-[32px] sm:text-[40px] lg:text-[48px] leading-none text-[#91B3F0] tabular-nums">
          {{ statDisplay[key] || $t(`stats.${key}.value`) }}
        </div>
        <div class="cockpit-label text-[#efefe5]/55 mt-1.5 stat-label" :style="{ animationDelay: `${si * 220 + 500}ms` }">{{ $t(`stats.${key}.label`) }}</div>
      </div>
    </div>

    <!-- CENTER: 3 mascots cross-fade by scroll progress (paired with the 3 step bubbles) -->
    <div class="absolute left-1/2 z-[2] select-none anim-mascot
                top-[144px] sm:top-[148px] lg:top-[168px] xl:top-[176px]
                w-[min(90vw,calc((100vh-220px)*1.0),480px)] sm:w-[min(82vw,calc((100vh-220px)*1.0),640px)] md:w-[min(70vw,calc((100vh-220px)*1.0),760px)] lg:w-[min(58vw,calc((100vh-240px)*1.0),860px)] xl:w-[min(54vw,calc((100vh-240px)*1.0),960px)] 2xl:w-[min(48vw,calc((100vh-240px)*1.0),1080px)]
                aspect-square">
      <img
        v-for="(src, i) in ['/hero/1.png', '/hero/2.png', '/hero/3.png', '/hero/4.png']"
        :key="src"
        :src="src"
        alt="Canlah AI mascot"
        class="absolute inset-0 w-full h-full object-contain pointer-events-none will-change-[opacity]"
        :style="{
          opacity: heroMascotOpacity[i],
          transition: 'opacity 320ms ease-out'
        }"
      />
    </div>

    <!-- HOW-IT-WORKS indicator line: grows from STEP label to mascot as you scroll -->
    <div
      v-if="howSteps && howSteps.length === 3"
      class="hidden lg:block absolute inset-0 z-[3] pointer-events-none will-change-[opacity]"
      :style="{ opacity: indicatorOpacity }"
      aria-hidden="true">
      <!-- Segment 1: horizontal — starts under STEP label, runs right (width grows) -->
      <div class="absolute h-px bg-[#BDD1F6]/60"
        :style="{ top: '32vh', left: '4vw', width: indicatorStyles.seg1.width }"></div>
      <!-- Segment 2: diagonal down-right — SVG line draws via dashoffset -->
      <svg class="absolute" style="top: 32vh; left: 15vw; width: 20vw; height: 28vh; overflow: visible" preserveAspectRatio="none">
        <line x1="0" y1="0" x2="100%" y2="100%"
          pathLength="1"
          stroke-dasharray="1"
          :stroke-dashoffset="indicatorStyles.diag.strokeDashoffset"
          stroke="#BDD1F6" stroke-opacity="0.6" stroke-width="1"
          vector-effect="non-scaling-stroke" />
      </svg>
      <!-- Segment 3: horizontal — runs from diagonal end to mascot side (width grows) -->
      <div class="absolute h-px bg-[#BDD1F6]/60"
        :style="{ top: '60vh', left: '35vw', width: indicatorStyles.seg3.width }"></div>
      <!-- Endpoint dot at mascot side — opacity + scale grow with seg3 -->
      <div class="absolute w-[7px] h-[7px] rounded-full bg-[#BDD1F6]/85"
        :style="{ top: '60vh', left: '49vw', ...indicatorStyles.dot }"></div>
    </div>

    <!-- HOW-IT-WORKS step bubbles — BRIEF-style frame, anchored at BRIEF position, fade sequentially -->
    <template v-if="howSteps && howSteps.length === 3">
      <div
        v-for="(step, i) in howSteps" :key="`bubble-${i}`"
        class="hidden md:block absolute top-24 left-4 sm:left-6 lg:top-28 lg:left-10 xl:top-32 xl:left-16 max-w-[320px] lg:max-w-[400px] z-[4] pointer-events-auto will-change-[opacity,transform]"
        :style="bubbleStyles[i]">
        <div class="frame-bracket"><i class="fb"></i>
          <span class="text-rainbow font-display text-[28px] leading-none block mb-2">"</span>
          <p class="cockpit-label !text-[14px] !leading-[1.55] !tracking-[1.2px] !normal-case text-[#efefe5]/85 !m-0">
            {{ step.desc }}
          </p>
        </div>
        <div class="cockpit-label mt-3 text-[#91B3F0] flex items-center gap-2 font-bold tracking-[3px]">
          <span class="text-[#91B3F0]">▸</span>STEP&nbsp;{{ step.num }}
        </div>
      </div>

    </template>

    <!-- BOTTOM LEFT: three-line headline with rainbow-framed typewriter word — swapped with quote -->
    <div class="absolute bottom-[12vh] sm:bottom-[14vh] lg:bottom-[10vh] left-4 sm:left-6 lg:left-10 xl:left-16 z-[3] max-w-[calc(100vw-32px)] flex flex-col gap-2 sm:gap-3">
      <span class="font-display text-[28px] sm:text-[36px] md:text-[44px] lg:text-[52px] xl:text-[60px] leading-none tracking-[-0.02em] text-[#BDD1F6]/90">
        AI Agents for
      </span>
      <div class="border-rainbow rounded-[2px] inline-flex items-center self-start px-3.5 py-2 sm:px-4 sm:py-2.5 lg:px-5 lg:py-3 min-w-[6ch]">
        <span class="font-display font-bold text-[28px] sm:text-[36px] md:text-[44px] lg:text-[52px] xl:text-[60px] leading-none tracking-[-0.02em] text-[#efefe5] whitespace-nowrap">
          {{ displayed || ' ' }}<span class="typer-cursor inline-block ml-0.5 align-baseline w-[2px] bg-[#efefe5]"></span>
        </span>
      </div>
      <span class="font-display text-[28px] sm:text-[36px] md:text-[44px] lg:text-[52px] xl:text-[60px] leading-none tracking-[-0.02em] text-[#BDD1F6]/90">
        at Scale
      </span>
    </div>

    <!-- BOTTOM RIGHT: Start free CTA (24px above scroll cue) + scroll cue -->
    <div class="hidden sm:flex absolute bottom-20 right-6 lg:bottom-24 lg:right-10 xl:right-16 z-[3] flex-col items-end gap-6">
      <a href="https://app.canmarket.ai" target="_blank"
        class="border-rainbow rounded-[2px] inline-flex items-center gap-2 px-5 py-3 cockpit-label !text-[12px] !text-[#efefe5] hover:opacity-90 transition-opacity whitespace-nowrap pointer-events-auto">
        <span class="inline-grid grid-cols-2 gap-[2px]"><span v-for="i in 4" :key="i" class="w-[3px] h-[3px] bg-current rounded-[2px]"></span></span>
        Start free <span>→</span>
      </a>
      <div class="flex items-center gap-3 cockpit-label text-[#efefe5]/55">
        <span>SCROLL</span>
        <span class="text-[18px] anim-pulse-soft inline-block">↓</span>
      </div>
    </div>

    <!-- BOTTOM CENTER: caption -->
    <p class="absolute bottom-6 left-1/2 -translate-x-1/2 z-[3] text-center text-[12px] sm:text-[13px] lg:text-[14px] text-[#efefe5]/70 max-w-[90vw] leading-[1.5]">
      Your AI agents for every business function — marketing, sales, service &amp; commerce.
    </p>
  </div>
  </section>
</template>

<style scoped>
.hero-bubble {
  position: relative;
  background: rgba(11, 10, 16, 0.82);
  border: 1px solid rgba(189, 209, 246, 0.28);
  border-radius: 4px;
  padding: 12px 14px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 12px 32px -12px rgba(0,0,0,0.5);
}
.hero-bubble::before,
.hero-bubble::after {
  content: "";
  position: absolute;
  top: 50%;
  width: 0; height: 0;
  border: 7px solid transparent;
  transform: translateY(-50%);
  pointer-events: none;
}
.hero-bubble--right::before {
  right: -14px;
  border-left-color: rgba(189, 209, 246, 0.28);
}
.hero-bubble--right::after {
  right: -12px;
  border-left-color: rgba(11, 10, 16, 0.82);
}
.hero-bubble--left::before {
  left: -14px;
  border-right-color: rgba(189, 209, 246, 0.28);
}
.hero-bubble--left::after {
  left: -12px;
  border-right-color: rgba(11, 10, 16, 0.82);
}
</style>
