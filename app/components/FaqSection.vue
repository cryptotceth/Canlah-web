<script setup lang="ts">
const { tm } = useI18n()
const faqs = computed(() => tm('faq.items') as { q: string; a: string }[])
const openIndex = ref<number | null>(0)

function toggle(i: number) {
  openIndex.value = openIndex.value === i ? null : i
}
</script>

<template>
  <section id="faq" class="py-20 px-6">
    <div class="max-w-[780px] mx-auto">

      <!-- Section header -->
      <div class="text-center mb-14">
        <div class="font-mono text-[10px] text-[#00d4ff] tracking-[4px] mb-3">{{ $t('faq.sectionTag') }}</div>
        <h2 class="font-display font-extrabold text-4xl md:text-5xl text-white leading-tight">
          {{ $t('faq.title') }}
        </h2>
      </div>

      <!-- Accordion -->
      <div v-reveal class="space-y-2">
        <div
          v-for="(item, i) in faqs"
          :key="i"
          class="rounded-xl border transition-all duration-200"
          :class="openIndex === i
            ? 'border-[#00d4ff]/30 bg-[#00d4ff]/[0.04]'
            : 'border-white/6 bg-white/[0.02] hover:border-white/12'"
        >
          <!-- Question row -->
          <button
            class="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
            @click="toggle(i)"
          >
            <span
              class="font-semibold text-[15px] leading-snug transition-colors"
              :class="openIndex === i ? 'text-white' : 'text-[#9ab0d4]'"
            >{{ item.q }}</span>
            <span
              class="flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center text-[11px] transition-all duration-200"
              :class="openIndex === i
                ? 'border-[#00d4ff]/50 text-[#00d4ff] rotate-45 bg-[#00d4ff]/10'
                : 'border-white/15 text-white/40'"
            >+</span>
          </button>

          <!-- Answer -->
          <div
            v-show="openIndex === i"
            class="px-6 pb-5"
          >
            <p class="text-[14px] text-[#6080a8] leading-relaxed border-t border-white/5 pt-4">{{ item.a }}</p>
          </div>
        </div>
      </div>

      <!-- Still have questions -->
      <div class="text-center mt-10">
        <p class="text-[13px] text-[#3d5880] mb-3">{{ $t('faq.more') }}</p>
        <a href="mailto:hello@canlah.ai"
          class="text-[13px] font-mono text-[#00d4ff] hover:text-white transition-colors">
          hello@canlah.ai →
        </a>
      </div>

    </div>
  </section>
</template>
