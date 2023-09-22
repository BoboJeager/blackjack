<template>
    <div @click="flipCard" class="relative w-64 h-80 transition-transform transform">
      <div v-if="flipped" class="absolute inset-0 w-full h-full bg-white backface-hidden">
        <img class="w-64 h-56 object-cover m-0 pb-2" :src="suitImage || ''" alt="Card Image" />
        <h1>{{ cardName }}</h1>
        <h2>{{ cardValue }}</h2>
      </div>
      <div v-else class="absolute inset-0 w-full h-full bg-black backface-hidden"></div>
    </div>
  </template>
<script setup lang="ts">
import { ref } from "vue";
import { Card } from "../types/deck-types";

const suitImageList = [
                  "../assets/Card_club.svg",
                  "../assets/Card_heart.svg", 
                  "../assets/Card_spade.svg", 
                  "../assets/Card_diamond.svg"
                ]

const { card } = defineProps<{
    card: Card;
}>();

const setImage = () => {
  switch (card.suit) {
    case "clubs":
      return suitImageList[0];
    case "hearts":
      return suitImageList[0];
    case "spades":
      return suitImageList[0];
    case "diamonds":
      return suitImageList[0];
    default:
      return "";
  }
}
const suitImage = setImage();
const cardName = ref(card.value);
const cardValue = ref(card.weight);
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