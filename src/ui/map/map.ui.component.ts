import {NgForOf} from "@angular/common";
import {Component, inject, Input} from "@angular/core";
import {CharacterUiComponent} from "../character/character.ui.component";
import {Cellule} from "../cell/cellule.ui";
import {Cells} from "../../models/maps.models";
import {StoreServicesApi} from "../../services/store-Api/store.services.api";
import {MapUiServices} from "./map.ui.services";
import {GameSessionServices} from "../../features/game.session/game-session-services";
import {Character} from "../../models/player.models";

@Component({
  selector: 'ui-map',
  standalone: true,
  template: `
    <div class="map-container">
      <div *ngFor="let row of pawn; let rowIndex = index">
        <ui-character
          [top]="(gameSessionServices.getCharacters()[rowIndex].X / mapUiServices.mapHeight) * 100 + '%'"
          [left]="(gameSessionServices.getCharacters()[rowIndex].Y / mapUiServices.mapWidth) * 100 + '%'"
        ></ui-character>
      </div>
      <img [src]="mapUrl" class="map-content"/>
      <ng-container *ngFor="let row of mapUiServices.convertListCellsToMaatix(); let rowIndex = index">
        <ng-container *ngFor="let cell of row; let colIndex = index">
          <ui-cellule
            [top]="(cell.y / mapUiServices.mapHeight) * 100 + '%'"
            [left]="(cell.x / mapUiServices.mapWidth) * 100 + '%'"
            [cell]="cell"
            [hidden]="cell.value === -1"
            [move]="gameSessionServices.movingToCellPosition(cell.id)"
          ></ui-cellule>
        </ng-container>
      </ng-container>
      <p></p>
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
  readonly gameSessionServices = inject(GameSessionServices);
  readonly mapUrl : string= '../../assets/map/map.png'
  @Input() canMovePosition : Array<Cells> = []
  pawn :Array<Character> = []

  constructor() {
    this.mapUrl = '' ? '../../assets/map/map.png' : this.mapUiServices.getMapRender()
    this.gameSessionServices.initCharacters()
    this.pawn = this.gameSessionServices.getCharacters()
    console.log('pawn',this.pawn)
  }
}
