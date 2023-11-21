import {Cells} from "./maps.models";
import {TurnListEntity} from "./room.content.models";
import {Can} from "./emus";

export interface FormatSocketModels{
    date: string;
    room: string;
    data?: any;
    message: string;
    code: number;
    error: any;
}

export interface JoinSessionSocket {
    room: string;
    token: string;
}

export interface JoinSessionTeam {
    room: string;
    lobbyPosition: number;
    teamPosition: number;
    cardPosition: number;
}

export interface JoinSessionTeamCard {
  room: string;
  lobbyPosition: number;
  teamPosition: number;
  cardPosition: number;
  cardByPlayer:number
}

export interface CurrentTurnAction {
  room: string;
  isPlay: boolean;
  turnEntity: TurnListEntity;
  dice: number,
  currentCell: Cells,
  moves: Cells[],
  move: Cells,
}
