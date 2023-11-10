import {NgForOf} from "@angular/common";
import {Component} from "@angular/core";
import {CharacterUiComponent} from "../character/character.ui.component";
import {Cellule} from "../cell/cellule.ui";

@Component({
  selector: 'ui-map',
  standalone: true,
  template: `
    <div class="map-container">
<!--      <ui-character-->
<!--        [top]="(characterX / mapHeight) * 100 + '%'"-->
<!--        [left]="(characterY / mapWidth) * 100 + '%'"-->
<!--      ></ui-character>-->
<!--      <img src="../../assets/map/map.png" class="map-content"/>-->
<!--      <ng-container *ngFor="let row of gridCellData; let rowIndex = index">-->
<!--        <ng-container *ngFor="let cell of row; let colIndex = index">-->
<!--          <ui-cellule-->
<!--            [top]="(cell.y / mapHeight) * 100 + '%'"-->
<!--            [left]="(cell.x / mapWidth) * 100 + '%'"-->
<!--            [cellId]="cell.id"-->
<!--            [hidden]="cell.value === -1"-->
<!--          ></ui-cellule>-->
<!--        </ng-container>-->
<!--      </ng-container>-->
<!--      <div>-->
<!--        <button (click)="move(gridCellData[10][1])">Move</button>-->
<!--      </div>-->
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
  // characterComponent = 'idle';
  // gridCellData: CellulesModels[][] = [];
  // readonly store = inject(StoreServicesApi);
  //
  // mapWidth: number = 936;
  // mapHeight: number = 620;
  // characterX: number = 5;
  // characterY: number = 5;
  //
  // arrayMove: number[] = [
  //   1,
  // ];
  //
  // ngOnInit(): void {
  //   this.pullCell()
  // }
  //
  // pullCell(){
  //   const key = 'SQMPa'
  //   // this.store.getAllCellsBySession(key).subscribe(result=>{
  //   //   this.transformerListeEnGrille(result)
  //   //   this.characterX = result[0].x
  //   //   this.characterY = result[0].y
  //   // })
  // }
  //
  // transformerListeEnGrille(listeCellules: CellulesModels[]): void {
  //   const mapWidth: number = 936;
  //   const mapHeight: number = 620;
  //   const cellWidth = 32;
  //   const cellHeight = 32;
  //   const numCols = Math.floor(mapWidth / cellWidth);
  //   const numRows = Math.floor(mapHeight / cellHeight);
  //   this.gridCellData = [];
  //   let cellId = 1;
  //
  //   for (let row = 0; row < numRows; row++) {
  //     const rowArray: CellulesModels[] = [];
  //     for (let col = 0; col < numCols; col++) {
  //       const existingCell = listeCellules.find(cell => cell.id === cellId);
  //       const cell: CellulesModels = existingCell || {
  //         id: cellId,
  //         x: col * cellWidth + 5,
  //         y: row * cellHeight + 5,
  //         value: 1,
  //       };
  //       rowArray.push(cell);
  //       cellId++;
  //     }
  //     this.gridCellData.push(rowArray);
  //   }
  // }
  //
  //
  // move(cell: CellulesModels): void {
  //   const targetX = cell.y;
  //   const targetY = cell.x;
  //   const speed = 2;
  //   const moveInterval = setInterval(() => {
  //     if (this.characterX < targetX) {
  //       this.characterX += speed;
  //     } else if (this.characterX > targetX) {
  //       this.characterX -= speed;
  //     }
  //
  //     if (this.characterY < targetY) {
  //       this.characterY += speed;
  //     } else if (this.characterY > targetY) {
  //       this.characterY -= speed;
  //     }
  //     if (this.characterX === targetX && this.characterY === targetY) {
  //       clearInterval(moveInterval); // Arrêtez la boucle d'animation
  //       console.log(`Le personnage a atteint la cellule cible avec x=${targetX}, y=${targetY}`);
  //     }
  //   }, 16);
  // }

}
