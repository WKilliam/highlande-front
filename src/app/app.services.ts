import {effect, inject, Injectable, signal} from "@angular/core";
import {StoreServicesSocket} from "../services/store-Socket/store.services.socket";
import {LocalstorageServices} from "../services/localsotrage/localstorage.services";
import {FormatRestApiModels} from "../models/formatRestApi.models";
import {StoreServicesApi} from "../services/store-Api/store.services.api";
import {Router} from "@angular/router";
import {Utils} from "../services/Utils";
import {Game, SessionStatusGame} from "../models/room.content.models";

@Injectable({
  providedIn: 'root',
})
export class AppServices {

  readonly #storeServicesSocket:StoreServicesSocket = new StoreServicesSocket();
  readonly localStorage :LocalstorageServices= inject(LocalstorageServices)
  readonly #localStore: LocalstorageServices = inject(LocalstorageServices);
  readonly storeApi: StoreServicesApi = inject(StoreServicesApi);
  readonly #storeSocket: StoreServicesSocket = inject(StoreServicesSocket);
  readonly #router:Router = inject(Router);
  room: string = 'default'
  readonly #openSelectorCard = signal(false)
  readonly eventOpenSelectorCard = this.#openSelectorCard.asReadonly();

  getOpenSelectorCard(): boolean {
    return this.eventOpenSelectorCard()
  }

  setOpenSelectorCard(value: boolean) {
    this.#openSelectorCard.set(value)
  }


  httpGetIfUserInsideRoom() {
    if(this.#localStore.getUser() !== null){
      const token = this.#localStore.getUser().token
      this.storeApi.getIfUserInsideRoom(token).subscribe((response: FormatRestApiModels) => {
        if(response !== null){
          if(response.code >= 200 && response.code < 300 && response.data !== null && response.data.sessionStatusGame !== null) {
            if(response.data.sessionStatusGame.status !== 'END'){
              this.localStorage.setGame(response.data.game)
              this.localStorage.setMap(response.data.maps)
              this.localStorage.setCurrentRoom(response.data.sessionStatusGame.room)
              this.localStorage.setSessionStatusGame(response.data.sessionStatusGame)
              if(this.localStorage.getCurrentRoom() !== 'default' &&
                this.localStorage.getGame() !== null &&
                this.localStorage.getSessionStatusGame() !== null &&
                this.localStorage.getMap() !== null &&
                this.localStorage.getUser() !== null
              ){
                this.#storeSocket.joinRoom({
                  room: response.data.sessionStatusGame.room,
                  token: token
                })
                this.room = response.data.sessionStatusGame.room
                this.#router.navigate([`/lobby/${response.data.sessionStatusGame.room}`]);
              }else{
                console.log('sessionStatusGame status END')
              }
            }else{
              console.log('sessionStatusGame status END')
            }
          }else{
            console.log('response code not 200-300', response.code, response.data)
          }
        }else{
          console.log('response null')
        }
      })
    }else{
      console.log('user null')
    }
  }

  // refreshGame(response:Game,pseudo:string,avatar:string){
  //   // let position = Utils.findPlayerIndex(response.teams, pseudo, avatar)
  // }

  refreshSessionStatusGame(response:FormatRestApiModels){

  }

}
