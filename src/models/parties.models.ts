import {MapModels} from "./maps.models";
import {PlayersLobbyModels} from "./players.model";
import {TeamsModels} from "./teams";
import {GameKeySession} from "./sessions";

export interface PartiesModelsJson {
  map: MapModels
  gameKeySession: GameKeySession
  game: GameModels
  infoGame: PartiesInfoGameModels
}

export interface GameModels {
  lobby: Array<PlayersLobbyModels>;
  teams: TeamsModels,
  monsters:TeamsModels,
}

export interface PartiesInfoGameModels {
  turnCount: number;
  orderTurn: Array<string>;
}
