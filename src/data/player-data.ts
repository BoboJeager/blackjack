import { Player } from "../types/player-types";

export const player1: Player = {
    name: "Player 1",
    hand: [{suit: "spades", value: "4", weight: 4},{suit: "spades", value: "A", weight: [1, 10, 11]}],
    score: 0,
};

export const dealer: Player = {
    name: "Dealer",
    hand: [{suit: "spades", value: "4", weight: 4},{suit: "spades", value: "A", weight: [1, 10, 11]}],
};