import { defineStore } from 'pinia'; 
import { Player } from '../types/player-types';
import { Card } from '../types/deck-types';
import { CardUtils } from '../utils/card-utils';
import { deckStates } from './deck-data';

const player1: Player = {
  name: "Player 1",
  hand: [] as Card[],
  score: 0,
};

const dealer: Player = {
  name: "Dealer",
  hand: [] as Card[],
  score: 0,
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
      },
      drawCard(card:Card, player: Player) {
        if (card) {
          player.hand.push(card); 
        }
      },
      resetHand(player: Player) {
        player.hand = [];
        },
      discardAllCards(player: Player) {
        return player.hand.splice(0, player.hand.length);
      },
      calculateScore(player: Player) {
        player.score = CardUtils.getTotalScore(player.hand);
      },
    },
  });
  
 

