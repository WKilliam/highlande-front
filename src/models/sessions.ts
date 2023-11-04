export interface SessionModelRequest{
  ownerId: number,
  name: string,
  createdAt:string,
  updatedAt: string,
  statusAccess:StatusGame,
  password:string,
  mapId: number,
  teamNameOne: string,
  teamNameTwo: string,
  teamNameThree: string,
  teamNameFour: string,
}

export interface SessionCheckUser {
  avatar: string,
  pseudo: string,
}

export enum StatusGame{
  PRIVATE = "PRIVATE",
  PUBLIC = "PUBLIC"
}

export interface GameKeySession{
  key: string
}
