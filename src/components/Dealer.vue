<template>
  <div>
    <h1>Dealer's Hand</h1>
    <div v-if="dealer.hand.length > 0" class="flex">
      <Card
        v-if="dealer.hand"
        v-for="(card, index) in dealer.hand"
        :key="card.suit && card.value"
        :card="card"
        :canFlip="true"
        :faceUp="index === 0 ? true : allfaceUp"
      />
    </div>
    <div v-if="dealer.score !== undefined && dealerTurn">
      <h1>Dealer's Score:</h1>
      <h2>{{ dealer.score }}</h2>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { usePlayerStore } from "../states/player-data";
import Card from "./Card.vue";
import { useGameStore } from "../states/game-data";
const playerStore = usePlayerStore();
const dealer = ref(playerStore.dealer);
const dealerTurn = ref(false);
const gameStore = useGameStore();
const allfaceUp = ref(false);

// Watch for changes in the game state
watch(
  () => gameStore.gameState,
  (newGameState) => {
    if (newGameState === "dealer_turn") {
      dealerAutomatedDraw();
    }
    if (newGameState === "initial_deal") {
      dealerTurn.value = false;
      allfaceUp.value = false;
    }
    if (newGameState === "end_round") {
      gameStore.determineWinner();
      console.log(gameStore.gameState);
    }
    if (newGameState === "dealer_win" || newGameState === "player_win") {
    }
    console.log(gameStore.gameState);
  }
);

// Dealer automated drawing function
const dealerAutomatedDraw = () => {
  dealerTurn.value = true;
  allfaceUp.value = true;
  gameStore.dealerturn();
  if (gameStore.gameState == "end_round") {
    gameStore.determineWinner();
    console.log(gameStore.gameState);
  }
};
</script>
