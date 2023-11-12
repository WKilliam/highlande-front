import {NgForOf} from "@angular/common";
import {Component, inject} from "@angular/core";
import {CharacterUiComponent} from "../character/character.ui.component";
import {Cellule} from "../cell/cellule.ui";
import {Cells} from "../../models/maps.models";
import {StoreServicesApi} from "../../services/store-Api/store.services.api";
import {MapUiServices} from "./map.ui.services";

@Component({
  selector: 'ui-map',
  standalone: true,
  template: `
    <div class="map-container">
      <div *ngFor="let row of mapUiServices.characters; let rowIndex = index">
        <ui-character
          [top]="(mapUiServices.characters[rowIndex].X / mapUiServices.mapHeight) * 100 + '%'"
          [left]="(mapUiServices.characters[rowIndex].Y / mapUiServices.mapWidth) * 100 + '%'"
        ></ui-character>
      </div>

      <img src="../../assets/map/map.png" class="map-content"/>
      <ng-container *ngFor="let row of mapUiServices.convertListCellsToMaatix(); let rowIndex = index">
        <ng-container *ngFor="let cell of row; let colIndex = index">
          <ui-cellule
            [top]="(cell.y / mapUiServices.mapHeight) * 100 + '%'"
            [left]="(cell.x / mapUiServices.mapWidth) * 100 + '%'"
            [cellId]="cell.id"
            [hidden]="cell.value === -1"
          ></ui-cellule>
        </ng-container>
      </ng-container>
    </div>
  `,
  styleUrls: ['./map.ui.component.scss'],
  imports: [
    CharacterUiComponent,
    NgForOf,
    Cellule
  ]
})
export class MapUiComponent {

  readonly mapUiServices = inject(MapUiServices);



}
