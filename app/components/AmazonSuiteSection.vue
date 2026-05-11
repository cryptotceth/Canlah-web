<script setup lang="ts">
const cards = useTmList<{ name: string, icon: string, description: string }[]>('amazonSuite.cards')
</script>

<template>
  <section id="amazon-suite" class="section px-2 sm:px-6 lg:px-10 xl:px-14">
    <div class="w-full">
      <!-- Section header -->
      <div v-reveal class="text-center mb-16">
        <div class="font-mono text-[10px] text-[#BDD1F6] tracking-[4px] mb-3">{{ $t('amazonSuite.sectionTag') }}</div>
        <h2 class="font-display font-bold text-[16px] md:text-5xl text-[#efefe5] leading-[1.15]">
          <span v-html="$t('amazonSuite.title', { highlight: `<span class='bg-gradient-to-r from-[#BDD1F6] to-[#91B3F0] bg-clip-text text-transparent'>${$t('amazonSuite.highlight')}</span>` })"></span>
        </h2>
        <p class="mt-4 text-[15px] text-[#BABABA] max-w-xl mx-auto">{{ $t('amazonSuite.subtitle') }}</p>
      </div>

      <!-- Flex wrap + center: last row (2 cards) auto-centers -->
      <div class="flex flex-wrap justify-center gap-2 sm:gap-5 lg:gap-6 w-full mb-12">
        <div
          v-for="(card, i) in cards"
          :key="i"
          v-reveal="{ delay: i * 100 }"
          class="group relative w-full md:w-[calc(50%-10px)] lg:w-[calc(33.333%-16px)] rounded-[2px] border border-[#efefe5]/12 bg-[#0B0A10]/75 hover:bg-[#0B0A10]/90 hover:border-[#efefe5]/25 backdrop-blur-md p-2 sm:p-7 lg:p-9 flex flex-col min-h-[260px] transition-colors duration-300"
        >
          <!-- Icon -->
          <div
            class="w-[52px] h-[52px] rounded-[2px] flex items-center justify-center mb-6 flex-shrink-0 border bg-[#BDD1F6]/15 border-[#BDD1F6]/50 text-[#BDD1F6] shadow-[0_0_20px_rgba(189,209,246,0.25)] transition-all duration-300 group-hover:scale-110"
          >
            <!-- photo / camera -->
            <svg v-if="card.icon === 'photo'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            <!-- chat bubble -->
            <svg v-else-if="card.icon === 'chat'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
            </svg>
            <!-- shield -->
            <svg v-else-if="card.icon === 'shield'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
            </svg>
            <!-- video camera / film -->
            <svg v-else-if="card.icon === 'video'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
            </svg>
            <!-- bolt / lightning -->
            <svg v-else-if="card.icon === 'bolt'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
          </div>

          <!-- Content -->
          <div class="flex-1">
            <h3 class="font-display font-bold text-[19px] text-[#efefe5] mb-3">{{ card.name }}</h3>
            <p class="text-[14px] text-[#BABABA] leading-[1.5]">{{ card.description }}</p>
          </div>
        </div>
      </div>

      <!-- Global CTA -->
      <div v-reveal="{ delay: 400 }" class="text-center">
        <a
          :href="$t('amazonSuite.ctaUrl')"
          class="inline-flex items-center gap-2 px-6 py-3 rounded-[2px] border border-[#BDD1F6]/35 bg-[#BDD1F6]/5 text-[#BDD1F6] font-mono text-sm font-bold tracking-wider transition-all hover:bg-[#BDD1F6]/10 hover:border-[#BDD1F6]/60"
        >
          {{ $t('amazonSuite.cta') }}
          <span>→</span>
        </a>
      </div>
    </div>
  </section>
</template>
