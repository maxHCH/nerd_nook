<script setup lang="ts">
useSeoMeta({
  title: 'About - Nerd Nook',
  description: '關於 Nerd Nook',
})
</script>

<template>
  <div class="page">
    <main class="container">
      <header class="mb-12 md:mb-16">
        <h2 class="title-lg">
          About
        </h2>
      </header>

      <article class="prose-jp">
        <section class="mb-16">
          <h2 class="mb-6 title-md">
            關於這裡
          </h2>
          <p class="text-base text-jp-muted leading-8">
            Nerd Nook 是一個簡單的個人空間，用來記錄程式、生活與閱讀。
          </p>
        </section>

        <section class="mb-16">
          <h2 class="mb-6 title-md">
            關於我
          </h2>
          <p class="text-base text-jp-muted leading-8">
            一個喜歡寫程式和閱讀的人。
          </p>
        </section>

        <section>
          <h2 class="mb-6 title-md">
            聯絡方式
          </h2>
          <ul class="text-base text-jp-muted leading-8 space-y-3">
            <li>
              Email: hello@example.com
            </li>
            <li>
              GitHub: @username
            </li>
          </ul>
        </section>
      </article>
    </main>
  </div>
</template>
