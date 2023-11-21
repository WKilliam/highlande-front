import {effect, EffectRef, inject, Injectable} from "@angular/core";
import {LocalstorageServices} from "../../services/localsotrage/localstorage.services";
import {PlayerLobby} from "../../models/player.models";
import {TextConstante} from "../../app/text.constante";
import {Router} from "@angular/router";
import {StoreServicesSocket} from "../../services/store-Socket/store.services.socket";

@Injectable({
  providedIn: 'root'
})
export class LobbyRoomUiServices{

  private localStorage = inject(LocalstorageServices)
  readonly textUi = inject(TextConstante);
  readonly effectRef : EffectRef;
  grayCircles: any[] = new Array(8);
  private readonly router = inject(Router)
  readonly storeSocketServices = inject(StoreServicesSocket);

  constructor() {
    this.effectRef = effect(()=>{
      if(this.localStorage.getSessionStatusGame()){
        if (this.localStorage.getSessionStatusGame().lobby !== null) {
          // Remplissage des pastilles avec les avatars des joueurs
          for (let i = 0; i < this.localStorage.getSessionStatusGame().lobby.length; i++) {
            const player :PlayerLobby= this.localStorage.getSessionStatusGame().lobby[i];
            if(!this.grayCircles.includes(player.avatar)){
              this.grayCircles.push(player.avatar);
            }
          }
        }
      }
    })
  }

  startGameSession(){
    this.storeSocketServices.createTurnList()
    if(this.localStorage.getSessionStatusGame().entityTurn.length === 0){
      this.storeSocketServices.createTurnList()
      this.router.navigate(['/game'])
    }else{
      this.router.navigate(['/game'])
    }
  }
}
