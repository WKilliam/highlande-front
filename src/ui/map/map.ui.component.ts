import {NgForOf} from "@angular/common";
import {CelluleModule} from "../cell/cellule.module";
import {Component, OnInit, ViewChild} from "@angular/core";
import {CharacterUiComponent} from "../character/character.ui.component";
import {CellulesModels} from "../../models/cellules.models";

@Component({
  selector: 'ui-map',
  standalone: true,
  template: `
    <div>
      <div class="map-container">
        <ui-character
          [top]="(characterX / mapHeight) * 100 + '%'"
          [left]="(characterY / mapWidth) * 100 + '%'"
        ></ui-character>
        <img src="../../assets/map/map.png" class="map-content"/>
        <ng-container *ngFor="let row of gridCellData; let rowIndex = index">
          <ng-container *ngFor="let cell of row; let colIndex = index">
            <ui-cellule
              [top]="(cell.y / mapHeight) * 100 + '%'"
              [left]="(cell.x / mapWidth) * 100 + '%'"
              [cellId]="cell.id"
              [hidden]="cell.value === -1"
            ></ui-cellule>
          </ng-container>
        </ng-container>
      </div>
      <button (click)="findCellsAtDistance(cellSelected, 1)">1</button>
      <button (click)="findCellsAtDistance(cellSelected, 2)">2</button>
      <button (click)="move(gridCellData[3][4])">3</button>
    </div>
  `,
  styleUrls: ['./map.ui.component.scss'],
  imports: [
    CharacterUiComponent,
    CelluleModule,
    NgForOf
  ]
})
export class MapUiComponent implements OnInit {
  characterComponent = 'idle';
  gridCellData: CellulesModels[][] = [];

  mapWidth: number = 970;
  mapHeight: number = 512;
  cellSelected: number = 258;

  characterX: number = 5;
  characterY: number = 5;

