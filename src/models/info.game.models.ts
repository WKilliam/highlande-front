import {GameKeySession} from "./sessions";
import {PlayersLittleModels, PlayersLobbyModels} from "./players.model";

export interface InfoGame {
  gameKeySession: GameKeySession
  freeplace: number;
  turnCount: number,
  lobby: Array<PlayersLobbyModels>;
  orderTurn: Array<string>
  allPlayers: Array<PlayersLittleModels>;
}
