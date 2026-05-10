<script setup lang="ts">
import { blogPosts } from '~/data/blog'

const route = useRoute()
const slug = route.params.slug as string

const post = computed(() => blogPosts.find(p => p.slug === slug))

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Article not found' })
}

useSeoMeta({
  title: `${post.value.title} — CANLAH AI Blog`,
  description: post.value.description,
  ogType: 'article',
  ogTitle: `${post.value.title} — CANLAH AI Blog`,
  ogDescription: post.value.description,
  ogUrl: `https://canlah.ai/blog/${slug}`,
})

// Article + BreadcrumbList schema for SEO rich snippets + GEO
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.value.title,
        description: post.value.description,
        datePublished: post.value.date,
        author: { '@type': 'Organization', name: 'CANLAH AI', url: 'https://canlah.ai' },
        publisher: { '@type': 'Organization', name: 'CANLAH AI', logo: { '@type': 'ImageObject', url: 'https://canlah.ai/favicon.svg' } },
        mainEntityOfPage: { '@type': 'WebPage', '@id': `https://canlah.ai/blog/${slug}` },
      }),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://canlah.ai' },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://canlah.ai/blog' },
          { '@type': 'ListItem', position: 3, name: post.value.title, item: `https://canlah.ai/blog/${slug}` },
        ],
      }),
    },
  ],
})
</script>

<template>
  <div>
    <SiteHeader />

    <article v-if="post" class="pt-32 pb-20 px-6">
      <div class="max-w-[760px] mx-auto">

        <!-- Article header -->
        <div v-reveal class="mb-12">
          <div class="flex items-center gap-3 mb-5">
            <span
              class="text-[10px] font-mono px-2.5 py-1 rounded-[2px] border"
              :style="{ color: post.categoryColor, borderColor: post.categoryColor + '30', backgroundColor: post.categoryColor + '10' }"
            >
              {{ post.category }}
            </span>
            <span class="text-[11px] font-mono text-[#BABABA]">{{ post.date }}</span>
            <span class="text-[11px] font-mono text-[#BABABA]">·</span>
            <span class="text-[11px] font-mono text-[#BABABA]">{{ post.readTime }}</span>
          </div>

          <h1 class="font-display font-bold text-3xl md:text-[42px] text-[#efefe5] leading-[1.15] mb-5">
            {{ post.title }}
          </h1>

          <p class="text-[16px] text-[#BABABA] leading-[1.5]">
            {{ post.description }}
          </p>

          <div class="mt-6 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        </div>

        <!-- Article body slot — content is in individual article components -->
        <div v-reveal="{ delay: 100 }" class="article-body">
          <component :is="articleComponent" v-if="articleComponent" />
          <div v-else class="rounded-[2px] border border-white/8 bg-white/[0.025] p-8 text-center">
            <p class="text-[15px] text-[#BABABA]">This article is coming soon. Check back shortly.</p>
          </div>
        </div>

        <!-- Bottom nav -->
        <div class="mt-16 flex items-center justify-between">
          <NuxtLink to="/blog" class="text-[13px] text-[#BABABA] hover:text-[#BDD1F6] transition-colors">← All articles</NuxtLink>
          <a href="https://app.canmarket.ai" target="_blank"
            class="text-[13px] font-bold text-[#BDD1F6] hover:underline">Try CanMarket Free →</a>
        </div>

      </div>
    </article>

    <SiteFooter />
  </div>
</template>

<script lang="ts">
import { defineAsyncComponent } from 'vue'

export default {
  computed: {
    articleComponent() {
      const slug = this.$route.params.slug as string
      try {
        return defineAsyncComponent(() =>
          import(`~/components/blog/${slug}.vue`)
        )
      } catch {
        return null
      }
    }
  }
}
</script>
