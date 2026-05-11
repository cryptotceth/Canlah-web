<script setup lang="ts">
const steps = useTmList<{ num: string; title: string; desc: string; detail: string }[]>('how.steps')
</script>

<template>
  <section class="section px-4 sm:px-6 lg:px-10 xl:px-14">
    <div class="w-full">

      <!-- Section header -->
      <div v-reveal class="text-center mb-16">
        <div class="font-mono text-[10px] text-[#BDD1F6] tracking-[4px] mb-3">{{ $t('how.sectionTag') }}</div>
        <h2 class="font-display font-bold text-[16px] md:text-5xl text-[#efefe5] leading-[1.15]">
          <span v-html="$t('how.title', { highlight: `<span class='bg-gradient-to-r from-[#BDD1F6] to-[#91B3F0] bg-clip-text text-transparent'>${$t('how.highlight')}</span>` })"></span>
        </h2>
        <p class="mt-4 text-[15px] text-[#BABABA]">{{ $t('how.subtitle') }}</p>
      </div>

      <!-- Horizontal 3-up grid — span same horizontal range as nav (logo ↔ TRY FREE) -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 w-full">
        <div
          v-for="(step, i) in steps"
          :key="i"
          v-reveal="{ delay: i * 100 }"
          class="group relative rounded-[2px] border border-[#efefe5]/12 bg-[#0B0A10]/75 hover:bg-[#0B0A10]/90 hover:border-[#efefe5]/25 backdrop-blur-md p-7 lg:p-9 flex flex-col min-h-[260px] transition-colors duration-300"
        >
            <!-- Step number circle -->
            <div
              class="w-[52px] h-[52px] rounded-[2px] flex items-center justify-center font-mono font-bold text-sm mb-6 flex-shrink-0 border transition-all duration-300 group-hover:scale-110"
              :class="[
                i === 0
                  ? 'bg-[#BDD1F6]/15 border-[#BDD1F6]/50 text-[#BDD1F6] shadow-[0_0_20px_rgba(189,209,246,0.25)]'
                  : i === 1
                    ? 'bg-[#91B3F0]/15 border-[#91B3F0]/50 text-[#BDD1F6] shadow-[0_0_20px_rgba(59,127,255,0.2)]'
                    : 'bg-[#BDD1F6]/10 border-[#BDD1F6]/35 text-[#BDD1F6] shadow-[0_0_20px_rgba(189,209,246,0.15)]'
              ]"
            >
              {{ step.num }}
            </div>

            <!-- Content -->
            <div class="flex-1">
              <h3 class="font-display font-bold text-[19px] text-[#efefe5] mb-3">{{ step.title }}</h3>
              <p class="text-[14px] text-[#BABABA] leading-[1.5] mb-4">{{ step.desc }}</p>
              <div
                class="inline-flex items-center gap-2 px-3 py-1.5 rounded-[2px] text-[11px] font-mono"
                :class="[
                  i === 0 ? 'text-[#BDD1F6] bg-[#BDD1F6]/5 border border-[#BDD1F6]/15' :
                  i === 1 ? 'text-[#BDD1F6] bg-[#91B3F0]/5 border border-[#91B3F0]/15' :
                  'text-[#BDD1F6] bg-[#BDD1F6]/5 border border-[#BDD1F6]/15'
                ]"
              >
                <span class="w-1 h-1 rounded-[2px] flex-shrink-0"
                  :class="[i === 0 ? 'bg-[#BDD1F6]' : i === 1 ? 'bg-[#BDD1F6]' : 'bg-[#BDD1F6]']"></span>
                {{ step.detail }}
              </div>
            </div>
        </div>
      </div>

    </div>
  </section>
</template>
