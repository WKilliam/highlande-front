import {effect, inject, Injectable, signal} from '@angular/core';
import {SessionCreated, SessionCreatedBase} from "../../models/room.content.models";
import {LocalstorageServices} from "../../services/localsotrage/localstorage.services";
import {StoreServicesApi} from "../../services/store-Api/store.services.api";
import {FormatRestApiModels} from "../../models/formatRestApi.models";
import {Maps} from "../../models/maps.models";
import {Router} from "@angular/router";
import {StoreServicesSocket} from "../../services/store-Socket/store.services.socket";
import {AppServices} from "../../app/app.services";
import {JoinSessionSocket} from "../../models/formatSocket.models";

@Injectable({
  providedIn: 'root',
})
export class CreateSessionUiServices {

  readonly appServices: AppServices = inject(AppServices);
  readonly storeApi: StoreServicesApi = inject(StoreServicesApi);
  readonly storeSocket: StoreServicesSocket = inject(StoreServicesSocket);
  readonly #map = signal<Array<Maps>>([])
  readonly eventMaps = this.#map.asReadonly();
  readonly localStore: LocalstorageServices = inject(LocalstorageServices)
  readonly router = inject(Router)

  constructor() {
    this.httpGetMaps()
    this.appServices.httpGetIfUserInsideRoom()
    effect(() => {
      if(this.localStore.getSessionStatusGame() !== null){
        this.appServices.httpGetIfUserInsideRoom()
      }
    })
  }

  httpGetMaps() {
    this.storeApi.getMaps().subscribe((response: FormatRestApiModels) => {
      if (response.code >= 200 && response.code < 300) {
        this.#map.set(response.data)
      } else {
        console.log("getMap",response)
      }
    })
  }

  createSession(sessionBody: SessionCreatedBase) {
    console.log("sessionBody",sessionBody)
    let session : SessionCreated = {
      name:sessionBody.name,
      mapId:sessionBody.mapId,
      password:sessionBody.password,
      teamNames:[]
    }
    session.teamNames.push(sessionBody.teamOneName)
    session.teamNames.push(sessionBody.teamTwoName)
    session.teamNames.push(sessionBody.teamThreeName)
    session.teamNames.push(sessionBody.teamFourName)
    this.storeApi.createSession(session).subscribe((response: FormatRestApiModels) => {
      if(response.code >= 200 && response.code < 300) {
        if(response.data.sessionStatusGame.room !== null){
          let joinSessionSocket:JoinSessionSocket = {
            room:response.data.sessionStatusGame.room,
            token:this.localStore.getUser().token
          }
          this.storeSocket.joinRoom(joinSessionSocket)
        }else{
          console.log('error',response)
        }
      } else {
        console.log('error',response)
      }
    })
  }

  getMap() {
    let maps: Array<Maps> = this.eventMaps()
    if (maps === null) {
      return []
    } else {
      return maps
    }
  }


}
