<script setup lang="ts">
const { data: articles } = await useAsyncData(() =>
  queryCollection('posts')
    .all(),
)

// 計算一個月前的日期
const oneMonthAgo = computed(() => {
  const date = new Date()
  date.setMonth(date.getMonth() - 1)
  return date
})

// 最新文章：一個月內發布，依時間由近到遠排序
const recentArticles = computed(() => {
  if (!articles.value)
    return []

  return articles.value
    .filter((post) => {
      const postDate = new Date(post.date)
      return postDate >= oneMonthAgo.value
    })
    .sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
})

// 其他文章：非最新文章，依時間由近到遠排序
const otherArticles = computed(() => {
  if (!articles.value)
    return []

  const recentPaths = new Set(recentArticles.value.map(p => p.path))

  return articles.value
    .filter(post => !recentPaths.has(post.path))
    .sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
})
</script>

<template>
  <div class="page">
    <main class="container-wide">
      <header class="mb-12 md:mb-16">
        <h1 class="title-lg">
          最新文章
        </h1>
        <p class="mt-4 text-sm text-jp-muted leading-relaxed tracking-wide">
          近一個月內發布的文章
        </p>
      </header>

      <!-- 最新文章 -->
      <section v-if="recentArticles.length">
        <div class="space-y-0">
          <NuxtLink
            v-for="post in recentArticles"
            :key="post.path"
            :to="post.path"
            class="group card"
          >
            <p class="mb-3 meta">
              {{ post.date }}
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

      <!-- 空結果提示 -->
      <div v-else class="py-12 text-center text-jp-muted">
        目前沒有最新文章
      </div>

      <!-- 其他文章 -->
      <section v-if="otherArticles.length" class="mt-16">
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
    </main>
  </div>
</template>
