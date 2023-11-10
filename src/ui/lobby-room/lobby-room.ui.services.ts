import {effect, EffectRef, inject, Injectable} from "@angular/core";
import {LocalstorageServices} from "../../services/localsotrage/localstorage.services";
import {PlayerLobby} from "../../models/player.models";

@Injectable({
  providedIn: 'root'
})
export class LobbyRoomUiServices{

  private localStorage = inject(LocalstorageServices)
  readonly effectRef : EffectRef;
  grayCircles: any[] = new Array(8);

  constructor() {
    this.effectRef = effect(()=>{
      if (this.localStorage.getSessionStatusGame().lobby !== null) {

        // Remplissage des pastilles avec les avatars des joueurs
        for (let i = 0; i < this.localStorage.getSessionStatusGame().lobby.length; i++) {
          const player :PlayerLobby= this.localStorage.getSessionStatusGame().lobby[i];
          this.grayCircles.push(player.avatar);
        }
      }
    })
  }

  roomInterface(){

  }
}