  arrayMove: number[] = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 31, 36, 37, 38, 39, 40, 45, 46, 47, 61, 62, 67, 68, 69, 70, 74, 75, 76, 77, 92, 99, 100, 101, 102,
    103, 104, 105, 106, 130, 131, 132, 177, 178, 207, 225, 255, 280, 281, 282, 283, 284, 309, 310, 311, 312, 313, 314, 330, 339, 340, 341,
    342, 343, 344, 357, 358, 359, 360, 369, 370, 371, 372, 373, 374, 386, 387, 388, 389, 390, 398, 399, 400, 401, 402, 403, 404, 417,
    418, 419, 420, 428, 429, 430, 431, 432, 433, 434, 446, 447, 448, 449, 450, 457, 458, 459, 460, 461, 462, 463, 464, 465, 466, 467,
    468, 469, 477, 478, 479, 480, 408, 438, 347, 377, 407, 270, 300, 240
  ];

  ngOnInit(): void {
    this.createGrid()
    this.placeCharacterRandomly()
  }

  move(cell: CellulesModels): void {
    const targetX = cell.y;
    const targetY = cell.x;
    const speed = 2; // Par exemple, 2 pixels par frame

    // Utilisez une boucle ou une animation pour faire évoluer les coordonnées du personnage vers la cible
    const moveInterval = setInterval(() => {
      if (this.characterX < targetX) {
        this.characterX += speed;
      } else if (this.characterX > targetX) {
        this.characterX -= speed;
      }

      if (this.characterY < targetY) {
        this.characterY += speed;
      } else if (this.characterY > targetY) {
        this.characterY -= speed;
      }

      // Vérifiez si le personnage a atteint la cible
      if (this.characterX === targetX && this.characterY === targetY) {
        clearInterval(moveInterval); // Arrêtez la boucle d'animation
        console.log(`Le personnage a atteint la cellule cible avec x=${targetX}, y=${targetY}`);
      }
    }, 16); // 60 frames par seconde (ajustez si nécessaire)
  }

  findCellById(targetId: number): CellulesModels {
    for (const rowArray of this.gridCellData) {
      for (const cell of rowArray) {
        if (cell.id === targetId) {
          console.log(`Cellule avec l'ID ${targetId} trouvée.`)
          return cell; // Retourne la cellule avec l'ID correspondant
        }
      }
    }
    console.error(`Cellule avec l'ID ${targetId} non trouvée.`);
    return this.gridCellData[0][0];
  }

  placeCharacterRandomly(): void {
    const {minX, maxX, minY, maxY} = this.getGridIndices();
    const eligibleCells: { x: number, y: number }[] = [];
    for (let x = minX; x <= maxX; x++) {
      for (let y = minY; y <= maxY; y++) {
        const cell = this.gridCellData[y][x];
        if (cell.value !== -1) {
          eligibleCells.push({x, y});
        }
      }
    }
    if (eligibleCells.length > 0) {
      const randomIndex = Math.floor(Math.random() * eligibleCells.length);
      const randomCell = eligibleCells[randomIndex];
      this.characterY = randomCell.x * 32 + 5; // Mise à l'échelle avec la largeur de la cellule
      this.characterX = randomCell.y * 32 + 5; // Mise à l'échelle avec la hauteur de la cellule
      const characterCell = this.gridCellData[randomCell.y][randomCell.x];
      console.log(`Le personnage a été placé sur la cellule ID: ${characterCell.id}`);
    } else {
      console.error("Aucune cellule éligible n'a été trouvée.");
    }
  }



  createGrid(): void {
    const cellWidth = 32;
    const cellHeight = 32;
    const numCols = Math.floor(this.mapWidth / cellWidth);
    const numRows = Math.floor(this.mapHeight / cellHeight);
    this.gridCellData = [];
    let cellId = 1; // Initialisez l'ID de cellule à 1
    for (let row = 0; row < numRows; row++) {
      const rowArray: CellulesModels[] = [];
      for (let col = 0; col < numCols; col++) {
        const cell: CellulesModels = {
          id: cellId,
          x: col * cellWidth + 5,
          y: row * cellHeight + 5,
          value: this.arrayMove.includes(cellId) ? -1 : 1,
        };
        rowArray.push(cell);
        cellId++;
      }
      this.gridCellData.push(rowArray);
    }
  }

  getGridIndices(): { minX: number, maxX: number, minY: number, maxY: number } {
    const numRows = this.gridCellData.length;
    const numCols = this.gridCellData[0].length;
    const minX = 0;
    const maxX = numCols - 1;
    const minY = 0;
    const maxY = numRows - 1;
    console.log(`Limites de la matrice : minRow=${minX}, maxRow=${maxX}, minCol=${minY}, maxCol=${maxY}`);
    return {minX, maxX, minY, maxY};
  }
  findCellsAtDistance(startId: number, distance: number): CellulesModels[] {
    const result: CellulesModels[] = [];
    let startX: number | null = null;
    let startY: number | null = null;
    this.gridCellData.forEach((rowArray, rowIndex) => {
      rowArray.forEach((cell, colIndex) => {
        if (cell.id === startId) {
          startX = rowIndex;
          startY = colIndex;
        }
      });
    });

    if (startX === null || startY === null) {
      console.error(`Cellule de départ avec l'ID ${startId} non trouvée.`);
      return result;
    }
    const {minX, maxX, minY, maxY} = this.getGridIndices();
    for (let x = minX; x <= maxX; x++) {
      for (let y = minY; y <= maxY; y++) {
        const dx = Math.abs(x - startY);
        const dy = Math.abs(y - startX);
        const manhattanDistance = dx + dy;
        if (manhattanDistance === distance) {
          result.push(this.gridCellData[y][x]);
        }
      }
    }
    this.move(result[0]);
    console.log(`Cellules à une distance de ${distance} de la cellule de départ (ID: ${startId}) :`, result);
    return result;
  }
}
