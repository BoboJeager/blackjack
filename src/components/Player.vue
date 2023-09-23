  <template>
    <div class="text-xl">
      <h1 class="text-xl">{{ player.name }}'s hand</h1>
      <div v-if="player.hand.length > 0" class="flex">
        <Card v-if="player.hand" v-for="card in player.hand" :key="card.suit && card.value" :card="card" :canFlip="true" />
      </div>
      <div v-if="player.score !== undefined">
        <h1>{{ player.name }}'s score:</h1>
        <h2>{{ player.score }}</h2>
        <button class=" bg-red-500 rounded-full py-1 px-5 m-2" @click="endturn">Stay</button>
        <button class="bg-red-500 rounded-full py-1 px-5 m-2" @click="drawCard">hit</button>
        <button class="bg-red-500 rounded-full py-1 px-5 m-2" @click="continueGame">continue</button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { Player } from '../types/player-types';
  import Card from './Card.vue';
  import { watch } from 'vue';
  import { usePlayerStore } from '../states/player-data';
  import { useGameStore } from '../states/game-data';
  import { deckStates } from "../states/deck-data";

  const gameStore = useGameStore();

  const { player } = defineProps<{
    player: Player;
    position?: 'top' | 'bottom';
  }>();
  
  const playerStore = usePlayerStore();
  

  const drawCard = () => {
    playerStore.drawCard(deckStates().dealCard(), player);
    playerStore.calculateScore(player);
  };

    watch(() => player.score, (newScore) => {
        if (newScore > 21 ) {
        useGameStore().endPlayerTurn();
        }
    });

    watch(() => gameStore.gameState, (newGameState) => {
    if (newGameState === 'initial_deal'){
      gameStore.initialDeal();
      console.log(gameStore.gameState);
    }
  });


  const continueGame = () => {
    useGameStore().endRound();
    playerStore.resetHand(player);
    useGameStore().initialDeal();
  };

  const endturn = () => {
    console.log(useGameStore().gameState)
    useGameStore().endPlayerTurn();
  };
  </script>
  
  