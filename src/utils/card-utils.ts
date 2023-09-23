import { Card } from "../types/deck-types";

export class CardUtils {
  static getTotalScore(cards: Card[]): number {
    let totalScore = 0;
    cards.forEach((card) => {
      if (Array.isArray(card.weight)) {
        totalScore += card.weight[0];
      } else {
        totalScore += card.weight;
      }
    });
    return totalScore;
  }
}
