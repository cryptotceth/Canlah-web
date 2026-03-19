<template>
  <div class="space-y-8">

    <p class="text-[15px] text-[#8aa0c4] leading-[1.8]">
      Every brand has a fingerprint. Not the logo or the hex codes in a style guide — something deeper. The way light falls in your product photography. The ratio of whitespace to content. Whether your headlines are punchy or poetic. The subtle warmth in your color grading that makes customers feel <em class="text-white font-medium">something</em> without knowing why.
    </p>

    <p class="text-[15px] text-[#8aa0c4] leading-[1.8]">
      Style Genome™ is CANLAH AI's technology for capturing that fingerprint — not as a PDF that developers skim, but as a 768-dimensional mathematical vector that actively shapes every piece of content the system generates.
    </p>

    <p class="text-[15px] text-[#8aa0c4] leading-[1.8]">
      This article explains how it works — technically, but accessibly. No PhD required.
    </p>

    <h2 class="font-display font-bold text-[22px] text-white mt-12 mb-4">Why 768 Dimensions?</h2>

    <p class="text-[15px] text-[#8aa0c4] leading-[1.8]">
      Humans describe brands in maybe 10-20 adjectives: "clean," "bold," "warm," "minimal." But the actual visual and tonal properties that create these impressions are far more nuanced. The difference between "premium minimal" and "cheap minimal" isn't one thing — it's hundreds of subtle signals interacting.
    </p>

    <p class="text-[15px] text-[#8aa0c4] leading-[1.8]">
      768 dimensions is the sweet spot we found through extensive testing. It's enough to capture the full complexity of a brand's creative identity without overfitting to noise. Each dimension represents a learned feature — not a human-labeled attribute, but a statistically meaningful axis of variation discovered by the model itself.
    </p>

    <!-- Technical diagram -->
    <div class="rounded-2xl border border-[#6496ff]/20 bg-[#6496ff]/[0.04] p-6">
      <h3 class="font-mono text-[11px] text-[#6496ff] tracking-[2px] mb-4">STYLE GENOME™ ARCHITECTURE</h3>
      <div class="font-mono text-[12px] text-[#7090b8] space-y-1 leading-relaxed">
        <p><span class="text-[#6496ff]">INPUT</span> → Brand assets (logos, images, content, style guides)</p>
        <p class="pl-4">↓ <span class="text-[#4a6a90]">Multi-modal encoder</span></p>
        <p><span class="text-[#6496ff]">ENCODE</span> → 768-dim brand vector (Style Genome™)</p>
        <p class="pl-4">↓ <span class="text-[#4a6a90]">Stored in isolated vector DB</span></p>
        <p><span class="text-[#6496ff]">GENERATE</span> → AI creates content candidate</p>
        <p class="pl-4">↓ <span class="text-[#4a6a90]">Cosine similarity check</span></p>
        <p><span class="text-[#6496ff]">VERIFY</span> → Score against brand vector (threshold: 0.85)</p>
        <p class="pl-4">↓ <span class="text-[#4a6a90]">Pass → deliver | Fail → regenerate with constraints</span></p>
        <p><span class="text-[#00e5a0]">OUTPUT</span> → On-brand content delivered to user</p>
      </div>
    </div>

    <h2 class="font-display font-bold text-[22px] text-white mt-12 mb-4">The Encoding Process</h2>

    <p class="text-[15px] text-[#8aa0c4] leading-[1.8]">
      When you onboard with CanMarket, you upload your brand assets — logos, campaign images, social content, product photography, packaging shots, whatever defines your visual identity. You can also provide text samples (ad copy, taglines, product descriptions) to capture your verbal brand.
    </p>

    <p class="text-[15px] text-[#8aa0c4] leading-[1.8]">
      Our multi-modal encoder processes these assets through several specialized models:
    </p>

    <div class="space-y-3">
      <div class="flex items-start gap-3 p-4 rounded-xl border border-white/6 bg-white/[0.015]">
        <span class="text-[#00d4ff] font-mono text-[11px] mt-1 flex-shrink-0 w-20">VISUAL</span>
        <p class="text-[13px] text-[#7090b8]">Color distribution, saturation patterns, contrast ratios, composition geometry, lighting direction, depth-of-field preference, texture frequency</p>
      </div>
      <div class="flex items-start gap-3 p-4 rounded-xl border border-white/6 bg-white/[0.015]">
        <span class="text-[#00e5a0] font-mono text-[11px] mt-1 flex-shrink-0 w-20">TONAL</span>
        <p class="text-[13px] text-[#7090b8]">Sentence structure patterns, vocabulary complexity, formality spectrum, emotional valence, humor markers, cultural register</p>
      </div>
      <div class="flex items-start gap-3 p-4 rounded-xl border border-white/6 bg-white/[0.015]">
        <span class="text-[#6496ff] font-mono text-[11px] mt-1 flex-shrink-0 w-20">LAYOUT</span>
        <p class="text-[13px] text-[#7090b8]">Whitespace ratios, text-to-image balance, grid preferences, margin consistency, element hierarchy patterns</p>
      </div>
      <div class="flex items-start gap-3 p-4 rounded-xl border border-white/6 bg-white/[0.015]">
        <span class="text-[#f5a623] font-mono text-[11px] mt-1 flex-shrink-0 w-20">SEMANTIC</span>
        <p class="text-[13px] text-[#7090b8]">Brand personality axes, value associations, category positioning signals, audience alignment markers</p>
      </div>
    </div>

    <p class="text-[15px] text-[#8aa0c4] leading-[1.8]">
      These modality-specific vectors are fused into a single 768-dimensional representation through a learned projection layer. The fusion isn't simple concatenation — it captures <em class="text-white">cross-modal interactions</em>, like how your brand's color warmth relates to your copy's emotional tone.
    </p>

    <h2 class="font-display font-bold text-[22px] text-white mt-12 mb-4">The Verification Loop</h2>

    <p class="text-[15px] text-[#8aa0c4] leading-[1.8]">
      Once your Style Genome™ is encoded, it acts as a persistent constraint on all content generation. Here's how:
    </p>

    <p class="text-[15px] text-[#8aa0c4] leading-[1.8]">
      When CanMarket generates a piece of content (an image, a social post, a campaign layout), that output is also encoded into a 768-dimensional vector using the same encoder. We then compute the <strong class="text-white">cosine similarity</strong> between the generated content's vector and your Style Genome™.
    </p>

    <!-- Pull quote -->
    <div class="border-l-2 border-[#6496ff] pl-6 py-2">
      <p class="text-[17px] text-white font-display italic leading-relaxed">
        "Cosine similarity in 768 dimensions captures nuances that no human style guide reviewer could articulate — let alone enforce consistently at scale."
      </p>
    </div>

    <p class="text-[15px] text-[#8aa0c4] leading-[1.8]">
      If the similarity score exceeds our threshold (default: 0.85, configurable per workspace), the content passes. If it falls below, the system doesn't just reject — it feeds the deviation signal back into the generation process as additional constraints. The second attempt is typically much closer. By the third attempt, we achieve a 97% pass rate.
    </p>

    <h2 class="font-display font-bold text-[22px] text-white mt-12 mb-4">Why This Beats Style Guides</h2>

    <p class="text-[15px] text-[#8aa0c4] leading-[1.8]">
      Traditional style guides are <em class="text-white">descriptive</em> — they tell you what the brand should look like. Style Genome™ is <em class="text-white">generative</em> — it actively shapes what the brand looks like in every output. The difference is enforcement:
    </p>

    <div class="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden">
      <div class="grid grid-cols-3 text-[12px] font-mono">
        <div class="p-3 border-b border-r border-white/8 text-[#4a6a90]"></div>
        <div class="p-3 border-b border-r border-white/8 text-[#4a6a90] text-center">Style Guide PDF</div>
        <div class="p-3 border-b border-white/8 text-[#6496ff] text-center">Style Genome™</div>

        <div class="p-3 border-b border-r border-white/8 text-[#7090b8]">Format</div>
        <div class="p-3 border-b border-r border-white/8 text-[#7090b8] text-center">Static document</div>
        <div class="p-3 border-b border-white/8 text-white text-center">768-dim vector</div>

        <div class="p-3 border-b border-r border-white/8 text-[#7090b8]">Enforcement</div>
        <div class="p-3 border-b border-r border-white/8 text-[#7090b8] text-center">Manual review</div>
        <div class="p-3 border-b border-white/8 text-[#00e5a0] text-center">Automatic</div>

        <div class="p-3 border-b border-r border-white/8 text-[#7090b8]">Coverage</div>
        <div class="p-3 border-b border-r border-white/8 text-[#7090b8] text-center">10-20 rules</div>
        <div class="p-3 border-b border-white/8 text-[#00e5a0] text-center">768 features</div>

        <div class="p-3 border-b border-r border-white/8 text-[#7090b8]">Adapts over time</div>
        <div class="p-3 border-b border-r border-white/8 text-[#7090b8] text-center">Only if updated</div>
        <div class="p-3 border-b border-white/8 text-[#00e5a0] text-center">Continuously</div>

        <div class="p-3 border-r border-white/8 text-[#7090b8]">Cross-modal</div>
        <div class="p-3 border-r border-white/8 text-[#7090b8] text-center">No</div>
        <div class="p-3 text-[#00e5a0] text-center">Yes</div>
      </div>
    </div>

    <h2 class="font-display font-bold text-[22px] text-white mt-12 mb-4">Isolation and Security</h2>

    <p class="text-[15px] text-[#8aa0c4] leading-[1.8]">
      Every Style Genome™ vector is stored in an isolated vector database partition. Your brand memory is never mixed with, influenced by, or accessible to other customers. Enterprise customers can choose their data residency region (US, EU, APAC). The vectors themselves are encrypted at rest with AES-256 and in transit with TLS 1.3.
    </p>

    <p class="text-[15px] text-[#8aa0c4] leading-[1.8]">
      Critically, your Style Genome™ is <em class="text-white">never used to train our base models</em>. It exists solely as a constraint layer — shaping outputs, not inputs. If you delete your account, your Style Genome™ is permanently purged within 30 days.
    </p>

    <!-- Key Takeaways -->
    <div class="rounded-2xl border border-[#6496ff]/20 bg-[#6496ff]/[0.04] p-6 mt-12">
      <h3 class="font-display font-bold text-[15px] text-[#6496ff] mb-4 flex items-center gap-2">
        <span>🧬</span> Key Takeaways
      </h3>
      <ul class="space-y-2.5 text-[14px] text-[#8aa0c4]">
        <li class="flex items-start gap-2.5"><span class="text-[#6496ff] mt-0.5 flex-shrink-0">→</span> Style Genome™ encodes brand identity into a 768-dimensional vector — covering visual, tonal, layout, and semantic features</li>
        <li class="flex items-start gap-2.5"><span class="text-[#6496ff] mt-0.5 flex-shrink-0">→</span> Every generated output is scored via cosine similarity against your brand vector (0.85 threshold)</li>
        <li class="flex items-start gap-2.5"><span class="text-[#6496ff] mt-0.5 flex-shrink-0">→</span> Failed outputs get regenerated with deviation-informed constraints — 97% pass by attempt 3</li>
        <li class="flex items-start gap-2.5"><span class="text-[#6496ff] mt-0.5 flex-shrink-0">→</span> Unlike style guides, Style Genome™ enforces automatically and captures cross-modal interactions</li>
        <li class="flex items-start gap-2.5"><span class="text-[#6496ff] mt-0.5 flex-shrink-0">→</span> Each customer's vector is fully isolated — never shared, never used for training, deletable on request</li>
      </ul>
    </div>

    <!-- CTA -->
    <div class="text-center pt-8">
      <p class="text-[14px] text-[#5a7099] mb-4">See Style Genome™ in action on your own brand.</p>
      <a href="https://app.canmarket.ai" target="_blank"
        class="inline-flex items-center gap-2 px-7 py-3 rounded-full font-semibold text-sm bg-gradient-to-r from-[#0d47e0] to-[#00d4ff] text-white hover:shadow-[0_0_30px_rgba(0,212,255,0.4)] transition-all hover:scale-[1.03]">
        Try CanMarket Free <span>→</span>
      </a>
    </div>

  </div>
</template>
