<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Toggle } from '@/components/ui/toggle'
import { ref } from 'vue'
const router = useRouter()
const currentRoute = router.currentRoute
const routes = router.getRoutes()
</script>

<template>
  <div class="bg-background text-foreground">
    <div class="p-4 border-b-2 mb-2 border-blue-100 text-center">
      <span>小林的工资表</span>
    </div>
    <router-link
      v-for="route in routes"
      :key="route.path"
      :to="route.path"
      class="gzb-link"
    >
      <Toggle
        aria-label="Toggle italic"
        :data-state="currentRoute.path === route.path ? 'on' : 'off'"
        size="lg"
        class="gzb-siderbar"
        >{{ route.name }}</Toggle
      >
    </router-link>
  </div>
</template>
<style scoped>
.gzb-link {
  width: 100%;
  display: inline-block;
}
.gzb-siderbar {
  width: 100%;
  border-radius: 0 20px 20px 0;
  padding-left: 20px;
  justify-content: start;
}
</style>
