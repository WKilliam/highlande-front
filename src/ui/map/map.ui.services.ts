import {inject, Injectable} from "@angular/core";
import {LocalstorageServices} from "../../services/localsotrage/localstorage.services";
import {Character} from "../../models/player.models";
import {Cells, Maps} from "../../models/maps.models";
import {StoreServicesSocket} from "../../services/store-Socket/store.services.socket";

@Injectable({
  providedIn: 'root'
})
export class MapUiServices {

  readonly localStorage: LocalstorageServices = inject(LocalstorageServices)
  readonly mapHeight: number = 0
  readonly mapWidth: number = 0
  storeSocket = inject(StoreServicesSocket)

  constructor() {
    if (this.localStorage.getMap()) {
      this.mapHeight = this.localStorage.getMap().height
      this.mapWidth = this.localStorage.getMap().width
    }
  }

  getMapRender() {
    return this.localStorage.getMap().backgroundImg
  }

  convertListCellsToMaatix(): Cells[][] {
    const mapWidth: number = this.localStorage.getMap().width;
    const mapHeight: number = this.localStorage.getMap().height;
    const cellWidth = 32;
    const cellHeight = 32;
    const numCols = Math.floor(mapWidth / cellWidth);
    const numRows = Math.floor(mapHeight / cellHeight);
    let gridCellData: Cells[][] = [];
    let cellId = 1;

    for (let row = 0; row < numRows; row++) {
      const rowArray: Cells[] = [];
      for (let col = 0; col < numCols; col++) {
        const existingCell = this.localStorage.getMap().cellsGrid.find(cell => cell.id === cellId);
        const cell: Cells = existingCell || {
          id: cellId,
          x: col * cellWidth + 5,
          y: row * cellHeight + 5,
          value: 1,
        };
        rowArray.push(cell);
        cellId++;
      }
      gridCellData.push(rowArray);
    }
    return gridCellData;
  }





}
