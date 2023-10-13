import {PlayersModel} from "./players.model";

export interface Teams{
  characterTeam: string;
  teamName: string;
  teamAtk: number;
  teamDef: number;
  teamSpd: number;
  teamLuk: number;
  teamLife: number;
  teamMaxLife: number;
  player1: PlayersModel
  player2: PlayersModel
}
