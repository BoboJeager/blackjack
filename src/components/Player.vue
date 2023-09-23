<template>
    <div class="text-xl">
      <h1 class="text-xl">{{ player.name }}'s hand</h1>
      <div v-if="hand" class="flex">
        <Card v-if="player.hand" v-for="card in hand" :card="card" :canFlip="true" />
      </div>
      <div v-if="score !== undefined">
        <h1>{{ player.name }}'s score:</h1>
        <h2>{{ score }}</h2>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { Player } from '../types/player-types';
  import { Card as CardType } from '../types/deck-types';
  import Card from './Card.vue';
  import { ref } from 'vue';
  
  const { player } = defineProps<{
    player: Player;
    position?: 'top' | 'bottom';
  }>();
  const hand = ref<CardType[]>(player.hand);
  const score = ref(player.score);
  console.log(typeof hand.value); // It should be 'object' or 'undefined'
  </script>
  
  
  