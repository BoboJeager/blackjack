import { defineStore } from 'pinia';
import { Player } from '../types/player-types';
import { Card } from '../types/deck-types';

const player1: Player = {
  name: "Player 1",
  hand: [
    { suit: "spades", value: "4", weight: 4 } ,
    { suit: "spades", value: "A", weight: [1, 10, 11] },
  ] as Card[],
  score: 0,
};

const dealer: Player = {
  name: "Dealer",
  hand: [
    { suit: "spades", value: "4", weight: 4 },
    { suit: "spades", value: "A", weight: [1, 10, 11] },
  ] as Card[],
};

export const usePlayerStore = defineStore({
  id: 'player',
  state: () => ({
    player1: {} as Player,
    dealer: {} as Player,
  }),
  actions: {
    initializePlayer() {
      this.player1 = { ...player1 };
      this.dealer = { ...dealer };
    }
}
});

