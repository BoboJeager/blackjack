<template>
    <div @click="flipCard" class="relative w-56 h-80 transition-transform transform">
      <div v-if="flipped" class="m-2 absolute inset-0 w-full h-full bg-white backface-hidden shadow-md rounded-md">
        <img class="w-56 h-56 p-2 object-cover m-0 pb-2" :src="suitImage || ''" alt="Card Image" />
        <h1>{{ cardName }}</h1>
        <h2>{{ cardValue }}</h2>
      </div>
      <div v-else class="absolute inset-0  bg-[url('src/assets/card-back.png')] bg-no-repeat bg-contain backface-hidden shadow-md rounded-md"></div>
    </div>
  </template>
<script setup lang="ts">
import { ref } from "vue";
import { Card } from "../types/deck-types";

const suitImageList = [
                  "src/assets/Card_club.svg",
                  "src/assets/Card_heart.svg", 
                  "src/assets/Card_spade.svg", 
                  "src/assets/Card_diamond.svg"
                ]

const { card } = defineProps<{
    card: Card;
}>();

const setImage = () => {
  switch (card.suit) {
    case "clubs":
      return suitImageList[0];
    case "hearts":
      return suitImageList[1];
    case "spades":
      return suitImageList[2];
    case "diamonds":
      return suitImageList[3];
    default:
      return "";
  }
}
const suitImage = setImage();
const cardName = ref(card.value);
const cardValue = ref(card.weight);
const flipped = ref(false);


const flipCard = () => {
  flipped.value = true;
}


</script>

<style scoped>
.backface-hidden {
  backface-visibility: hidden;
}
</style>