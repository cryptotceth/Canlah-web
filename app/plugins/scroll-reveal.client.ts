export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('reveal', {
    mounted(el, binding) {
      const delay: number = binding.value?.delay ?? 0
      const distance: number = binding.value?.distance ?? 22
      const threshold: number = binding.value?.threshold ?? 0.1

      el.style.opacity = '0'
      el.style.transform = `translateY(${distance}px)`
      el.style.transition = `opacity 0.7s cubic-bezier(0.4,0,0.2,1) ${delay}ms, transform 0.7s cubic-bezier(0.4,0,0.2,1) ${delay}ms`
      el.style.willChange = 'opacity, transform'

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.style.opacity = '1'
            el.style.transform = 'translateY(0)'
            observer.unobserve(el)
          }
        },
        { threshold, rootMargin: '0px 0px -50px 0px' }
      )

      observer.observe(el)
    },
  })
})
