<template>
    <div>
      <Board>
        <template v-slot:dealer>
          <Dealer/>
        </template>
        <template v-slot:player>
          <Player :player="player1Instance" />
        </template>
        <template v-slot:deck>
          <DeckPile />
        </template>
      </Board>
    </div>
  </template>
  
  <script setup lang="ts">
  import { usePlayerStore } from '../states/player-data';
  import { Player as PlayerType } from '../types/player-types';
  import Player from '../components/Player.vue';
  import Dealer from '../components/Dealer.vue';
  import Board from '../components/Board.vue';
  import DeckPile from '../components/DeckPile.vue';
  
  const playerStore = usePlayerStore();
  usePlayerStore().initializePlayer();
  const player1Instance = playerStore.player1 as PlayerType;
  const dealerInstance = playerStore.dealer as PlayerType;
  </script>
  