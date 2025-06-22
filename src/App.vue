<template>
  <div id="app">
    <RouterView />
    <NotificationContainer />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import NotificationContainer from './components/ui/NotificationContainer.vue'
</script>

<style>
#app {
  min-height: 100vh;
  background-color: #f9fafb;
}
</style>