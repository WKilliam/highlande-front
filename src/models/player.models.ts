import {CardByEntityPlaying, CardEntitySimplify, CardsRestApi} from "./cards.models";

export interface PlayerCards {
    avatar: string;
    pseudo: string;
}

export interface PlayerLobby {
    id: number;
    score: number;
    avatar: string;
    pseudo: string;
    cards :Array<CardEntitySimplify>;
}

export interface Character {
  pseudo: string;
  X: number;
  Y: number;
  render: string;
}
