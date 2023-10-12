import {NgForOf} from "@angular/common";
import {Component, inject, OnInit} from "@angular/core";
import {CharacterUiComponent} from "../character/character.ui.component";
import {CellulesModels} from "../../models/cellules.models";
import {Store} from "../../services/store/store";
import {Cellule} from "../cell/cellule.ui";

@Component({
  selector: 'ui-map',
  standalone: true,
  template: `
    <!--    <div class="map-container">-->
    <!--      -->
    <!--    </div>-->
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
  `,
  styleUrls: ['./map.ui.component.scss'],
  imports: [
    CharacterUiComponent,
    NgForOf,
    Cellule
  ]
})
export class MapUiComponent implements OnInit {
  characterComponent = 'idle';
  gridCellData: CellulesModels[][] = [];
  readonly store = inject(Store);

  mapWidth: number = 936;
  mapHeight: number = 524;
  cellSelected: number = 258;
  // mapWidth: number = 1920;
  // mapHeight: number = 1080;

  characterX: number = 5;
  characterY: number = 5;

  arrayMove: number[] = [
    1,
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
