import {effect, inject, Injectable, NgZone} from "@angular/core";
import {Cells, Maps, MapsModels} from "../../../models/maps.models";
import {StorageManagerApp} from "../../../services/storageManagerApp/storageManagerApp";
import {Character} from "../../../models/character.models";
import {DispatcherSocket} from "../../../services/dispatchers/dispatcher-socket/dispatcher-socket";

@Injectable({
  providedIn: 'root'
})
export class MapUiServices {


  readonly #storageManagerApp = inject(StorageManagerApp);
  map: Maps = MapsModels.initMaps()
  characters: Character[] = []
  readonly #dispatcherSocket = inject(DispatcherSocket);


  constructor(private zone: NgZone) {

    effect(() => {
      if (this.#storageManagerApp.getSession()) {
        this.map = this.#storageManagerApp.getSession().maps
        // if(this.#storageManagerApp.getSession().game.challenger.length > 0){
          this.initCharacters()
        // }
      }
    });
  }

  getMapCells() {
    return this.map.cellsGrid
  }

  getMapRender() {
    return this.map.backgroundImg
  }

  getMapWidth() {
    return this.map.width
  }

  getMapHeight() {
    return this.map.height
  }

  lerp(start: number, end: number, t: number): number {
    return start * (1 - t) + end * t;
  }

  move(cellId: number) {
    // Trouvez la cellule cible en utilisant 'find' au lieu de 'filter' pour obtenir directement l'objet au lieu d'un tableau
    const targetCell = this.map.cellsGrid.find(cell => cell.id === cellId);

    console.log('cell selected', targetCell);
    if (targetCell) {
      const valueA = targetCell.y;
      const valueB = targetCell.x;
      let t = 0;
      const speed = 0.1; // Ajustez cette valeur pour changer la vitesse de l'animation
      const session = this.#storageManagerApp.getSession();
      const currentEntityActionMovingPosition = session.sessionStatusGame.currentEntityActionMovingPosition;
      const entityTurn = session.sessionStatusGame.entityTurn[currentEntityActionMovingPosition];

      if (!entityTurn) {
        console.error('entityTurn is not defined');
        return;
      }

      const teamIndex = entityTurn.resume?.teamIndex;
      const cardIndex = entityTurn.resume?.cardIndex;
      if (teamIndex === undefined || cardIndex === undefined) {
        console.error('teamIndex or cardIndex is not defined');
        return;
      }

      const challengerTeam = session.game.challenger[teamIndex];
      const characterIndex = this.characters.findIndex(character => character.pseudo === challengerTeam.name);
      if (characterIndex === -1) {
        console.error('Character not found');
        return; // Si le personnage n'est pas trouvé, sortez de la fonction
      }

      const character = this.characters[characterIndex];

      // Animation de mouvement pour le personnage spécifié
      this.animateCharacterMovement(character, valueA, valueB, characterIndex);
    } else {
      console.error('Cell not found');
    }

  }

  private animateCharacterMovement(character: Character, targetX: number, targetY: number, characterIndex: number) {
    const speed = 0.02; // Vitesse de l'animation
    let t = 0; // Paramètre d'interpolation

    const animate = () => {
      t += speed;
      if (t > 1) t = 1; // Clampe t à 1 pour éviter de dépasser la cible

      // Calcule les positions intermédiaires
      character.X = this.lerp(character.X, targetX, t);
      character.Y = this.lerp(character.Y, targetY, t);

      // Mise à jour de la vue
      this.zone.run(() => {
      });

      if (t < 1) {
        requestAnimationFrame(animate); // Continue l'animation jusqu'à atteindre la cible
      } else {
        this.characters[characterIndex] = character
        // this.#dispatcherSocket.move(characterIndex)
      }
    };

    requestAnimationFrame(animate);
  }

  initCharacters() {
    if(this.characters.length === 0) {
      const characters = this.#storageManagerApp.getSession().game.challenger
      let content: Array<Character> = []
      for (let i = 0; i < characters.length; i++) {
        if (characters[i].commonLife > 0) {
          const valueX = characters[i].cellPosition.y === -1 ? 0 : characters[i].cellPosition.y
          const valueY = characters[i].cellPosition.x === -1 ? 0 : characters[i].cellPosition.x
          let character: Character = {
            pseudo: characters[i].name,
            X: valueX,
            Y: valueY,
            render: './../../assets/character/button.gif'
          }
          content.push(character)
        }
      }
      this.characters.push(...content)
    }else{
      console.log('characters already initialized')
    }
  }

}
