<script setup lang="ts">
import { blogPosts } from '~/data/blog'

useSeoMeta({
  title: 'Blog — CANLAH AI',
  description: 'Insights on AI marketing, brand memory, content automation, and the future of multi-agent marketing systems.',
})
</script>

<template>
  <div>
    <SiteHeader />

    <section class="pt-32 pb-20 px-6">
      <div class="max-w-[1100px] mx-auto">

        <!-- Header -->
        <div v-reveal class="text-center mb-16">
          <div class="font-mono text-[10px] text-[#00d4ff] tracking-[4px] mb-3">INSIGHTS</div>
          <h1 class="font-display font-extrabold text-4xl md:text-5xl text-white leading-tight mb-4">
            The CANLAH AI Blog
          </h1>
          <p class="text-[15px] text-[#5a7099] max-w-xl mx-auto">
            Perspectives on brand memory, AI marketing, and the future of how brands create content at scale.
          </p>
        </div>

        <!-- Post grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <NuxtLink
            v-for="(post, i) in blogPosts"
            :key="post.slug"
            :to="`/blog/${post.slug}`"
            v-reveal="{ delay: i * 80 }"
            class="group rounded-2xl border border-white/8 bg-white/[0.025] p-6 flex flex-col hover:border-[#00d4ff]/25 hover:bg-white/[0.04] transition-all duration-300 cursor-pointer"
          >
            <!-- Category + date -->
            <div class="flex items-center justify-between mb-4">
              <span
                class="text-[10px] font-mono px-2.5 py-1 rounded-full border"
                :style="{ color: post.categoryColor, borderColor: post.categoryColor + '30', backgroundColor: post.categoryColor + '10' }"
              >
                {{ post.category }}
              </span>
              <span class="text-[11px] font-mono text-[#4a5a7a]">{{ post.readTime }}</span>
            </div>

            <!-- Title -->
            <h2 class="font-display font-bold text-[17px] text-white mb-3 leading-snug group-hover:text-[#00d4ff] transition-colors">
              {{ post.title }}
            </h2>

            <!-- Description -->
            <p class="text-[13px] text-[#6080a0] leading-relaxed flex-1 mb-4">
              {{ post.description }}
            </p>

            <!-- Read more + date -->
            <div class="flex items-center justify-between mt-auto">
              <span class="text-[12px] font-semibold text-[#00d4ff] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                Read more <span>→</span>
              </span>
              <span class="text-[11px] text-[#3d5080] font-mono">{{ post.date }}</span>
            </div>
          </NuxtLink>
        </div>

      </div>
    </section>

    <SiteFooter />
  </div>
</template>
