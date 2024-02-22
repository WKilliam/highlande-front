import {inject, Injectable} from "@angular/core";
import {DispatcherSocket} from "../../../services/dispatchers/dispatcher-socket/dispatcher-socket";
import {StorageManagerApp} from "../../../services/storageManagerApp/storageManagerApp";

@Injectable({
  providedIn: 'root',
})
export class DiceService {

  currentFace: number = 0;
  isRolling: boolean = false; // to start and stop the animation
  readonly #dispatcherSocket = inject(DispatcherSocket);
  readonly #storageManagerApp = inject(StorageManagerApp);

  rollDice(): void {
    this.isRolling = true; // start the animation
    this.#dispatcherSocket.rollingDice()
    setTimeout(() => {
      this.currentFace = this.#storageManagerApp.getDiceRollingValue()
        // Math.ceil(Math.random() * 6);
      this.isRolling = false; // stoped the animation
      this.#dispatcherSocket.nextDiceValue(this.currentFace)
    }, 2000);
  }


}
