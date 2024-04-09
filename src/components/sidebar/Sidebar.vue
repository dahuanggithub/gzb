<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
const routes = router.getRoutes()
console.log(routes)
</script>

<template>
  <div class="sidebar">
    sidebar
    <router-link v-for="route in routes" :key="route.path" :to="route.path">{{ route.name }}</router-link>
  </div>
</template>