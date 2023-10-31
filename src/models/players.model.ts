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


export interface PlayersLobbyModels{
  avatar: string,
  pseudo: string,
  cards: Array<CardsModel>,
}

export interface PlayersGameModels{
  avatar: string,
  pseudo: string,
  life: number,
  maxLife: number,
  cardsPosessed: Array<number>,
}

export interface PlayersLittleModels{
  avatar: string,
  pseudo: string,
  teamTag: string,
}
