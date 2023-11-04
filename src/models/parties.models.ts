import {MapModels} from "./maps.models";
import {GameModels} from "./game.models";
import {InfoGame} from "./info.game.models";

export interface PartiesModelsJson {
  map: MapModels | null
  game: GameModels | null
  infoGame: InfoGame | null
}
