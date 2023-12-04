import {effect, inject, Injectable, signal} from '@angular/core';
import {SessionCreated, SessionCreatedBase, SessionDto, SessionGame} from "../../models/room.content.models";
import {LocalstorageServices} from "../../services/localsotrage/localstorage.services";
import {StoreServicesApi} from "../../services/store-Api/store.services.api";
import {FormatRestApiModels} from "../../models/formatRestApi.models";
import {Maps} from "../../models/maps.models";
import {Router} from "@angular/router";
import {StoreServicesSocket} from "../../services/store-Socket/store.services.socket";
import {AppServices} from "../../app/app.services";
import {JoinSessionSocket} from "../../models/formatSocket.models";
import {SocketEndpoint} from "../../app/socket.endpoint";

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
  private readonly socketEndpointJoin= inject(SocketEndpoint)

  constructor() {
    this.httpGetMaps()
    this.localStore.resetNullAllStorage()
    this.socketEndpointJoin.instanceRoomConnect('CreateSessionUiServices')
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
        if(response.data.game.sessionStatusGame.room !== null){
          console.log('response',response)
          let sessionGame : string = response.data.game.sessionStatusGame.room
          this.socketEndpointJoin.instanceRoomConnect('CreateSessionUiServices->createSession',sessionGame)
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
