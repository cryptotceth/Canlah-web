<template>
  <footer class="py-16 pb-24 md:pb-16 px-6 border-t border-white/5 mt-8">
    <div class="max-w-[1400px] mx-auto">
      <div v-reveal class="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        <!-- Brand -->
        <div class="md:col-span-2">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-9 h-9 rounded-lg bg-gradient-to-br from-[#0d47e0] to-[#00d4ff] flex items-center justify-center text-base shadow-[0_0_20px_rgba(0,212,255,0.3)]">⬡</div>
            <span class="font-display font-bold text-xl tracking-wide text-white">CANLAH AI</span>
          </div>
          <p class="text-[13px] text-[#4a5a7a] leading-relaxed max-w-xs mb-5">
            {{ $t('footer.tagline') }}
          </p>
          <div class="flex items-center gap-3">
            <span class="w-2 h-2 rounded-full bg-[#00e5a0] shadow-[0_0_8px_#00e5a0] animate-pulse"></span>
            <span class="text-[11px] font-mono text-[#4a5a7a]">{{ $t('footer.status') }}</span>
          </div>
        </div>

        <!-- Products -->
        <div>
          <div class="text-[11px] font-mono text-[#4a5a7a] tracking-[2px] mb-4">{{ $t('footer.products') }}</div>
          <ul class="space-y-2.5">
            <li><a href="https://app.canmarket.ai" target="_blank" class="text-[13px] text-[#5a6a88] hover:text-[#00d4ff] transition-colors">CanMarket ↗</a></li>
            <li><span class="text-[13px] text-[#3a4a62]">CanService</span></li>
            <li><span class="text-[13px] text-[#3a4a62]">CanSales</span></li>
            <li><span class="text-[13px] text-[#3a4a62]">CanCommerce</span></li>
          </ul>
        </div>

        <!-- Company -->
        <div>
          <div class="text-[11px] font-mono text-[#4a5a7a] tracking-[2px] mb-4">{{ $t('footer.company') }}</div>
          <ul class="space-y-2.5">
            <li><a href="https://canmarket.ai" target="_blank" class="text-[13px] text-[#5a6a88] hover:text-[#00d4ff] transition-colors">{{ $t('footer.aboutLink') }}</a></li>
            <li><a href="mailto:hello@canlah.ai" class="text-[13px] text-[#5a6a88] hover:text-[#00d4ff] transition-colors">{{ $t('footer.contactLink') }}</a></li>
          </ul>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
        <div class="font-mono text-[11px] text-[#3a4a62]">{{ $t('footer.rights') }}</div>
        <div class="font-mono text-[11px] text-[#3a4a62]">MWC Pitch2Pitch 2025 · Global Runner-up</div>
      </div>
    </div>
  </footer>
</template>
