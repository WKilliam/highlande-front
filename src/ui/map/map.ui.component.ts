import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CelluleModule} from "../cell/cellule.module";

@Component({
  selector: 'ui-map',
  standalone: true,
  imports: [CommonModule, CelluleModule],
  template: `
    <div class="map-container">
      <img
        src="../../assets/map/map.png" class="map-content"/>
      <ng-container
        *ngFor="let cell of cellData">
        <ui-cellule
          [backgroundColor]="cell.backgroundColor"
          [top]="(cell.y / mapHeight) * 100 + '%'"
          [left]="(cell.x / mapWidth) * 100 + '%'"></ui-cellule>
      </ng-container>
    </div>`,
  styleUrls: ['./map.ui.component.scss']
})
export class MapUiComponent {
  cellData: { x: number, y: number, backgroundColor: string }[] = [
    { x: 5, y: 5, backgroundColor: 'rgba(255, 255, 255, 0.50)' },

    { x: 35, y: 5, backgroundColor: 'rgba(255, 255, 255, 0.50)' },
    { x: 65, y: 5, backgroundColor: 'rgba(255, 255, 255, 0.50)' },
    { x: 95, y: 5, backgroundColor: 'rgba(255, 255, 255, 0.50)' },
    { x: 125, y: 5, backgroundColor: 'rgba(255, 255, 255, 0.50)' },
    { x: 155, y: 5, backgroundColor: 'rgba(255, 255, 255, 0.50)' },
    { x: 185, y: 5, backgroundColor: 'rgba(255, 255, 255, 0.50)' },
    { x: 215, y: 5, backgroundColor: 'rgba(255, 255, 255, 0.50)' },
    { x: 245, y: 5, backgroundColor: 'rgba(255, 255, 255, 0.50)' },
    { x: 275, y: 5, backgroundColor: 'rgba(255, 255, 255, 0.50)' },
    { x: 305, y: 5, backgroundColor: 'rgba(255, 255, 255, 0.50)' },
    { x: 335, y: 5, backgroundColor: 'rgba(255, 255, 255, 0.50)' },
    { x: 365, y: 5, backgroundColor: 'rgba(255, 255, 255, 0.50)' },
    { x: 395, y: 5, backgroundColor: 'rgba(255, 255, 255, 0.50)' },
    { x: 425, y: 5, backgroundColor: 'rgba(255, 255, 255, 0.50)' },
    { x: 455, y: 5, backgroundColor: 'rgba(255, 255, 255, 0.50)' },
    { x: 485, y: 5, backgroundColor: 'rgba(255, 255, 255, 0.50)' },
    { x: 515, y: 5, backgroundColor: 'rgba(255, 255, 255, 0.50)' },
    { x: 545, y: 5, backgroundColor: 'rgba(255, 255, 255, 0.50)' },
    { x: 575, y: 5, backgroundColor: 'rgba(255, 255, 255, 0.50)' },
    { x: 605, y: 5, backgroundColor: 'rgba(255, 255, 255, 0.50)' },
    { x: 635, y: 5, backgroundColor: 'rgba(255, 255, 255, 0.50)' },
    { x: 665, y: 5, backgroundColor: 'rgba(255, 255, 255, 0.50)' },
    { x: 695, y: 5, backgroundColor: 'rgba(255, 255, 255, 0.50)' },
    { x: 725, y: 5, backgroundColor: 'rgba(255, 255, 255, 0.50)' },
    { x: 755, y: 5, backgroundColor: 'rgba(255, 255, 255, 0.50)' },
    { x: 785, y: 5, backgroundColor: 'rgba(255, 255, 255, 0.50)' },
    { x: 815, y: 5, backgroundColor: 'rgba(255, 255, 255, 0.50)' },
    { x: 845, y: 5, backgroundColor: 'rgba(255, 255, 255, 0.50)' },
    { x: 875, y: 5, backgroundColor: 'rgba(255, 255, 255, 0.50)' },
    { x: 905, y: 5, backgroundColor: 'rgba(255, 255, 255, 0.50)' },
    { x: 935, y: 5, backgroundColor: 'rgba(255, 255, 255, 0.50)' },

    { x: 965, y: 5, backgroundColor: 'rgba(255, 255, 255, 0.50)' },
    { x: 5, y: 485, backgroundColor: 'rgba(255, 255, 255, 0.50)' },

    { x: 5, y: 35, backgroundColor: 'rgba(255, 255, 255, 0.50)' },
    { x: 5, y: 65, backgroundColor: 'rgba(255, 255, 255, 0.50)' },
    { x: 5, y: 95, backgroundColor: 'rgba(255, 255, 255, 0.50)' },
    { x: 5, y: 125, backgroundColor: 'rgba(255, 255, 255, 0.50)' },
    { x: 5, y: 155, backgroundColor: 'rgba(255, 255, 255, 0.50)' },
    { x: 5, y: 185, backgroundColor: 'rgba(255, 255, 255, 0.50)' },
    { x: 5, y: 215, backgroundColor: 'rgba(255, 255, 255, 0.50)' },
    { x: 5, y: 245, backgroundColor: 'rgba(255, 255, 255, 0.50)' },

    { x: 5, y: 275, backgroundColor: 'rgba(255, 255, 255, 0.50)' },
    { x: 5, y: 305, backgroundColor: 'rgba(255, 255, 255, 0.50)' },
    { x: 5, y: 335, backgroundColor: 'rgba(255, 255, 255, 0.50)' },
    { x: 5, y: 365, backgroundColor: 'rgba(255, 255, 255, 0.50)' },
    { x: 5, y: 395, backgroundColor: 'rgba(255, 255, 255, 0.50)' },
    { x: 5, y: 425, backgroundColor: 'rgba(255, 255, 255, 0.50)' },
    { x: 5, y: 455, backgroundColor: 'rgba(255, 255, 255, 0.50)' },

    { x: 965, y: 485, backgroundColor: 'rgba(255, 255, 255, 0.50)' },
  ];


  mapWidth: number = 970; // Largeur de la carte en pixels
  mapHeight: number = 512; // Hauteur de la carte en pixels
}
