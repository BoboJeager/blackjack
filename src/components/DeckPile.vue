<template>
    <div>
      <div>
        <h2>Poker Deck</h2>
        <h2>{{ deckStore.pokerDeck.length }}</h2>
        <Card :card="pokerDeck[0]" />
      </div>
      <div>
        <h2>Discard Pile</h2>
        <h2>{{ deckStore.discardPile.length }}</h2>
        <Card v-if="deckStore.discardPile.length > 0" :card="discardPile[0]" :canFlip="true" />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { deckStates } from "../states/deck-data";
  import Card from "../components/Card.vue";
  import { ref, onUpdated } from "vue";
  import { Deck } from "../types/deck-types";
  
  const deckStore = deckStates();
  deckStore.initializeDeck();
  deckStore.shuffleDeck();
  const pokerDeck = deckStore.pokerDeck;
  const discardPile = deckStore.discardPile;
 
  let hasReshuffled = false;
  
  
  onUpdated(() => {
    if (deckStore.pokerDeck.length < 15) {
      deckStore.pokerDeck = deckStore.reshuffle(pokerDeck, discardPile);
      deckStore.discardPile = [] as Deck;
      hasReshuffled = true;
    }else{
        hasReshuffled = false;
    }
  });
  </script>
  