<script setup lang="ts">
import Card from "./components/Card.vue";
</script>

<template>
  <div class="h-screen w-screen bg-[#2e9860]">
    <Card :card="{suit: 'spades', value: '3', weight: 3 }"/>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
