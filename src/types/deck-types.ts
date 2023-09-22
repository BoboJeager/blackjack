export type Card = {
  suit: "spades" | "hearts" | "clubs" | "diamonds";
  value: string;
  weight: number | number[];
};

export type Deck = Card[];

export type DiscardPile = Card[];
