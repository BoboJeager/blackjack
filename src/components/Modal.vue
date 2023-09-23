<template>
    <div class="fixed inset-0 flex items-center justify-center">
      <!-- Darkened backdrop -->
      <div class="fixed inset-0 bg-black opacity-20"></div>
  
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow-lg w-[30rem] h-[20rem] p-8 z-50">
        <div class="flex flex-col items-center justify-center">
          <h1 class="text-3xl font-bold">{{ title }}</h1>
          <div v-if="!newGame">
              <h2>dealer total: {{ playerStore.dealer.score }}</h2>
              <h2>Your total: {{ playerStore.player1.score }}</h2>
          </div>
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-10 rounded"
            @click="gameStart"
          >
            {{ buttonText }}
          </button>
        </div>
      </div>
    </div>
  </template>
   
  
<script setup lang="ts">
import { useGameStore } from '../states/game-data';
import {ref,onMounted } from 'vue';
import { usePlayerStore } from '../states/player-data';

const gameStore = useGameStore();
const playerStore = usePlayerStore();


const title = ref('Start Black-Jack Session');
const newGame = ref(true);
if(newGame.value){
    title.value = 'Start Black-Jack Session';
}else{
    title.value = 'continue?';
}
const buttonText = ref('Start New Game');

onMounted(() => {
        console.log(gameStore.gameState)
        if (gameStore.gameState === 'start') {
            newGame.value = true;
        }
    }
);

//check if game is over
if(gameStore.gameState === 'player_win'){
    title.value = 'You Win';
    buttonText.value = 'continue ?';
    newGame.value = false;
}

if(gameStore.gameState === 'dealer_win'){
    title.value = 'You lose';
    console.log(playerStore.dealer.score)
    buttonText.value = 'continue ?';
    newGame.value = false;
}

if(gameStore.gameState === 'push'){
    title.value = 'Push';
    buttonText.value = 'continue ?';
    newGame.value = false;
}

const gameStart = () => {
    if(newGame.value){
        gameStore.startGame();
        gameStore.initialDeal();
    }else{
        useGameStore().endRound();
        gameStore.initialDeal();

    }
}

</script>