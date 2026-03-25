<template>
  <footer role="contentinfo" aria-label="Site footer" class="py-16 pb-24 md:pb-16 px-6 border-t border-white/5 mt-8">
    <div class="max-w-[1400px] mx-auto">
      <div v-reveal class="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        <!-- Brand -->
        <div class="md:col-span-2">
          <div class="flex items-center gap-3 mb-4">
            <img src="/logo-mascot.png" alt="CANLAH AI" class="w-11 h-11 object-contain" />
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
            <li><a href="https://canart-landing.vercel.app/en" target="_blank" class="text-[13px] text-[#5a6a88] hover:text-[#ff6ba6] transition-colors">CanArt ↗</a></li>
            <li><a href="https://hatchery-bot.vercel.app" target="_blank" class="text-[13px] text-[#5a6a88] hover:text-[#00e5a0] transition-colors">CanSell ↗</a></li>
            <li><span class="text-[13px] text-[#3a4a62]">CanService</span></li>
            <li><span class="text-[13px] text-[#3a4a62]">CanCommerce</span></li>
          </ul>
        </div>

        <!-- Company -->
        <div>
          <div class="text-[11px] font-mono text-[#4a5a7a] tracking-[2px] mb-4">{{ $t('footer.company') }}</div>
          <ul class="space-y-2.5">
            <li><a href="https://canmarket.ai" target="_blank" class="text-[13px] text-[#5a6a88] hover:text-[#00d4ff] transition-colors">{{ $t('footer.aboutLink') }}</a></li>
            <li><a href="mailto:hello@canlah.ai" class="text-[13px] text-[#5a6a88] hover:text-[#00d4ff] transition-colors">{{ $t('footer.contactLink') }}</a></li>
            <li><NuxtLink to="/privacy" class="text-[13px] text-[#5a6a88] hover:text-[#00d4ff] transition-colors">Privacy Policy</NuxtLink></li>
            <li><NuxtLink to="/terms" class="text-[13px] text-[#5a6a88] hover:text-[#00d4ff] transition-colors">Terms of Service</NuxtLink></li>
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
