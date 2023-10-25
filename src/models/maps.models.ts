import {CellulesModels} from "./cellules.models";

export interface MapsModels {
  id: number,
  backgroundImg: string,
  name: string,
}

export interface MapModels {
  backgroundImg: string;
  width: number;
  height: number;
  name: string;
  cellsGrid: CellulesModels[]
}
