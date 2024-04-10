<script setup lang="ts">
import Sidebar from "./components/sidebar/Sidebar.vue"
</script>

<template>
  <div class="container">
    <Sidebar class="sidebar" />
    <router-view class="content"></router-view>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  height: 100vh;
  display: flex;
  overflow: hidden;
}

.sidebar {
  width: 200px;
  height: 100%;
  background-color: #f0f0f0;
  flex-shrink: 0;
}

.content {
  flex-grow: 1;
  padding: 20px;
}
</style>
