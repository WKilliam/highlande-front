import {effect, EffectRef, inject, Injectable} from "@angular/core";
import {LocalstorageServices} from "../../services/localsotrage/localstorage.services";
import {PlayerLobby} from "../../models/player.models";
import {TextConstante} from "../../app/text.constante";
import {StoreServicesSocket} from "../../services/store-Socket/store.services.socket";

@Injectable({
  providedIn: 'root'
})
export class LobbyRoomUiServices{

  private localStorage = inject(LocalstorageServices)
  readonly textUi = inject(TextConstante);
  readonly effectRef : EffectRef;
  grayCircles: any[] = new Array(8);
  readonly storeSocket = inject(StoreServicesSocket);

  constructor() {
    this.effectRef = effect(()=>{
      if(this.localStorage.getSessionStatusGame()){
        if (this.localStorage.getSessionStatusGame().lobby !== null) {
          // Remplissage des pastilles avec les avatars des joueurs
          for (let i = 0; i < this.localStorage.getSessionStatusGame().lobby.length; i++) {
            const player :PlayerLobby= this.localStorage.getSessionStatusGame().lobby[i];
            this.grayCircles.push(player.avatar);
          }
        }
      }
    })
  }

  startGame(){
    this.storeSocket.startGame();
  }
}
