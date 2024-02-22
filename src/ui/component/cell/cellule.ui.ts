import {Component, inject, Input} from '@angular/core'
import {Title} from '@angular/platform-browser'
import {MatIconModule} from "@angular/material/icon";
import {NgIf} from "@angular/common";
import {MapUiServices} from "../../services/map/map.ui.services";
import {Cells} from "../../../models/maps.models";
import {StoreServicesApi} from "../../../../refonte/services/store-Api/store.services.api";
import {GameSessionServices} from "../../../features/game.session/game-session-services";
import {CellsServices} from "../../services/cell/cells.services";

@Component({
  selector: 'ui-cellule',
  standalone: true,
  template: `
    <div>
      <div
        class="cube"
        [style.top]="top"
        [style.left]="left"
      >
        <p>{{cell.id}}</p>
      </div>
      <div
        class="cube icon"
        [style.top]="top"
        [style.left]="left"
        *ngIf="cellsServices.printMovingCellPosibylity(cell.id ?? -1)"
        (click)="cellsServices.selectedMove(cell)"
      >
        <mat-icon>get_app</mat-icon>
      </div>
    </div>
  `,
  styleUrls: ['cellule.ui.scss'],
  imports: [
    MatIconModule,
    NgIf
  ]
})
export class Cellule {

  readonly cellsServices = inject(CellsServices);
  @Input() top: string = '0';
  @Input() left: string = '0';
  @Input() cell: Cells = {
    id: 0,
    x: 0,
    y: 0,
    value: 0,
  };


}
