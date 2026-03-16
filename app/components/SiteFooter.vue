<template>
  <footer class="py-10 px-6 border-t border-white/5">
    <div class="max-w-[1400px] mx-auto text-center">
      <div class="font-mono text-[11px] text-[#6b82b5] tracking-[2px] mb-3">
        {{ $t('footer.tagline') }}
      </div>
      <div class="flex justify-center gap-6 mb-4">
        <div class="flex items-center gap-2 text-[11px] font-mono text-[#6b82b5]">
          <span class="w-1.5 h-1.5 rounded-full bg-[#00e5a0] shadow-[0_0_8px_#00e5a0] animate-pulse"></span>
          Platform Active
        </div>
        <a href="https://canmarket.ai" target="_blank" class="flex items-center gap-2 text-[11px] font-mono text-[#6b82b5] hover:text-[#00d4ff] transition-colors">
          <span class="w-1.5 h-1.5 rounded-full bg-[#0d47e0] shadow-[0_0_8px_#0d47e0]"></span>
          CanMarket.ai
        </a>
      </div>
      <div class="font-mono text-[10px] text-[#6b82b5]/50">
        {{ $t('footer.rights') }}
      </div>
    </div>
  </footer>
</template>
