import { Card } from "../types/deck-types";

export class CardUtils {
  static getTotalScore(cards: Card[]): number {
    let totalScore = 0;
    cards.forEach((card) => {
      if (Array.isArray(card.weight)) {
        if (totalScore + card.weight[1] > 21) {
          totalScore += card.weight[0];
        } else {
          totalScore += card.weight[1];
        }
      } else {
        totalScore += card.weight;
      }
    });
    return totalScore;
  }
}
