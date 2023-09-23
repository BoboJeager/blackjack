import { defineStore } from 'pinia';
import { Deck } from '../types/deck-types';
import { Card } from '../types/deck-types';

export const deckStates = defineStore({
  id: 'deck',
  state: () => ({
    pokerDeck: [] as Deck,
    discardPile: [] as Deck,
  }),
  actions: {
    initializeDeck() {
      this.pokerDeck = [
        {suit: "spades", value: "2", weight: 2},
        {suit: "spades", value: "3", weight: 3},
        {suit: "spades", value: "4", weight: 4},
        {suit: "spades", value: "5", weight: 5},
        {suit: "spades", value: "6", weight: 6},
        {suit: "spades", value: "7", weight: 7},
        {suit: "spades", value: "8", weight: 8},
        {suit: "spades", value: "9", weight: 9},
        {suit: "spades", value: "10", weight: 10},
        {suit: "spades", value: "J", weight: 10},
        {suit: "spades", value: "Q", weight: 10},
        {suit: "spades", value: "K", weight: 10},
        {suit: "spades", value: "A", weight: [1, 10, 11]},
        {suit: "hearts", value: "2", weight: 2},
        {suit: "hearts", value: "3", weight: 3},
        {suit: "hearts", value: "4", weight: 4},
        {suit: "hearts", value: "5", weight: 5},
        {suit: "hearts", value: "6", weight: 6},
        {suit: "hearts", value: "7", weight: 7},
        {suit: "hearts", value: "8", weight: 8},
        {suit: "hearts", value: "9", weight: 9},
        {suit: "hearts", value: "10", weight: 10},
        {suit: "hearts", value: "J", weight: 10},
        {suit: "hearts", value: "Q", weight: 10},
        {suit: "hearts", value: "K", weight: 10},
        {suit: "hearts", value: "A", weight: [1, 10, 11]},
        {suit: "clubs", value: "2", weight: 2},
        {suit: "clubs", value: "3", weight: 3},
        {suit: "clubs", value: "4", weight: 4},
        {suit: "clubs", value: "5", weight: 5},
        {suit: "clubs", value: "6", weight: 6},
        {suit: "clubs", value: "7", weight: 7},
        {suit: "clubs", value: "8", weight: 8},
        {suit: "clubs", value: "9", weight: 9},
        {suit: "clubs", value: "10", weight: 10},
        {suit: "clubs", value: "J", weight: 10},
        {suit: "clubs", value: "Q", weight: 10},
        {suit: "clubs", value: "K", weight: 10},
        {suit: "clubs", value: "A", weight: [1, 10, 11]},
        {suit: "diamonds", value: "2", weight: 2},
        {suit: "diamonds", value: "3", weight: 3},
        {suit: "diamonds", value: "4", weight: 4},
        {suit: "diamonds", value: "5", weight: 5},
        {suit: "diamonds", value: "6", weight: 6},
        {suit: "diamonds", value: "7", weight: 7},
        {suit: "diamonds", value: "8", weight: 8},
        {suit: "diamonds", value: "9", weight: 9},
        {suit: "diamonds", value: "10", weight: 10},
        {suit: "diamonds", value: "J", weight: 10},
        {suit: "diamonds", value: "Q", weight: 10},
        {suit: "diamonds", value: "K", weight: 10},
        {suit: "diamonds", value: "A", weight: [1, 10, 11]},
      ];
    },
    addToDiscardPile(cards: Card[]) {
      for (let card of cards) {
        this.discardPile.push(card);
      }
    },
    shuffleDeck() {
      for (let i = this.pokerDeck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.pokerDeck[i], this.pokerDeck[j]] = [this.pokerDeck[j], this.pokerDeck[i]];
      }
    },
    dealCard(): Card {
      return this.pokerDeck.pop() as Card;
    },
    reshuffle(pokerDeck: Deck, discardPile: Deck) {
        const combinedDeck = [...pokerDeck, ...discardPile];
        this.shuffleDeck();
        return combinedDeck;
    },
  },
});

export default deckStates;