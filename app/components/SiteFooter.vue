<script setup lang="ts">
const email = ref('')
const subscribed = ref(false)
function subscribe() {
  if (!email.value || !email.value.includes('@')) return
  // local stash; replace with real endpoint later
  const list = JSON.parse(localStorage.getItem('canlah_newsletter') || '[]')
  list.push({ email: email.value, at: new Date().toISOString() })
  localStorage.setItem('canlah_newsletter', JSON.stringify(list))
  subscribed.value = true
}
</script>

<template>
  <footer role="contentinfo" aria-label="Site footer" class="relative pt-20 pb-32 px-6 sm:px-8 lg:px-14 border-t border-[#efefe5]/10 mt-16 bg-[#0B0A10]/60 backdrop-blur-md">
    <div class="wide">

      <!-- Top: logo + subscribe form -->
      <div v-reveal class="grid grid-cols-1 lg:grid-cols-[80px_1fr] gap-10 lg:gap-16 pb-12 mb-12 border-b border-[#efefe5]/8">
        <a href="/" class="flex items-start">
          <span class="relative w-12 h-12 rounded-[2px] border-rainbow overflow-hidden flex items-center justify-center bg-[#0a090f]">
            <img src="/logo-mascot.png" alt="CANLAH AI" class="w-9 h-9 object-contain" />
          </span>
        </a>

        <div class="flex flex-col md:flex-row md:items-end gap-6 md:gap-10">
          <div class="md:flex-1">
            <p class="font-display text-[20px] sm:text-[22px] text-[#efefe5] leading-[1.3] mb-1">Subscribe to be in touch<sup class="text-[#BDD1F6]">*</sup></p>
            <p class="cockpit-label !text-[11px] !text-[#efefe5]/55 !normal-case !tracking-[1px]">*Only valuable resources.</p>
          </div>
          <form v-if="!subscribed" class="flex items-stretch border border-[#efefe5]/15 bg-[#0a090f] rounded-[2px] overflow-hidden md:w-[420px]"
            @submit.prevent="subscribe">
            <input
              v-model="email"
              type="email"
              required
              placeholder="Your e-mail"
              class="flex-1 min-w-0 px-4 py-3 bg-transparent text-[13px] text-[#efefe5] placeholder-[#efefe5]/35 outline-none"
            />
            <button type="submit" class="cockpit-label !text-[11px] !text-[#efefe5] px-5 sm:px-7 bg-[#efefe5]/5 hover:bg-[#efefe5]/10 transition-colors border-l border-[#efefe5]/15">
              Subscribe
            </button>
          </form>
          <div v-else class="cockpit-label !text-[12px] !text-[#BDD1F6]">✓ Thank you — see you in your inbox.</div>
        </div>
      </div>

      <!-- Middle: 4-column nav -->
      <div v-reveal class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-10 mb-16">
        <!-- AI Solutions -->
        <div>
          <p class="cockpit-label !text-[11px] !text-[#efefe5] mb-4 sm:mb-5">AI&nbsp;Solutions</p>
          <ul class="space-y-3">
            <li><a href="https://app.canmarket.ai" target="_blank" class="text-[13px] text-[#efefe5]/65 hover:text-[#efefe5] transition-colors">CanMarket</a></li>
            <li><a href="https://canart-landing.vercel.app/en" target="_blank" class="text-[13px] text-[#efefe5]/65 hover:text-[#efefe5] transition-colors">CanArt</a></li>
            <li><a href="https://hatchery-bot.vercel.app" target="_blank" class="text-[13px] text-[#efefe5]/65 hover:text-[#efefe5] transition-colors">CanSell</a></li>
            <li><span class="text-[13px] text-[#efefe5]/35">CanService — soon</span></li>
            <li><span class="text-[13px] text-[#efefe5]/35">CanCommerce — soon</span></li>
          </ul>
        </div>

        <!-- Resources -->
        <div>
          <p class="cockpit-label !text-[11px] !text-[#efefe5] mb-4 sm:mb-5">Resources</p>
          <ul class="space-y-3">
            <li><a href="#products" class="text-[13px] text-[#efefe5]/65 hover:text-[#efefe5] transition-colors">Products</a></li>
            <li><a href="#pricing" class="text-[13px] text-[#efefe5]/65 hover:text-[#efefe5] transition-colors">Pricing</a></li>
            <li><a href="#platform" class="text-[13px] text-[#efefe5]/65 hover:text-[#efefe5] transition-colors">Platform</a></li>
            <li><a href="#faq" class="text-[13px] text-[#efefe5]/65 hover:text-[#efefe5] transition-colors">FAQ</a></li>
            <li><NuxtLink to="/blog" class="text-[13px] text-[#efefe5]/65 hover:text-[#efefe5] transition-colors">Blog</NuxtLink></li>
          </ul>
        </div>

        <!-- Company -->
        <div>
          <p class="cockpit-label !text-[11px] !text-[#efefe5] mb-4 sm:mb-5">Company</p>
          <ul class="space-y-3">
            <li><a href="https://canmarket.ai" target="_blank" class="text-[13px] text-[#efefe5]/65 hover:text-[#efefe5] transition-colors">{{ $t('footer.aboutLink') }}</a></li>
            <li><a href="mailto:hello@canlah.ai" class="text-[13px] text-[#efefe5]/65 hover:text-[#efefe5] transition-colors">{{ $t('footer.contactLink') }}</a></li>
            <li><NuxtLink to="/privacy" class="text-[13px] text-[#efefe5]/65 hover:text-[#efefe5] transition-colors">Privacy Policy</NuxtLink></li>
            <li><NuxtLink to="/terms" class="text-[13px] text-[#efefe5]/65 hover:text-[#efefe5] transition-colors">Terms of Service</NuxtLink></li>
          </ul>
        </div>

        <!-- Status / Awards -->
        <div>
          <p class="cockpit-label !text-[11px] !text-[#efefe5] mb-4 sm:mb-5">Status</p>
          <div class="flex items-center gap-2 mb-4">
            <span class="w-2 h-2 rounded-[2px] bg-[#BDD1F6] shadow-[0_0_8px_#BDD1F6] animate-pulse"></span>
            <span class="cockpit-label !text-[11px] !text-[#efefe5]/65">{{ $t('footer.status') }}</span>
          </div>
          <p class="text-[13px] text-[#efefe5]/65 leading-[1.5]">MWC&nbsp;Pitch2Pitch&nbsp;2025 · Global Runner-up</p>
        </div>
      </div>

      <!-- Bottom bar -->
      <div v-reveal class="pt-8 border-t border-[#efefe5]/8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <p class="cockpit-label !text-[11px] !text-[#efefe5]/55">{{ $t('footer.rights') }}</p>
        <p class="cockpit-label !text-[11px] !text-[#efefe5]/55">CANLAH&nbsp;AI · Built with brand memory</p>
      </div>
    </div>
  </footer>
</template>
