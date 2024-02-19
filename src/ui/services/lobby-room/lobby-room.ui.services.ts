import {effect, EffectRef, inject, Injectable, signal} from "@angular/core";
import {StorageManagerApp} from "../../../services/storageManagerApp/storageManagerApp";
import {DispatcherSocket} from "../../../services/dispatchers/dispatcher-socket/dispatcher-socket";

@Injectable({
  providedIn: 'root'
})
export class LobbyRoomUiServices {

  readonly #grayCircles = signal<Array<string>>(new Array(8).fill('')); // Rempli avec des chaînes vides ou toute autre valeur placeholder
  readonly #eventGrayCircles = this.#grayCircles.asReadonly();
  readonly #storageManagerApp = inject(StorageManagerApp);
  readonly #dispatchSocket  = inject(DispatcherSocket)

  constructor() {
    this.initializeGrayCircles();
    effect(() => {
      const lobby = this.#storageManagerApp.getSession().sessionStatusGame.lobby
      if (lobby.length > 0) {
        let updated = false;
        for (let i = 0; i < lobby.length && i < 8; i++) { // Limite la boucle à 8 itérations
          const player = lobby[i];
          let currentCircles = this.#grayCircles();
          // Remplacez la valeur par défaut par l'avatar du joueur si nécessaire
          if (currentCircles[i] === '' || currentCircles[i] == null) { // Vérifie si l'emplacement est vide
            currentCircles[i] = player.avatar;
            updated = true;
          }
        }
        // Si au moins un avatar a été ajouté, mettez à jour le signal
        if (updated) {
          this.#grayCircles.set([...this.#grayCircles()]);
        }

        // Vérifiez si le tableau est complet
        if (!this.#grayCircles().includes('')) {
          console.log('Lobby complet');
        }
      }
    },{allowSignalWrites: true});
  }

  private initializeGrayCircles() {
    const lobby = this.#storageManagerApp.getSession().sessionStatusGame.lobby
    let initialCircles = new Array(8).fill('');
    console.log('getLobby', lobby)
    for (let i = 0; i < lobby.length && i < 8; i++) {
      initialCircles[i] = lobby[i].avatar;
    }
    console.log('initialCircles', initialCircles)
    this.#grayCircles.set(initialCircles);

    // Vérifiez si le lobby est déjà complet lors de l'initialisation
    if (!initialCircles.includes('')) {
      console.log('Lobby complet à l\'initialisation');
    }
  }

  timer() {
    return this.#storageManagerApp.getTimer();
  }

  getEventGrayCircles() {
    return this.#eventGrayCircles();
  }

  getName() {
    return this.#storageManagerApp.getUser().pseudo;
  }

  startGame() {
    this.#dispatchSocket.startGame()
  }

  getValid() {
    return this.#storageManagerApp.getStartPossibilityIsValide()
  }
}
