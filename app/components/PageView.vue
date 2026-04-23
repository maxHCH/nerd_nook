<script setup lang="ts">
const { data: articles } = await useAsyncData(() =>
  queryCollection('posts').all(),
)

const oneMonthAgo = computed(() => {
  const date = new Date()
  date.setMonth(date.getMonth() - 1)
  return date
})

const recentArticles = computed(() => {
  if (!articles.value)
    return []
  return articles.value
    .filter(post => new Date(post.date) >= oneMonthAgo.value)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
})

const heroArticle = computed(() => recentArticles.value[0] ?? null)
const restRecentArticles = computed(() => recentArticles.value.slice(1))

const otherArticles = computed(() => {
  if (!articles.value)
    return []
  const recentPaths = new Set(recentArticles.value.map(p => p.path))
  return articles.value
    .filter(post => !recentPaths.has(post.path))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
})
</script>

<template>
  <div class="page">
    <main class="container-wide">
      <!-- Hero: most recent article -->
      <NuxtLink
        v-if="heroArticle"
        :to="heroArticle.path"
        class="group mb-20 block"
      >
        <p class="mb-4 meta" style="color: var(--jp-accent)">
          最新
        </p>
        <div class="aspect-[21/9] w-full overflow-hidden bg-jp-border">
          <img
            v-if="heroArticle.cover"
            :src="heroArticle.cover"
            :alt="heroArticle.title"
            class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          >
        </div>
        <div class="mt-6 border-b border-jp-border pb-6">
          <p class="mb-3 meta">
            {{ formatDate(heroArticle.date) }}
            <span v-if="heroArticle.tag"> · {{ heroArticle.tag }}</span>
          </p>
          <h2 class="text-4xl md:text-6xl font-serif leading-tight tracking-tight transition-colors duration-200 group-hover:text-jp-muted">
            {{ heroArticle.title }}
          </h2>
          <p v-if="heroArticle.description" class="mt-4 max-w-xl text-base text-jp-muted leading-8">
            {{ heroArticle.description }}
          </p>
        </div>
      </NuxtLink>

      <!-- Other recent articles -->
      <section v-if="restRecentArticles.length" class="mb-16">
        <h2 class="mb-8 border-b border-jp-border pb-3 meta">
          最新文章
        </h2>
        <div class="space-y-0">
          <NuxtLink
            v-for="post in restRecentArticles"
            :key="post.path"
            :to="post.path"
            class="group card"
          >
            <p class="mb-3 meta">
              {{ formatDate(post.date) }}
              <span v-if="post.tag"> · {{ post.tag }}</span>
            </p>
            <h3 class="transition-colors duration-200 title-md group-hover:text-jp-muted">
              {{ post.title }}
            </h3>
            <p v-if="post.description" class="mt-3 text-sm text-jp-muted leading-7">
              {{ post.description }}
            </p>
          </NuxtLink>
        </div>
      </section>

      <!-- Older articles -->
      <section v-if="otherArticles.length" class="mt-0">
        <h2 class="mb-8 border-b border-jp-border pb-3 meta">
          其他文章
        </h2>
        <div class="grid grid-cols-2 gap-6">
          <Card
            v-for="post in otherArticles"
            :key="post.path"
            :image="post.cover"
            :date="post.date"
            :title="post.title"
            :tag="post.tag"
            :description="post.description"
            :path="post.path"
          />
        </div>
      </section>

      <div v-if="!articles?.length" class="py-12 text-center text-jp-muted">
        目前沒有文章
      </div>
    </main>
  </div>
</template>
