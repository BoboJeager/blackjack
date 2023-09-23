import { Deck } from "../types/deck-types";

export class DeckUtils {
  static shuffle(deck: Deck): Deck {
    let shuffledDeck = [...deck];
    for (let i = shuffledDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
    }
    return shuffledDeck;
  }
  static deal(deck: Deck, numCards: number): Deck {
    return deck.slice(numCards);
  }
  static draw(deck: Deck): Deck {
    return deck.slice(1);
  }
  static reshuffle(deck: Deck, discardPile: Deck): Deck {
    return this.shuffle([...deck, ...discardPile]);
  }

}