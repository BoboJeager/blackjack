<template>
    <div>
      <h1>Dealer's Hand</h1>
      <div v-if="dealer.hand" class="flex">
        <Card v-for="card in dealer.hand" :card="card" :canFlip="true" />
      </div>
      <div v-if="dealer.score !== undefined">
        <h1>Dealer's Score:</h1>
        <h2>{{ dealer.score }}</h2>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, watch } from 'vue';
  import { usePlayerStore } from '../states/player-data';
  import Card from './Card.vue'; 
  import { useGameStore } from '../states/game-data';
  const playerStore = usePlayerStore();
  const dealer = ref(playerStore.dealer);
  
  const gameStore = useGameStore();
  
  // Watch for changes in the game state
  watch(() => gameStore.gameState, (newGameState) => {
    if (newGameState === 'dealer_turn') {
      dealerAutomatedDraw();
    }
  });
  
  // Dealer automated drawing function
  const dealerAutomatedDraw = () => {
    gameStore.dealerturn();
    if(gameStore.gameState == 'end_round'){
        gameStore.determineWinner();
        console.log(gameStore.gameState);
    }
  };
  </script>
  
  