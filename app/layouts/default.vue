<template>
  <div class="min-h-screen flex flex-col bg-jp-bg text-jp-text">
    <Header />
    <main class="flex-1">
      <slot />
    </main>
    <Footer />
  </div>
</template>
