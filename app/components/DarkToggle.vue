<script setup lang="ts">
const color = useColorMode()

useHead({
  meta: [{
    id: 'theme-color',
    name: 'theme-color',
    content: () => color.value === 'dark' ? '#222222' : '#ffffff',
  }],
})

function toggleDark() {
  color.preference = color.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <button class="icon-btn" aria-label="Toggle dark mode" @click="toggleDark">
    <div class="i-carbon-sun dark:i-carbon-moon text-lg" />
  </button>
</template>
