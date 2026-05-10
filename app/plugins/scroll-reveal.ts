export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('reveal', {
    getSSRProps: () => ({}),
    mounted(el, binding) {
      const delay: number = binding.value?.delay ?? 0
      const distance: number = binding.value?.distance ?? 22
      const threshold: number = binding.value?.threshold ?? 0.1

      const captureMode = location.hash.includes('figmacapture=')
      if (captureMode) {
        el.style.opacity = '1'
        el.style.transform = 'translateY(0)'
        return
      }
      const rotate: number = binding.value?.rotate ?? 6
      const scale: number = binding.value?.scale ?? 0.96
      el.style.opacity = '0'
      el.style.transformOrigin = '50% 100%'
      el.style.transform = `translateY(${distance}px) rotateX(${rotate}deg) scale(${scale})`
      el.style.transition = `opacity 0.85s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.85s cubic-bezier(0.22,1,0.36,1) ${delay}ms`
      el.style.willChange = 'opacity, transform'

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.style.opacity = '1'
            el.style.transform = 'translateY(0) rotateX(0) scale(1)'
            observer.unobserve(el)
          }
        },
        { threshold, rootMargin: '0px 0px -50px 0px' }
      )

      observer.observe(el)
    },
  })
})
