<script setup>
const props = defineProps({
  image: {
    type: String,
    default: '',
  },
  date: {
    type: String,
    default: '',
  },
  tag: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  path: {
    type: String,
    default: '',
  },
  layout: {
    type: String,
    default: 'grid',
  },
})

const isListMode = computed(() => props.layout === 'list')
const hasImage = computed(() => !!props.image)
</script>

<template>
  <NuxtLink
    :to="path"
    class="group block overflow-hidden border border-jp-border rounded-lg bg-jp-surface text-left transition-colors duration-200 hover:border-jp-muted"
    :class="isListMode ? 'flex max-w-full' : ''"
  >
    <div
      class="overflow-hidden"
      :class="[
        isListMode ? 'w-48 shrink-0' : 'aspect-[4/3] w-full',
        !hasImage ? 'bg-jp-border' : '',
      ]"
    >
      <img
        v-if="hasImage"
        :src="image"
        :alt="title"
        class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      >
      <div
        v-else
        class="h-full w-full flex items-center justify-center text-jp-muted"
      >
        <span class="i-carbon-image text-4xl" />
      </div>
    </div>
    <div class="p-4" :class="isListMode ? 'flex flex-col justify-center' : ''">
      <div>
        <p class="meta">
          {{ date }}
        </p>
      </div>
      <h2 class="mt-2 text-base text-jp-text leading-relaxed transition-colors duration-200 group-hover:text-jp-muted">
        {{ title }}
      </h2>
      <p v-if="description" class="line-clamp-2 mt-2 text-sm text-jp-muted leading-relaxed">
        {{ description }}
      </p>
      <span class="mt-3 inline-block rounded bg-jp-border px-2 py-0.5 text-xs text-jp-text">
        {{ tag }}
      </span>
    </div>
  </NuxtLink>
</template>
