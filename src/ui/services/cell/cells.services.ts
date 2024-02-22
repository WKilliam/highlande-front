import {inject, Injectable} from "@angular/core";
import {Cells} from "../../../models/maps.models";
import {DispatcherSocket} from "../../../services/dispatchers/dispatcher-socket/dispatcher-socket";
import {MapUiServices} from "../map/map.ui.services";

@Injectable({
  providedIn: 'root',
})
export class CellsServices {
  move: boolean = false;
  movingCellList : Array<Cells> = []
  readonly #dispatcherSocket = inject(DispatcherSocket);
  readonly #mapService = inject(MapUiServices);

  printMovingCellPosibylity(cellId:number) {
    if(cellId !== -1) {
      return this.movingCellList.findIndex((cell) => cell.id === cellId) !== -1;
    }else{
      return false
    }
  }

  selectedMove(cell: Cells) {
    console.log('selectedMove', cell)
    const cellIndex = cell.id ?? -1
    if(cellIndex !== -1) {
      this.#mapService.move(cellIndex)
      this.#dispatcherSocket.move(cellIndex)
      this.movingCellList = []
    }
  }
}
