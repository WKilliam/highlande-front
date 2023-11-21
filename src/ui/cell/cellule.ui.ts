import {Component, inject, Input} from '@angular/core'
import {Title} from '@angular/platform-browser'
import {MatIconModule} from "@angular/material/icon";
import {NgIf} from "@angular/common";
import {MapUiServices} from "../map/map.ui.services";
import {Cells} from "../../models/maps.models";
import {StoreServicesApi} from "../../services/store-Api/store.services.api";
import {GameSessionServices} from "../../features/game.session/game-session-services";

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
        *ngIf="move"
        (click)="gameSessionServices.selectedMove(cell)"
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

  readonly gameSessionServices = inject(GameSessionServices);
  @Input() top: string = '0';
  @Input() left: string = '0';
  readonly mapUiServices = inject(MapUiServices);
  @Input() cell: Cells = {
    id: 0,
    x: 0,
    y: 0,
    value: 0,
  };
  @Input() move: boolean = false;


}
