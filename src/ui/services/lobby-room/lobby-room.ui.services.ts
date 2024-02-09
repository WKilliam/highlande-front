import {effect, EffectRef, inject, Injectable, signal} from "@angular/core";
import {StorageManagerApp} from "../../../services/storageManagerApp/storageManagerApp";

@Injectable({
  providedIn: 'root'
})
export class LobbyRoomUiServices{

  readonly grayCircles: any[] = new Array(8);
  readonly #storageManagerApp = inject(StorageManagerApp);


  constructor() {
    effect(() => {
      const lobby = this.#storageManagerApp.getLobby();
      if(lobby.length > 0){
        for (let i = 0; i < this.#storageManagerApp.getLobby().length; i++) {
          const player = this.#storageManagerApp.getLobby()[i];
          if(!this.grayCircles.includes(player.avatar)){
            this.grayCircles.push(player.avatar);
          }
        }
      }
    });
  }

  getName() {
    return this.#storageManagerApp.getUser().pseudo;
  }
}
