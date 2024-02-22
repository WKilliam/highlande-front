import {NgForOf} from "@angular/common";
import {Component, inject} from "@angular/core";
import {CharacterUiComponent} from "../character/character.ui.component";
import {Cellule} from "../cell/cellule.ui";
import {GameSessionServices} from "../../../features/game.session/game-session-services";
import {MapUiServices} from "../../services/map/map.ui.services";

@Component({
  selector: 'ui-map',
  standalone: true,
  template: `
    <div class="map-container">
      <div *ngFor="let character of mapService.characters; let rowIndex = index">
        <ui-character
          [top]="(character.X / mapService.getMapHeight()) * 100 + '%'"
          [left]="(character.Y / mapService.getMapWidth()) * 100 + '%'"
        ></ui-character>
      </div>
      <img [src]="mapService.getMapRender()" class="map-content"/>
      <ng-container *ngFor="let cell of mapService.getMapCells(); let colIndex = index">
        <ui-cellule
          [top]="(cell.y / (mapService.getMapHeight() - 10)) * 100 + '%'"
          [left]="(cell.x / (mapService.getMapWidth()- 5)) * 100 + '%'"
          [cell]="cell"
        ></ui-cellule>
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

  readonly mapService = inject(MapUiServices)
}
