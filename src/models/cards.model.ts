import {EffectsModels} from "./effects.models";

export interface CardsModel{
  id: number;
  name: string;
  description: string;
  image: string;
  rarity: string;
  atk: number;
  def: number;
  spd: number;
  luk: number;
  effects : Array<EffectsModels>
}

export interface CardsModelsRequest{
  id?: number
  name : string
  description : string
  image : string
  rarity : string
  atk : number
  def : number
  spd : number
  luk : number,
  effects : Array<number>
}
