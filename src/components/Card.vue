<template>
  <div
    @click="flipCard"
    class="relative m-2 h-[16rem] w-48 transform transition-transform shadow-lg"
  >
    <div
      v-if="faceUp"
      class="backface-hidden content-center absolute inset-0 m-2 h-full w-full rounded-md bg-gray-700 text-white border-blue-500 border-solid border-2 shadow-md items-center"
    >
      <img
        class="m-0 h-32 w-32 mx-auto object-cover mt-3"
        :src="suitImage || ''"
        alt="Card Image"
      />
      <h1 class="text-center">{{ cardName }}</h1>
      <h2 class="text-center pt-3">Card Value: {{ cardValue }}</h2>
    </div>
    <div
      v-else
      class="absolute mt-2 h-[16rem] inset-0 rounded-md bg-[url('src/assets/card-back.png')] bg-auto bg-no-repeat shadow-md "
    ></div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { Card } from "../types/deck-types";

const suitImageList = [
  "src/assets/Card_club.svg",
  "src/assets/Card_heart.svg",
  "src/assets/Card_spade.svg",
  "src/assets/Card_diamond.svg",
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
