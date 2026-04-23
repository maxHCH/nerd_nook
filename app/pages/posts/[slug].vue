<script setup lang="ts">
const route = useRoute()

const slug = computed(() => String(route.params.slug ?? ''))

const { data: article, pending } = await useAsyncData(
  `posts-${slug.value}`,
  () => queryCollection('posts').path(`/posts/${slug.value}`).first(),
  { server: false },
)

useSeoMeta({
  title: computed(() => article.value?.title ?? 'Nerd Nook'),
  description: computed(() => article.value?.description ?? article.value?.title ?? ''),
})

watch(pending, (isPending) => {
  if (!isPending && !article.value) {
    throw createError({ statusCode: 404, statusMessage: 'Article not found' })
  }
})
</script>

<template>
  <div class="page">
    <article class="container">
      <NuxtLink to="/posts" class="navlink">
        ← Back
      </NuxtLink>

      <div v-if="pending || !article" class="mt-12 meta">
        Loading...
      </div>

      <template v-else>
      <header class="mb-16 mt-12 md:mb-20 md:mt-16">
        <p class="mb-6 meta">
          {{ formatDate(article.date) }}
          <span v-if="article.tag"> · {{ article.tag }}</span>
        </p>
        <h2 class="title-xl">
          {{ article.title }}
        </h2>
        <p v-if="article.description" class="mt-6 text-base text-jp-muted leading-8">
          {{ article.description }}
        </p>
      </header>

      <div class="border-t border-jp-border pt-12 md:pt-16">
        <ContentRenderer class="prose-jp" :value="article" />
      </div>
      </template>
    </article>
  </div>
</template>

<style scoped>
.prose-jp :deep(h1),
.prose-jp :deep(h2),
.prose-jp :deep(h3),
.prose-jp :deep(h4) {
  color: var(--jp-text);
  font-family: 'DM Serif Display', serif;
  letter-spacing: -0.01em;
}

.prose-jp :deep(h1) {
  margin-bottom: 2rem;
  font-size: 2rem;
  line-height: 1.3;
}

.prose-jp :deep(h2) {
  margin-top: 3.5rem;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
}

.prose-jp :deep(h3) {
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  font-size: 1.25rem;
}

.prose-jp :deep(p) {
  margin-top: 1.75rem;
  margin-bottom: 1.75rem;
  color: var(--jp-text);
  line-height: 2.25rem;
  letter-spacing: 0.01em;
}

.prose-jp :deep(a) {
  color: var(--jp-text);
  text-decoration: underline;
  text-decoration-color: var(--jp-border);
  text-underline-offset: 4px;
  transition: text-decoration-color 0.2s;
}

.prose-jp :deep(a:hover) {
  text-decoration-color: var(--jp-muted);
}

.prose-jp :deep(img) {
  margin: 2.5rem 0;
  border-radius: 0;
}

.prose-jp :deep(blockquote) {
  margin: 2.5rem 0;
  padding-left: 1.5rem;
  border-left: 2px solid var(--jp-border);
  color: var(--jp-muted);
  font-style: italic;
}

.prose-jp :deep(ul),
.prose-jp :deep(ol) {
  margin: 1.75rem 0;
  padding-left: 1.5rem;
}

.prose-jp :deep(li) {
  margin: 0.5rem 0;
  line-height: 2rem;
}

.prose-jp :deep(code) {
  border-radius: 0.25rem;
  background: var(--jp-surface);
  padding: 0.2rem 0.4rem;
  font-size: 0.875rem;
}

.prose-jp :deep(pre) {
  margin: 2rem 0;
  overflow-x: auto;
  border: 1px solid var(--jp-border);
  border-radius: 0.25rem;
  background: var(--jp-surface);
  padding: 1.25rem;
}

.prose-jp :deep(pre code) {
  background: transparent;
  padding: 0;
}

.prose-jp :deep(hr) {
  margin: 3rem 0;
  border: none;
  border-top: 1px solid var(--jp-border);
}
</style>
