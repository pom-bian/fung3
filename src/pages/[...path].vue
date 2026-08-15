<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <main class="not-found">
    <div>
      <p class="eyebrow"><span></span> 404</p>
      <h1>That page<br /><em>isn’t here.</em></h1>
      <p class="intro">The name may be gone, but the domain checker is right where you left it.</p>
      <button class="home-button" type="button" @click="router.push('/')">Back to namecheck →</button>
    </div>
  </main>
</template>

<style scoped>
.not-found { min-height: 100vh; display: grid; place-items: center; padding: 40px 5vw; }
.not-found > div { width: min(900px, 100%); }
.home-button { padding: 18px 24px; border: 0; border-radius: 3px; cursor: pointer; color: white; background: #263c2d; font-weight: 600; }
</style>
