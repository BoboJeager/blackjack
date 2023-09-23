  <template>
    <div class="text-xl">
      <h1 class="text-xl">{{ player.name }}'s hand</h1>
      <div v-if="hand" class="flex">
        <Card v-if="player.hand" v-for="card in hand" :card="card" :canFlip="true" />
      </div>
      <div v-if="player.score !== undefined">
        <h1>{{ player.name }}'s score:</h1>
        <h2>{{ player.score }}</h2>
        <button @click="endturn">Stay</button>
        <button @click="drawCard">hit</button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { Player } from '../types/player-types';
  import { Card as CardType } from '../types/deck-types';
  import Card from './Card.vue';
  import { ref, watch } from 'vue';
  import { usePlayerStore } from '../states/player-data';
  import { useGameStore } from '../states/game-data';
  import { deckStates } from "../states/deck-data";

  const { player } = defineProps<{
    player: Player;
    position?: 'top' | 'bottom';
  }>();
  const hand = ref<CardType[]>(player.hand);
  
  const playerStore = usePlayerStore();

  const drawCard = () => {
    playerStore.drawCard(deckStates().dealCard(), player);
    playerStore.calculateScore(player);
  };

  //watch for hand score changes
    watch(() => player.score, (newScore) => {
        if (newScore > 21 ) {
        useGameStore().endPlayerTurn();
        }
    });

  const endturn = () => {
    console.log(useGameStore().gameState)
    useGameStore().endPlayerTurn();
  };
  </script>
  
  