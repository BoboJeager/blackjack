<template>
  <div
    @click="flipCard"
    class="relative m-2 transform shadow-lg transition-transform sm:h-[11rem] sm:w-28 sm:transform-none md:h-[16rem] md:w-48 md:text-base"
  >
    <div
      v-if="faceUp"
      class="backface-hidden absolute inset-0 m-2 h-full w-full content-center items-center rounded-md border-2 border-solid border-blue-500 bg-gray-700 text-white shadow-md"
    >
      <img
        class="m-0 mx-auto mt-3 h-32 w-32 object-cover sm:h-[5rem] sm:w-[5rem]"
        :src="suitImage"
        alt="Card Image"
      />
      <h1 class="mt-6 text-center">{{ cardName }}</h1>
      <h2 class="pt-3 text-center">Card Value: {{ cardValue }}</h2>
    </div>
    <div
      v-else
      class="absolute inset-0 mt-2 rounded-md bg-[url('/card-back.png')] bg-no-repeat shadow-md sm:h-[11rem] md:h-[16rem] md:bg-auto"
    ></div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { Card } from "../types/deck-types";

const suitImageList = [
  "/Card_club.png",
  "/Card_heart.png",
  "/Card_spade.png",
  "/Card_diamond.png",
];

const { card, canFlip, faceUp } = defineProps<{
  card: Card;
  canFlip?: boolean;
  faceUp?: boolean;
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
};
const suitImage = setImage();
const cardName = ref(card.value);
const cardValue = ref(card.weight);
const flipped = ref(faceUp) || false;

const flipCard = () => {
  if (canFlip) flipped.value = !flipped.value;
};
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 1.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
