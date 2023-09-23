import { Card } from "./deck-types";

export type Player = {
  name: string;
  hand: Card[];
  score: number;
};
