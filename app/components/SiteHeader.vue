<script setup lang="ts">
const { locale, locales, setLocale } = useI18n()
const isMenuOpen = ref(false)
const scrolled = ref(false)
const headerEl = ref<HTMLElement | null>(null)

onMounted(() => {
  const onScroll = () => { scrolled.value = window.scrollY > 60 }
  window.addEventListener('scroll', onScroll, { passive: true })

  const setNavHeight = () => {
    if (!headerEl.value) return
    document.documentElement.style.setProperty('--nav-h', `${headerEl.value.offsetHeight}px`)
  }
  setNavHeight()
  const ro = new ResizeObserver(setNavHeight)
  if (headerEl.value) ro.observe(headerEl.value)

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
    ro.disconnect()
  })
})

const links = [
  { href: '#products',  label: 'Products',  dots: true,  show: 'lg' },
  { href: '#pricing',   label: 'Pricing',   chev: true,  show: 'lg' },
  { href: '#platform',  label: 'Platform',  chev: true,  show: 'xl' },
  { href: '#faq',       label: 'FAQ',                    show: 'xl' },
  { href: '/blog',      label: 'Blog',                   show: 'xl', nuxt: true },
]

const route = useRoute()
const { $lenis } = useNuxtApp() as any
function onLogo(e: MouseEvent) {
  if (route.path === '/') {
    e.preventDefault()
    $lenis?.scrollTo(0, { duration: 1.2 })
    history.replaceState(null, '', '/')
  }
}
</script>

