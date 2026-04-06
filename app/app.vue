<script setup lang="ts">
import { appName } from '~/constants'

useHead({
  title: appName,
})
</script>

<template>
  <VitePwaManifest />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
:root {
  --jp-bg: #fafafa;
  --jp-surface: #ffffff;
  --jp-text: #1a1a1a;
  --jp-muted: #888888;
  --jp-border: #e5e5e5;
}

html.dark {
  --jp-bg: #1a1a1a;
  --jp-surface: #242424;
  --jp-text: #e5e5e5;
  --jp-muted: #888888;
  --jp-border: #333333;
}

html,
body,
#__nuxt {
  height: 100vh;
  margin: 0;
  padding: 0;
}

html.dark {
  background: var(--jp-bg);
  color: var(--jp-text);
}
</style>
