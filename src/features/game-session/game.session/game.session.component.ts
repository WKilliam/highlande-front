import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MapUiComponent} from "../../../ui/map/map.ui.component";
import {CelluleModule} from "../../../ui/cell/cellule.module";

@Component({
  selector: 'app-game.session',
  standalone: true,
  imports: [CommonModule, MapUiComponent, CelluleModule],
  templateUrl: './game.session.component.html',
  styleUrls: ['./game.session.component.scss']
})
export class GameSessionComponent {

}
