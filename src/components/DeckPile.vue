<template>
  <div>
    <div class="m-2">
      <h1 class="text-xl">Poker Deck</h1>
      <h2>Cards left: {{ deckStore.pokerDeck.length }}</h2>
      <Card :card="pokerDeck[0]" />
    </div>
    <div class="m-2 mt-6">
      <h1 class="text-xl">Discard Pile</h1>
      <h2>cards: {{ deckStore.discardPile.length }}</h2>
      <Card
        v-if="deckStore.discardPile.length > 0"
        :card="discardPile[0]"
        :canFlip="true"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { deckStates } from "../states/deck-data";
import Card from "../components/Card.vue";
import { onUpdated } from "vue";
import { Deck } from "../types/deck-types";

const deckStore = deckStates();
deckStore.initializeDeck();
deckStore.shuffleDeck();
const pokerDeck = deckStore.pokerDeck;
const discardPile = deckStore.discardPile;

onUpdated(() => {
  if (deckStore.pokerDeck.length < 16) {
    deckStore.pokerDeck = deckStore.reshuffle(
      deckStore.discardPile,
      deckStore.pokerDeck
    );
    deckStore.discardPile = [] as Deck;
  }
});
</script>
