<script setup lang="ts">
const { data: articles, pending } = await useAsyncData('posts-list', () =>
  queryCollection('posts').all())

const sortedArticles = computed(() =>
  [...(articles.value ?? [])].sort((a, b) => b.date.localeCompare(a.date)),
)

const featuredArticles = computed(() =>
  sortedArticles.value.filter(article => article.featured),
)

const otherArticles = computed(() =>
  sortedArticles.value.filter(article => !article.featured),
)

useSeoMeta({
  title: 'Nerd Nook',
  description: 'Nerd Nook 文章列表',
})
</script>

<template>
  <div class="page">
    <main class="container-wide">
      <header class="mb-12 md:mb-16">
        <h1 class="title-lg">
          Posts
        </h1>
        <p class="mt-4 text-sm text-jp-muted leading-relaxed tracking-wide">
          簡單記錄程式、生活與閱讀。
        </p>
      </header>

      <div v-if="pending" class="meta">
        Loading articles...
      </div>

      <template v-else>
        <section v-if="featuredArticles.length" class="mb-20">
          <h2 class="mb-8 border-b border-jp-border pb-3 meta">
            Featured
          </h2>
          <div class="space-y-0">
            <NuxtLink
              v-for="article in featuredArticles"
              :key="article.path"
              :to="article.path"
              class="group card"
            >
              <p class="mb-3 meta">
                {{ article.date }}
                <span v-if="article.tag"> · {{ article.tag }}</span>
              </p>
              <h3 class="transition-colors duration-200 title-md group-hover:text-jp-muted">
                {{ article.title }}
              </h3>
              <p v-if="article.description" class="mt-3 text-sm text-jp-muted leading-7">
                {{ article.description }}
              </p>
            </NuxtLink>
          </div>
        </section>

        <section>
          <h2 class="mb-8 border-b border-jp-border pb-3 meta">
            All Posts
          </h2>
          <div class="space-y-0">
            <NuxtLink
              v-for="article in otherArticles"
              :key="article.path"
              :to="article.path"
              class="group flex items-baseline justify-between gap-6 card"
            >
              <h3 class="text-base leading-relaxed transition-colors duration-200 group-hover:text-jp-muted">
                {{ article.title }}
              </h3>
              <span class="shrink-0 meta">
                {{ article.date }}
              </span>
            </NuxtLink>
          </div>
        </section>
      </template>
    </main>
  </div>
</template>
