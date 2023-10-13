import {CardsModel} from "./cards.model";

export interface PlayersModel{
  id: number
  name: string
  avatar: string
  currentHp:number
  maxHp: number,
  card: CardsModel
}
