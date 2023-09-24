import { defineStore } from "pinia";
import { usePlayerStore } from "./player-data";
import { deckStates } from "./deck-data";

export const useGameStore = defineStore({
  id: "game",
  state: () => ({
    gameState: "start", // Initialize with 'start' state
    playerStore: usePlayerStore(),
    deckStore: deckStates(),
  }),
  actions: {
    startGame() {
      this.gameState = "start";
      this.playerStore.initializePlayer();
      this.deckStore.initializeDeck();
      this.deckStore.shuffleDeck();
      this.gameState = "initial_deal";
    },
    initialDeal() {
      this.gameState = "initial_deal";
      this.playerStore.drawCard(
        this.deckStore.dealCard(),
        this.playerStore.player1
      );
      this.playerStore.drawCard(
        this.deckStore.dealCard(),
        this.playerStore.dealer
      );
    },
    dealerturn() {
      // Dealer draws cards until their score is at least 16
      this.playerStore.calculateScore(this.playerStore.dealer);
      while (this.playerStore.dealer.score < 16) {
        this.playerStore.drawCard(
          this.deckStore.dealCard(),
          this.playerStore.dealer
        );
        this.playerStore.calculateScore(this.playerStore.dealer);
      }
      this.gameState = "end_round";
    },
    endRound() {
      // Discard all cards and reset the game state and put into discard pile
      const playerHand = this.playerStore.discardAllCards(
        this.playerStore.player1
      );
      const dealerHand = this.playerStore.discardAllCards(
        this.playerStore.dealer
      );
      this.deckStore.discardPile.push(...playerHand, ...dealerHand);
      this.playerStore.player1.score = 0;
      this.playerStore.dealer.score = 0;
    },
    continueGame() {
      this.endRound();
      this.gameState = "initial_deal";
    },
    endPlayerTurn() {
      this.gameState = "dealer_turn";
    },
    determineWinner() {
      // Compare player's and dealer's hands to determine the winner
      this.playerStore.calculateScore(this.playerStore.player1);
      this.playerStore.calculateScore(this.playerStore.dealer);
      if (
        this.playerStore.player1.score > 21 ||
        (this.playerStore.dealer.score <= 21 &&
          this.playerStore.dealer.score > this.playerStore.player1.score)
      ) {
        // Dealer wins
        this.gameState = "dealer_win";
      } else if (
        this.playerStore.player1.score == this.playerStore.dealer.score
      ) {
        this.gameState = "push";
      } else {
        // Player wins
        this.gameState = "player_win";
      }
      console.log(this.gameState)
    },
    contiueGame() {
      this.gameState = "initial_deal";
    },
  },
});
