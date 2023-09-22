<template>
    <div @click="flipCard" class="relative w-64 h-80 transition-transform transform">
      <div v-if="flipped" class="absolute inset-0 w-full h-full bg-white backface-hidden">
        <img class="w-64 h-56 object-cover m-0 pb-2" src="../assets/card-back.png" alt="Card Image" />
        <h1>Card Name</h1>
        <h2>Card Value</h2>
      </div>
      <div v-else class="absolute inset-0 w-full h-full bg-black backface-hidden"></div>
    </div>
  </template>
<script setup lang="ts">
import { ref } from "vue";

const suitImage = ref("");
const cardName = ref("");
const cardValue = ref(0);
const flipped = ref(false);

const flipCard = () => {
    flipped.value = !flipped.value;
}

</script>

<style scoped>
.backface-hidden {
  backface-visibility: hidden;
}
</style>