<script setup>
import { useWindowScroll } from '@vueuse/core'

const { y } = useWindowScroll()
const scrolled = computed(() => y.value > 60)
</script>

<template>
  <header :class="['site-header', { 'is-scrolled': scrolled }]">
    <div class="mx-auto w-full max-w-4xl px-6 md:px-10 flex items-center justify-between">
      <NuxtLink to="/" class="site-logo">
        <img src="/logo.png" alt="Nerd Nook" class="logo-img" />
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
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  padding-top: 1.25rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid var(--jp-border);
  background: var(--jp-bg);
  transition: padding 0.3s ease;
}

.site-header.is-scrolled {
  padding-top: 0.625rem;
  padding-bottom: 0.625rem;
}

.site-logo {
  font-family: 'DM Serif Display', serif;
  font-size: 1.125rem;
  letter-spacing: -0.01em;
  color: var(--jp-text);
  text-decoration: none;
  transition: opacity 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.site-logo:hover {
  opacity: 0.7;
}

.logo-img {
  height: 68px;
  width: 68px;
  object-fit: contain;
  display: block;
  transition: height 0.3s ease, width 0.3s ease;
}

.is-scrolled .logo-img {
  height: 40px;
  width: 40px;
}
</style>
