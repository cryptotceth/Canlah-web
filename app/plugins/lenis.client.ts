import Lenis from 'lenis'

export default defineNuxtPlugin(() => {
  const lenis = new Lenis({
    duration: 1.15,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.4,
  })
  function raf(time: number) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)

  // Intercept same-page anchor clicks (#products / #pricing / etc) so Lenis can do smooth scroll
  document.addEventListener('click', (e) => {
    const t = e.target as HTMLElement | null
    if (!t) return
    const a = t.closest('a')
    if (!a) return
    const href = a.getAttribute('href')
    if (!href || !href.startsWith('#') || href === '#') return
    let target: HTMLElement | null = null
    try { target = document.querySelector(href) } catch { return }
    if (!target) return
    e.preventDefault()
    // offset = -nav height (96 lg) so target isn't hidden under fixed nav
    lenis.scrollTo(target, { offset: -96, duration: 1.2 })
    history.pushState(null, '', href)
  })

  return { provide: { lenis } }
})
