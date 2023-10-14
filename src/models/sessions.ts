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

export enum StatusGame{
  PRIVATE = "PRIVATE",
  PUBLIC = "PUBLIC"
}
