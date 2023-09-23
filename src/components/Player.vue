<template>
  <div class="ml-5 border-2 border-solid border-red-500 text-xl">
    <div class="m-2">
      <h1 class="text-xl">{{ player.name }}'s hand</h1>
      <Transition>
        <div v-if="player.hand.length > 0" class="flex">
          <TransitionGroup>
            <Card
              v-for="card in player.hand"
              :key="card.suit && card.value"
              :card="card"
              :canFlip="true"
              :faceUp="true"
            />
          </TransitionGroup>
        </div>
      </Transition>
      <div v-if="player.score !== undefined">
        <div class="flex">
          <div class="m-2 rounded-xl bg-gray-300 p-2">
            <h1>your total card value:</h1>
            <h2>{{ player.score }}</h2>
          </div>
          <div class="m-2 rounded-xl bg-gray-300 p-2">
            <h1>{{ player.name }}'s totalScore:</h1>
            <h2>{{ player.totalScore }}</h2>
          </div>
        </div>
        <button
          class="m-2 w-32 rounded-xl bg-blue-500 px-5 py-1 shadow-lg hover:bg-blue-700"
          @click="endturn"
        >
          Stay
        </button>
        <button
          class="m-2 w-32 rounded-xl bg-red-500 px-5 py-1 shadow-lg hover:bg-red-700"
          @click="drawCard"
        >
          hit
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Player } from "../types/player-types";
import Card from "./Card.vue";
import { watch } from "vue";
import { usePlayerStore } from "../states/player-data";
import { useGameStore } from "../states/game-data";
import { deckStates } from "../states/deck-data";

const gameStore = useGameStore();

const { player } = defineProps<{
  player: Player;
  position?: "top" | "bottom";
}>();

const playerStore = usePlayerStore();

const drawCard = () => {
  playerStore.drawCard(deckStates().dealCard(), player);
  playerStore.calculateScore(player);
};

watch(
  () => player.score,
  (newScore) => {
    if (newScore > 21) {
      useGameStore().endPlayerTurn();
    }
  }
);

watch(
  () => gameStore.gameState,
  (newGameState) => {
    if (newGameState === "initial_deal") {
      gameStore.initialDeal();
      playerStore.calculateScore(player);
      console.log(gameStore.gameState);
    }
    if (newGameState === "player_win") {
      if (player.score == 21 && player.hand.length == 2) {
        playerStore.updateTotalScore(player, 15);
      } else {
        playerStore.updateTotalScore(player, 10);
      }
    }
    if (newGameState === "dealer_win" && player.score > 21) {
      playerStore.updateTotalScore(player, -10);
    }
  }
);

const endturn = () => {
  console.log(useGameStore().gameState);
  useGameStore().endPlayerTurn();
};
</script>
<style>
.slide-fade-enter-active {
  transition: all 0.1s ease-in;
}
.slide-fade-enter-leave {
  transition: all 0.1s ease-out;
}
</style>
