import {inject, Injectable} from "@angular/core";
import {StoreServicesSocket} from "../services/store-Socket/store.services.socket";
import {LocalstorageServices} from "../services/localsotrage/localstorage.services";
import {FormatRestApiModels} from "../models/formatRestApi.models";
import {StoreServicesApi} from "../services/store-Api/store.services.api";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class AppComponentServices {

  readonly #storeServicesSocket:StoreServicesSocket = new StoreServicesSocket();
  readonly localStorage :LocalstorageServices= inject(LocalstorageServices)
  readonly #localStore: LocalstorageServices = inject(LocalstorageServices);
  readonly storeApi: StoreServicesApi = inject(StoreServicesApi);
  readonly #storeSocket: StoreServicesSocket = inject(StoreServicesSocket);
  readonly #router = inject(Router);

  constructor() {
    if(this.localStorage.getCurrentRoom() !== null ){
      this.#storeServicesSocket.joinDefaultRoom()
    }
  }

  httpGetIfUserInsideRoom() {
    const token = this.#localStore.getUser().token
    this.storeApi.getIfUserInsideRoom(token).subscribe((response: FormatRestApiModels) => {
      if (response.code >= 200 && response.code < 300) {
        if(response.data !== null) {
          if(response.data.sessionStatusGame.status !== 'END'){
            this.#localStore.setCurrentRoom(response.data.sessionStatusGame.room)
            this.#localStore.setSessionStatusGame(response.data.sessionStatusGame)
            this.#localStore.setGame(response.data.game)
            this.#localStore.setMap(response.data.maps)
            this.#storeSocket.joinRoom({room: response.data.sessionStatusGame.room, token: token})
            this.#router.navigate([`/lobby/${response.data.sessionStatusGame.room}`]);
          }
        }else{
          this.#router.navigate(['/testeurio']);
        }
      } else {
        console.log(response)
      }
    })
  }
}
