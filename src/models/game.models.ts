import {PlayersLobbyModels} from "./players.model";
import {TeamsModels} from "./teams";

export interface GameModels {
  lobby: Array<PlayersLobbyModels>;
  teams: TeamsModels,
  monsters:TeamsModels,
}
