<script setup lang="ts">
import Sidebar from './components/sidebar/Sidebar.vue'
import Toaster from '@/components/ui/toast/Toaster.vue'
</script>

<template>
  <Toaster />
  <div class="gzb-container">
    <Sidebar class="sidebar" />
    <router-view class="content"></router-view>
  </div>
</template>

<style scoped>
.gzb-container {
  width: 100%;
  height: 100vh;
  display: flex;
  overflow: hidden;
}

.sidebar {
  width: 200px;
  height: 100%;
  background-color: #fff;
  flex-shrink: 0;
}

.content {
  flex-grow: 1;
  padding: 20px 20px 20px 40px;
}
</style>
