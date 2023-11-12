import {inject, Injectable} from "@angular/core";
import {LocalstorageServices} from "../../services/localsotrage/localstorage.services";
import {Character} from "../../models/player.models";
import {Cells, Maps} from "../../models/maps.models";

@Injectable({
  providedIn: 'root'
})
export class MapUiServices{

  readonly localStorage = inject(LocalstorageServices)
  readonly characters : Array<Character> = []
  readonly mapHeight: number = 0
  readonly mapWidth: number = 0

  constructor() {
    this.initCharacters()
    if(this.localStorage.getMap()){
      this.mapHeight = this.localStorage.getMap().height
      this.mapWidth = this.localStorage.getMap().width
    }
  }

  getMapRender() {
    return this.localStorage.getMap().backgroundImg
  }

  convertListCellsToMaatix(): Cells[][] {
    const mapWidth: number = this.localStorage.getMap().width;
    const mapHeight: number = this.localStorage.getMap().height;
    const cellWidth = 32;
    const cellHeight = 32;
    const numCols = Math.floor(mapWidth / cellWidth);
    const numRows = Math.floor(mapHeight / cellHeight);
    let gridCellData: Cells[][] = [];
    let cellId = 1;

    for (let row = 0; row < numRows; row++) {
      const rowArray: Cells[] = [];
      for (let col = 0; col < numCols; col++) {
        const existingCell = this.localStorage.getMap().cellsGrid.find(cell => cell.id === cellId);
        const cell: Cells = existingCell || {
          id: cellId,
          x: col * cellWidth + 5,
          y: row * cellHeight + 5,
          value: 1,
        };
        rowArray.push(cell);
        cellId++;
      }
      gridCellData.push(rowArray);
    }
    return gridCellData;
  }

  initCharacters() {
    const players = this.localStorage.getGame().teams
    const monsters = this.localStorage.getGame().monsters
    const characters = [...players, ...monsters]
    for (let i = 0; i < characters.length; i++) {
      if(characters[i].cellPosition.x !== -1){
        let character:Character = {
          X: characters[i].cellPosition.y,
          Y: characters[i].cellPosition.x,
          render: './../../assets/character/button.gif'
        }
        this.characters.push(character)
      }
    }
  }

  lerp(start: number, end: number, t: number): number {
    return start * (1 - t) + end * t;
  }

  move(cell: Cells): void {
    const targetX = cell.y;
    const targetY = cell.x;
    let t = 0;
    const speed = 0.01; // Vous pouvez ajuster cette valeur pour changer la vitesse de l'animation

    const animate = () => {
      t += speed;
      this.characters[0].X = this.lerp(this.characters[0].X, targetX, t);
      this.characters[0].Y = this.lerp(this.characters[0].Y, targetY, t);
      // Si le personnage n'a pas encore atteint la destination, planifiez le prochain déplacement
      if (t < 1) {
        requestAnimationFrame(animate);
      } else {
        console.log(`Le personnage a atteint la cellule cible avec x=${targetX}, y=${targetY}`);
      }
    };
    animate();
  }

}
