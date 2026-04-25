<template>
  <div class="min-h-screen flex flex-col bg-jp-bg text-jp-text">
    <Header />
    <main class="flex-1" style="padding-top: 108px">
      <slot />
    </main>
    <Footer />
  </div>
</template>
