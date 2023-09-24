<template>
  <div class="fixed inset-0 flex items-center justify-center">
    <!-- Darkened backdrop -->
    <div class="fixed inset-0 bg-black opacity-20"></div>

    <!-- Modal content -->
    <div
      class="relative z-50 h-[20rem] w-[30rem] rounded-lg bg-gray-50 p-8 shadow-lg"
    >
      <div class="flex flex-col items-center justify-center">
        <h1 class="text-3xl font-bold">{{ title }}</h1>
        <div class="my-3" v-if="!newGame">
          <h2 class="my-1 text-center text-xl">
            Dealer total: {{ playerStore.dealer.score }}
          </h2>
          <h2 class="my-1 text-center text-xl">
            Your total: {{ playerStore.player1.score }}
          </h2>
        </div>
        <div v-else>
          <h2 class="my-2 text-">Press Hit to draw a card and Stay to keep your hand</h2>
          <span
            >but will cost you -10 points, winning grants you 10 but a black
            jack grants you 15, if there is a draw it is a push and no one
            wins</span
          >
        </div>
        <button
          class="mt-10 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          @click.once="gameStart"
        >
          {{ buttonText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from "../states/game-data";
import { ref, onMounted } from "vue";
import { usePlayerStore } from "../states/player-data";

const gameStore = useGameStore();
const playerStore = usePlayerStore();

const title = ref("Start Black-Jack Session");
const newGame = ref(true);
if (newGame.value) {
  title.value = "Start Black-Jack Session";
} else {
  title.value = "continue?";
}
const buttonText = ref("Start New Game");

onMounted(() => {
  if (gameStore.gameState === "start") {
    newGame.value = true;
  }
});

//check if game is over
if (gameStore.gameState === "player_win") {
  title.value = "You Win";
  buttonText.value = "continue ?";
  newGame.value = false;
}

if (gameStore.gameState === "dealer_win") {
  title.value = "You lose";
  buttonText.value = "continue ?";
  newGame.value = false;
}

if (gameStore.gameState === "push") {
  title.value = "Push no one wins";
  buttonText.value = "continue ?";
  newGame.value = false;
}

const gameStart = () => {
  if (newGame.value) {
    gameStore.startGame();
    gameStore.initialDeal();
  } else {
    useGameStore().endRound();
    gameStore.initialDeal();
  }
};
</script>
