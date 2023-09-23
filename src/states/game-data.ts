import { defineStore } from 'pinia';
import { usePlayerStore } from './player-data'; 
import { deckStates } from './deck-data';
import { Card } from '../types/deck-types';
import { Player } from '../types/player-types';
import { Deck } from '../types/deck-types';

export const useGameStore = defineStore({
  id: 'game',
  state: () => ({
    gameState: 'start', // Initialize with 'start' state
    playerStore: usePlayerStore(),
    deckStore: deckStates(),
  }),
  actions: {
    startGame() {
      this.gameState = 'start'; 
      this.playerStore.initializePlayer(); 
      this.deckStore.initializeDeck();
    },
    initialDeal() {
      // Deal two cards to the player and the dealer
      this.deckStore.shuffleDeck();
      this.playerStore.drawCard(this.deckStore.dealCard(), this.playerStore.player1);
      this.playerStore.drawCard(this.deckStore.dealCard(), this.playerStore.dealer);
      this.playerStore.drawCard(this.deckStore.dealCard(), this.playerStore.player1);
      this.playerStore.drawCard(this.deckStore.dealCard(), this.playerStore.dealer);
    },
    dealerturn() {
        // Dealer draws cards until their score is at least 16
        this.playerStore.calculateScore(this.playerStore.dealer);
        while (this.playerStore.dealer.score < 16) {
            this.playerStore.drawCard(this.deckStore.dealCard(), this.playerStore.dealer);
            this.playerStore.calculateScore(this.playerStore.dealer);
        }
        this.gameState = 'end_round';
    },
    endRound(){
        // Discard all cards and reset the game state
        this.playerStore.discardAllCards(this.playerStore.player1);
        this.playerStore.discardAllCards(this.playerStore.dealer);
    },
    endPlayerTurn(){
            this.gameState = 'dealer_turn';
    },
    determineWinner() {
      // Compare player's and dealer's hands to determine the winner
      this.playerStore.calculateScore(this.playerStore.player1);
      this.playerStore.calculateScore(this.playerStore.dealer);
      if (this.playerStore.player1.score > 21 || (this.playerStore.dealer.score <= 21 && this.playerStore.dealer.score >= this.playerStore.player1.score)) {
        // Dealer wins
        this.gameState = 'dealer_win';
      } else {
        // Player wins
        this.gameState = 'player_win';
      }
    },
    reshuffleDeck() {
        //if poker deck is less than 15 cards, reshuffle
        if (this.deckStore.pokerDeck.length < 15) {
            this.deckStore.initializeDeck();
        }
    },
    contiueGame(){
        this.gameState = 'player_turn';
    }
  },
});
