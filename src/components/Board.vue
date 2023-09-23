<template>
  <div class="flex h-screen flex-col items-center justify-center">
    <div class="absolute inset-x-0 top-0 z-0 flex">
      <slot name="dealer"></slot>
    </div>
    <div class="absolute inset-x-0 bottom-0 z-0 flex">
      <slot name="player"></slot>
    </div>
    <div class="absolute inset-y-20 right-0 z-0">
      <slot name="deck"></slot>
    </div>
    <Transition>
      <div v-if="modal" class="z-20">
        <Modal />
      </div>
    </Transition>
  </div>
</template>
<script setup lang="ts">
import Modal from "./Modal.vue";
import { useGameStore } from "../states/game-data";
import { watch, ref } from "vue";

const modal = ref(true);
const gameStore = useGameStore();
watch(
  () => gameStore.gameState,
  (newGameState) => {
    if (newGameState === "initial_deal") {
      modal.value = false;
    }
    if (
      newGameState === "player_win" ||
      newGameState === "dealer_win" ||
      newGameState === "push"
    ) {
      modal.value = true;
    }
  }
);
</script>
<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 1.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
