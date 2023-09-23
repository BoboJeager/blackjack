<template>
  <div
    @click="flipCard"
    class="relative m-2 h-80 w-56 transform transition-transform"
  >
    <div
      v-if="faceUp"
      class="backface-hidden absolute inset-0 m-2 h-full w-full rounded-md bg-white shadow-md"
    >
      <img
        class="m-0 h-56 w-56 object-cover p-2 pb-2"
        :src="suitImage || ''"
        alt="Card Image"
      />
      <h1>{{ cardName }}</h1>
      <h2>{{ cardValue }}</h2>
    </div>
    <div
      v-else
      class="backface-hidden absolute inset-0 rounded-md bg-[url('src/assets/card-back.png')] bg-contain bg-no-repeat shadow-md"
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
.backface-hidden {
  backface-visibility: hidden;
}
</style>
