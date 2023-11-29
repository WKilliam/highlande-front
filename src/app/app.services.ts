import {effect, inject, Injectable, signal} from "@angular/core";
import {StoreServicesSocket} from "../services/store-Socket/store.services.socket";
import {LocalstorageServices} from "../services/localsotrage/localstorage.services";
import {FormatRestApiModels} from "../models/formatRestApi.models";
import {StoreServicesApi} from "../services/store-Api/store.services.api";
import {Router} from "@angular/router";
import {Utils} from "../services/Utils";
import {Game, SessionStatusGame} from "../models/room.content.models";
import {UserPosition} from "../models/users.models";

@Injectable({
  providedIn: 'root',
})
export class AppServices {

  readonly #storeServicesSocket: StoreServicesSocket = new StoreServicesSocket();
  readonly localStorage: LocalstorageServices = inject(LocalstorageServices)
  readonly #localStore: LocalstorageServices = inject(LocalstorageServices);
  readonly storeApi: StoreServicesApi = inject(StoreServicesApi);
  readonly #router: Router = inject(Router);
  readonly #room = signal<string>('default')

  readonly #openSelectorCard = signal(false)
  readonly eventOpenSelectorCard = this.#openSelectorCard.asReadonly();
  readonly #openSelectorTeam = signal(false)


  getOpenSelectorCard(): boolean {
    return this.eventOpenSelectorCard()
  }

  setOpenSelectorCard(value: boolean) {
    this.#openSelectorCard.set(value)
  }

  initCheck(){
    if(this.localStorage.getUser() !== null){
      const token = this.#localStore.getUser().token
      this.storeApi.getIfUserInsideRoom(token).subscribe((response: FormatRestApiModels) => {
        if (response !== null) {
          if (response.code >= 200 && response.code < 300 && response.data !== null) {
            this.localStorage.setGame(response.data.game)
            this.localStorage.setMap(response.data.maps)
            this.localStorage.setSessionStatusGame(response.data.sessionStatusGame)
            let position: UserPosition = Utils.findPlayerIndex(
              this.localStorage.getGame().teams,
              this.localStorage.getUser().pseudo,
              this.localStorage.getUser().avatar)
            if (position.teamTag !== -1 && position.cardTag !== -1) {
              this.localStorage.setPlayerPosition(position)
            } else {
              console.log('position not found')
            }
            this.#router.navigate([`/lobby/${response.data.sessionStatusGame.room}`]);
          } else {
            console.log('code not 200-300', response)
          }
        } else {
          console.log('response null', response)
          this.#router.navigate(['/testeurio'])
        }
      })
    }else{
      console.log('user not found')
      this.#router.navigate(['/testeurio'])
    }
  }

  join(){
    const token = this.#localStore.getUser().token
    const room = this.localStorage.getSessionStatusGame().room
    if(token !== null && room !== null){
      this.#storeServicesSocket.joinRoom({
        room: room,
        token: token
      })
    }else{
      this.#storeServicesSocket.joinRoom({
        room: 'default',
        token: token
      })
    }
  }

  getRoom(): string {
    return this.#room()
  }

  setRoom(value: string) {
    this.#room.set(value)
  }

}
