import {CardsModel} from "./cards.model";

export interface PlayersModel{
  id: number
  name: string
  avatar: string
  currentHp:number
  maxHp: number,
  card: CardsModel
}

export interface PlayerInGameModel{
  id: number
  pseudo: string
  bearcoin: number
  avatar: string
}
