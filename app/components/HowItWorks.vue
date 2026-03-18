<script setup lang="ts">
const { tm } = useI18n()
const steps = computed(() => tm('how.steps') as { num: string; title: string; desc: string; detail: string }[])
</script>

<template>
  <section class="py-20 px-6">
    <div class="max-w-[1400px] mx-auto">

      <!-- Section header -->
      <div v-reveal class="text-center mb-16">
        <div class="font-mono text-[10px] text-[#00d4ff] tracking-[4px] mb-3">{{ $t('how.sectionTag') }}</div>
        <h2 class="font-display font-extrabold text-4xl md:text-5xl text-white leading-tight">
          <span v-html="$t('how.title', { highlight: `<span class='bg-gradient-to-r from-[#00d4ff] to-[#3b7fff] bg-clip-text text-transparent'>${$t('how.highlight')}</span>` })"></span>
        </h2>
        <p class="mt-4 text-[15px] text-[#5a7099]">{{ $t('how.subtitle') }}</p>
      </div>

      <!-- Steps -->
      <div class="relative">
        <!-- Connecting line (desktop) -->
        <div class="hidden lg:block absolute top-[52px] left-[calc(16.67%+2px)] right-[calc(16.67%+2px)] h-px bg-gradient-to-r from-[#00d4ff]/20 via-[#3b7fff]/40 to-[#00d4ff]/20 z-0"></div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-[1]">
          <div
            v-for="(step, i) in steps"
            :key="i"
            v-reveal="{ delay: i * 150 }"
            class="group flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            <!-- Step number circle -->
            <div
              class="w-[52px] h-[52px] rounded-full flex items-center justify-center font-mono font-bold text-sm mb-6 flex-shrink-0 border transition-all duration-300 group-hover:scale-110"
              :class="[
                i === 0
                  ? 'bg-[#00d4ff]/15 border-[#00d4ff]/50 text-[#00d4ff] shadow-[0_0_20px_rgba(0,212,255,0.25)]'
                  : i === 1
                    ? 'bg-[#3b7fff]/15 border-[#3b7fff]/50 text-[#7ab0ff] shadow-[0_0_20px_rgba(59,127,255,0.2)]'
                    : 'bg-[#00e5a0]/10 border-[#00e5a0]/35 text-[#00e5a0] shadow-[0_0_20px_rgba(0,229,160,0.15)]'
              ]"
            >
              {{ step.num }}
            </div>

            <!-- Content -->
            <div class="flex-1">
              <h3 class="font-display font-bold text-[19px] text-white mb-3">{{ step.title }}</h3>
              <p class="text-[14px] text-[#6080a8] leading-relaxed mb-4">{{ step.desc }}</p>
              <div
                class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-[11px] font-mono"
                :class="[
                  i === 0 ? 'text-[#00d4ff] bg-[#00d4ff]/5 border border-[#00d4ff]/15' :
                  i === 1 ? 'text-[#7ab0ff] bg-[#3b7fff]/5 border border-[#3b7fff]/15' :
                  'text-[#00e5a0] bg-[#00e5a0]/5 border border-[#00e5a0]/15'
                ]"
              >
                <span class="w-1 h-1 rounded-full flex-shrink-0"
                  :class="[i === 0 ? 'bg-[#00d4ff]' : i === 1 ? 'bg-[#7ab0ff]' : 'bg-[#00e5a0]']"></span>
                {{ step.detail }}
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>
