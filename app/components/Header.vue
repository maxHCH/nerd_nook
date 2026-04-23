<template>
  <header class="site-header">
    <div class="mx-auto w-full max-w-4xl px-6 md:px-10 py-4 md:py-5 flex items-center justify-between">
      <NuxtLink to="/" class="site-logo">
        nerd nook
      </NuxtLink>
      <nav class="flex items-center gap-6">
        <NuxtLink to="/posts" class="navlink">
          Posts
        </NuxtLink>
        <NuxtLink to="/about" class="navlink">
          About
        </NuxtLink>
        <DarkToggle />
      </nav>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  border-bottom: 1px solid var(--jp-border);
  background: var(--jp-bg);
}

.site-logo {
  font-family: 'DM Serif Display', serif;
  font-size: 1.125rem;
  letter-spacing: -0.01em;
  color: var(--jp-text);
  text-decoration: none;
  transition: opacity 0.2s;
}

.site-logo:hover {
  opacity: 0.7;
}
</style>
