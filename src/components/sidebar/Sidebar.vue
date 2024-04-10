<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Mail } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
const router = useRouter()
const routes = router.getRoutes()
</script>

<template>
  <div class="bg-background text-foreground">
    <router-link v-for="route in routes" :key="route.path" :to="route.path">
      {{ route.name }}
    </router-link>
    <Button> button</Button>
  </div>
</template>