<template>
  <header
    ref="headerEl"
    class="fixed top-0 left-0 right-0 z-50 transition-colors duration-300 backdrop-blur-xl"
    :class="scrolled ? 'bg-[#0a090f]/92' : 'bg-[#0a090f]/72'"
  >
    <!-- chaingpt-style bottom decorative line: solid 1px white + rainbow accent segment -->
    <span class="absolute left-0 right-0 bottom-0 h-px bg-[#efefe5]/25 pointer-events-none"></span>
    <span class="absolute left-1/4 right-1/4 bottom-0 h-px pointer-events-none" style="background-image: var(--rainbow); opacity: 0.55;"></span>
    <div class="relative flex items-end justify-between px-4 sm:px-6 lg:px-10 xl:px-14 pt-5 pb-5 gap-4 lg:gap-6">

      <!-- ── LEFT: rainbow logo + wordmark — scroll to top if on home, else navigate -->
      <a href="/" class="flex items-center gap-2.5 sm:gap-3 flex-shrink-0 group" @click="onLogo">
        <span class="relative w-8 h-8 sm:w-9 sm:h-9 rounded-[2px] border-rainbow overflow-hidden flex items-center justify-center bg-[#0a090f]">
          <img src="/logo-mascot.png" alt="" class="w-[22px] h-[22px] sm:w-[24px] sm:h-[24px] object-contain" />
        </span>
        <span class="font-display font-bold text-[16px] sm:text-[17px] tracking-[0.04em] text-[#efefe5] uppercase">CANLAH&nbsp;AI</span>
      </a>

      <!-- ── CENTER: nav aligned to 25%-75% decorative lines -->
      <nav aria-label="Main navigation" class="hidden lg:flex items-center justify-between absolute left-1/4 right-1/4 top-1/2 -translate-y-1/2">
        <template v-for="(l, i) in links" :key="l.href">
          <NuxtLink v-if="l.nuxt" :to="l.href"
            class="frame-hover font-sans font-normal text-[15px] text-[#efefe5] hover:text-[#efefe5] transition-colors flex items-center gap-1.5 whitespace-nowrap"
            :class="l.show === 'xl' ? 'hidden xl:inline-flex' : ''">
            <i class="fb" aria-hidden="true"></i><i class="fb-rainbow" aria-hidden="true"></i>
            <span v-if="l.dots" class="inline-grid grid-cols-2 gap-[2px] mr-0.5"><span v-for="j in 4" :key="j" class="w-[3px] h-[3px] bg-current rounded-[2px]"></span></span>
            {{ l.label }}
            <span v-if="l.chev" class="text-[9px] opacity-80">▼</span>
          </NuxtLink>
          <a v-else :href="l.href"
            class="frame-hover font-sans font-normal text-[15px] text-[#efefe5] hover:text-[#efefe5] transition-colors flex items-center gap-1.5 whitespace-nowrap"
            :class="l.show === 'xl' ? 'hidden xl:inline-flex' : ''">
            <i class="fb" aria-hidden="true"></i><i class="fb-rainbow" aria-hidden="true"></i>
            <span v-if="l.dots" class="inline-grid grid-cols-2 gap-[2px] mr-0.5"><span v-for="j in 4" :key="j" class="w-[3px] h-[3px] bg-current rounded-[2px]"></span></span>
            {{ l.label }}
            <span v-if="l.chev" class="text-[9px] opacity-80">▼</span>
          </a>
        </template>
      </nav>

      <!-- ── RIGHT: language + LAUNCH DAPP CTA -->
      <div class="flex items-center gap-2 sm:gap-3 justify-end">
        <select
          :value="locale"
          @change="setLocale(($event.target as HTMLSelectElement).value)"
          class="hidden lg:inline-flex bg-transparent border-0 font-sans font-normal text-[14px] text-[#efefe5]/85 cursor-pointer outline-none hover:opacity-70 transition-opacity appearance-none"
        >
          <option v-for="loc in locales" :key="loc.code" :value="loc.code" class="bg-[#0a090f]">{{ loc.name }}</option>
        </select>

        <div class="relative frame-bracket hover:opacity-90 transition-opacity"><i class="fb"></i>
          <span class="absolute top-0 left-3 right-3 h-px" style="background-image: var(--rainbow)"></span>
          <a href="https://app.canmarket.ai" target="_blank"
            class="cockpit-label !text-[11px] sm:!text-[12px] !text-[#efefe5] flex items-center gap-2 whitespace-nowrap">
            <span class="inline-grid grid-cols-2 gap-[2px]"><span v-for="i in 4" :key="i" class="w-[3px] h-[3px] bg-current rounded-[2px]"></span></span>
            <span class="hidden sm:inline">{{ $t('nav.tryFree') }}</span>
            <span class="sm:hidden">Try</span>
          </a>
        </div>

        <button @click="isMenuOpen = !isMenuOpen"
          class="lg:hidden text-[#efefe5] p-1.5 -mr-1 rounded-[2px] hover:bg-[#efefe5]/5 transition-colors"
          :aria-label="isMenuOpen ? 'Close menu' : 'Open menu'">
          <span class="text-lg leading-none">{{ isMenuOpen ? '✕' : '☰' }}</span>
        </button>
      </div>
    </div>

    <!-- ── Mobile dropdown -->
    <div v-if="isMenuOpen" class="lg:hidden border-t border-[#efefe5]/10 bg-[#0a090f]/95 backdrop-blur-xl px-6 py-5 flex flex-col gap-4">
      <a v-for="l in links.filter(x => !x.nuxt)" :key="l.href" :href="l.href"
        class="cockpit-label !text-[12px] !text-[#efefe5]/85 flex items-center gap-2 py-1"
        @click="isMenuOpen = false">
        <span v-if="l.dots" class="inline-grid grid-cols-2 gap-[2px]"><span v-for="i in 4" :key="i" class="w-[3px] h-[3px] bg-current rounded-[2px]"></span></span>
        {{ l.label }}
        <span v-if="l.chev" class="text-[8px] opacity-70 ml-auto">▼</span>
      </a>
      <NuxtLink to="/blog" class="cockpit-label !text-[12px] !text-[#efefe5]/85 flex items-center gap-2 py-1" @click="isMenuOpen = false">Community</NuxtLink>
      <div class="border-t border-[#efefe5]/10 pt-4 flex items-center justify-between gap-3">
        <select :value="locale" @change="setLocale(($event.target as HTMLSelectElement).value)"
          class="bg-transparent text-[#efefe5]/65 cockpit-label !text-[11px] cursor-pointer outline-none">
          <option v-for="loc in locales" :key="loc.code" :value="loc.code" class="bg-[#0a090f]">{{ loc.name }}</option>
        </select>
      </div>
    </div>
  </header>
</template>
