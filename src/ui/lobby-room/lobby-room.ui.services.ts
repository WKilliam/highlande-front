import {effect, EffectRef, inject, Injectable, signal} from "@angular/core";
import {LocalstorageServices} from "../../services/localsotrage/localstorage.services";
import {PlayerLobby} from "../../models/player.models";
import {TextConstante} from "../../app/text.constante";
import {Router} from "@angular/router";
import {StoreServicesSocket} from "../../services/store-Socket/store.services.socket";
import {AppServices} from "../../app/app.services";
import {SocketEndpoint} from "../../app/socket.endpoint";

@Injectable({
  providedIn: 'root'
})
export class LobbyRoomUiServices{

  private localStorage = inject(LocalstorageServices)
  readonly textUi = inject(TextConstante);
  private timer: any;
  grayCircles: any[] = new Array(8);
  private readonly router = inject(Router)
  readonly storeSocketServices = inject(StoreServicesSocket);
  readonly appServices = inject(AppServices);
  private readonly socketEndpoint= inject(SocketEndpoint)

  readonly #timerValue = signal(2)
  readonly #startTimer = signal(false)
  readonly #timerValueRef = this.#timerValue.asReadonly()
  readonly #startTimerRef = this.#startTimer.asReadonly()

  constructor() {
    this.appServices.setRoom(this.localStorage.getSessionStatusGame().room)
    this.socketEndpoint.instanceRoomConnect('LobbyRoomUiServices')
    if(this.localStorage.getSessionStatusGame() !== null){
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
  }

  startGameSession(){
    this.timerEvolving()
  }

  timerEvolving() {
    this.setStartTimer(true)
    this.timer = setInterval(() => {
      if (this.getTimerValue()> 0) {
        this.setTimerValue(this.getTimerValue() - 1)
      } else {
        this.stopTimer()
        this.setStartTimer(false)
        console.log('timer end')
        this.storeSocketServices.createTurnList()
      }
    }, 1000);
  }

  getTimerValue(){
    return this.#timerValueRef()
  }

  setTimerValue(value : number){
    this.#timerValue.set(value)
  }

  stopTimer(): void {
    clearInterval(this.timer);
  }

  getStartTimer(){
    return this.#startTimerRef()
  }

  setStartTimer(value : boolean){
    this.#startTimer.set(value)
  }
}
