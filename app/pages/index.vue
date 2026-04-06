<script setup lang="ts">
const online = useOnline()
</script>

<template>
  <ClientOnly>
    <Suspense>
      <PageView v-if="online" />
      <div v-else class="page">
        <main class="container-wide">
          <p class="text-jp-muted">
            You're offline
          </p>
        </main>
      </div>
      <template #fallback>
        <div class="page">
          <main class="container-wide">
            <span class="animate-pulse text-jp-muted">Loading...</span>
          </main>
        </div>
      </template>
    </Suspense>
    <template #fallback>
      <div class="page">
        <main class="container-wide">
          <span class="animate-pulse text-jp-muted">...</span>
        </main>
      </div>
    </template>
  </ClientOnly>
</template>
