<!-- Inside a Vue component -->
<template>
    <div>
        <div>
            <h2>Poker Deck</h2>
              <Card :card="pokerDeck[0]"/>      
        </div>
        <div v-if="discardPile.length > 0">
            <h2>Discard Pile</h2>
              <Card :card="discardPile[0]" :flippedCard="true"/>
        </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { deckStates } from "../states/deck-data";
  import Card from "../components/Card.vue";
  
  const deckStore = deckStates();
  deckStore.initializeDeck(); 
  deckStore.shuffleDeck();
  const pokerDeck = deckStore.pokerDeck;
  const discardPile = deckStore.discardPile;
  </script>