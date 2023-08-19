<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="h-32 bg-[#1f2937]"></header>

  <div class="wrapper">
    <RouterView />
  </div>

  <footer class="h-48 bg-[#111827]"></footer>
</template>

<style scoped>
header {
  flex: 0 0 auto;
}

.wrapper {
  flex: 1 0 auto;

  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
}

footer {
  flex: 0 0 auto;
}
</style>

