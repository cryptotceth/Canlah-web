<script setup lang="ts">
import { blogPosts } from '~/data/blog'

useSeoMeta({
  title: 'Blog — CANLAH AI',
  description: 'Insights on AI marketing, brand memory, content automation, and the future of multi-agent marketing systems.',
  ogType: 'website',
  ogTitle: 'Blog — CANLAH AI',
  ogDescription: 'Insights on AI marketing, brand memory, content automation, and the future of multi-agent marketing systems.',
  ogUrl: 'https://canlah.ai/blog',
})
</script>

<template>
  <div>
    <SiteHeader />

    <section class="pt-32 pb-20 px-6">
      <div class="max-w-[1100px] mx-auto">

        <!-- Header -->
        <div v-reveal class="text-center mb-16">
          <div class="font-mono text-[10px] text-[#BDD1F6] tracking-[4px] mb-3">INSIGHTS</div>
          <h1 class="font-display font-bold text-4xl md:text-5xl text-[#efefe5] leading-[1.15] mb-4">
            The CANLAH AI Blog
          </h1>
          <p class="text-[15px] text-[#BABABA] max-w-xl mx-auto">
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
            class="group rounded-[2px] border border-[#efefe5]/12 bg-[#0B0A10]/85 backdrop-blur-md p-6 flex flex-col hover:border-[#BDD1F6]/30 hover:bg-[#0B0A10]/95 transition-colors duration-300 cursor-pointer"
          >
            <!-- Category + date -->
            <div class="flex items-center justify-between mb-4">
              <span
                class="text-[10px] font-mono px-2.5 py-1 rounded-[2px] border"
                :style="{ color: post.categoryColor, borderColor: post.categoryColor + '30', backgroundColor: post.categoryColor + '10' }"
              >
                {{ post.category }}
              </span>
              <span class="text-[11px] font-mono text-[#BABABA]">{{ post.readTime }}</span>
            </div>

            <!-- Title -->
            <h2 class="font-display font-bold text-[17px] text-[#efefe5] mb-3 leading-snug group-hover:text-[#BDD1F6] transition-colors">
              {{ post.title }}
            </h2>

            <!-- Description -->
            <p class="text-[13px] text-[#BABABA] leading-[1.5] flex-1 mb-4">
              {{ post.description }}
            </p>

            <!-- Read more + date -->
            <div class="flex items-center justify-between mt-auto">
              <span class="text-[12px] font-bold text-[#BDD1F6] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                Read more <span>→</span>
              </span>
              <span class="text-[11px] text-[#5C6470] font-mono">{{ post.date }}</span>
            </div>
          </NuxtLink>
        </div>

      </div>
    </section>

    <SiteFooter />
  </div>
</template>
