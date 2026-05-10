<script setup lang="ts">
const faqs = useTmList<{ q: string; a: string }[]>('faq.items')
const openIndex = ref<number | null>(0)

function toggle(i: number) {
  openIndex.value = openIndex.value === i ? null : i
}

// FAQPage schema for SEO rich snippets + GEO citation
const faqSchema = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.value.map(item => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.a,
    },
  })),
}))

useHead({
  script: [
    { type: 'application/ld+json', innerHTML: computed(() => JSON.stringify(faqSchema.value)) },
  ],
})
</script>

<template>
  <section id="faq" class="section px-6">
    <div class="max-w-[780px] mx-auto">

      <!-- Section header -->
      <div class="text-center mb-14">
        <div class="font-mono text-[10px] text-[#BDD1F6] tracking-[4px] mb-3">{{ $t('faq.sectionTag') }}</div>
        <h2 class="font-display font-bold text-4xl md:text-5xl text-[#efefe5] leading-[1.15]">
          {{ $t('faq.title') }}
        </h2>
      </div>

      <!-- Accordion -->
      <div v-reveal class="space-y-2">
        <div
          v-for="(item, i) in faqs"
          :key="i"
          class="rounded-[2px] border transition-all duration-200 backdrop-blur-md"
          :class="openIndex === i
            ? 'border-[#BDD1F6]/40 bg-[#0B0A10]/90 shadow-[0_0_40px_rgba(189,209,246,0.12)]'
            : 'border-[#efefe5]/12 bg-[#0B0A10]/75 hover:border-[#efefe5]/25 hover:bg-[#0B0A10]/85'"
        >
          <!-- Question row -->
          <button
            class="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
            @click="toggle(i)"
          >
            <span
              class="font-bold text-[15px] leading-snug transition-colors"
              :class="openIndex === i ? 'text-[#efefe5]' : 'text-[#efefe5]'"
            >{{ item.q }}</span>
            <span
              class="flex-shrink-0 w-6 h-6 rounded-[2px] border flex items-center justify-center text-[11px] transition-all duration-200"
              :class="openIndex === i
                ? 'border-[#BDD1F6]/50 text-[#BDD1F6] rotate-45 bg-[#BDD1F6]/10'
                : 'border-white/15 text-[#efefe5]/40'"
            >+</span>
          </button>

          <!-- Answer -->
          <div
            v-show="openIndex === i"
            class="px-6 pb-5"
          >
            <p class="text-[14px] text-[#BABABA] leading-[1.5] border-t border-white/5 pt-4">{{ item.a }}</p>
          </div>
        </div>
      </div>

      <!-- Still have questions -->
      <div class="text-center mt-10">
        <p class="text-[13px] text-[#5C6470] mb-3">{{ $t('faq.more') }}</p>
        <a href="mailto:hello@canlah.ai"
          class="text-[13px] font-mono text-[#BDD1F6] hover:text-[#efefe5] transition-colors">
          hello@canlah.ai →
        </a>
      </div>

    </div>
  </section>
</template>
