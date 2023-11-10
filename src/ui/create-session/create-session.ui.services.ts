import {inject, Injectable, signal} from '@angular/core';
import {SessionCreatedBase} from "../../models/room.content.models";
import {LocalstorageServices} from "../../services/localsotrage/localstorage.services";
import {StoreServicesApi} from "../../services/store-Api/store.services.api";
import {FormatRestApiModels} from "../../models/formatRestApi.models";
import {Maps} from "../../models/maps.models";
import {Router} from "@angular/router";
import {StoreServicesSocket} from "../../services/store-Socket/store.services.socket";
import {AppComponentServices} from "../../app/app.component.services";

@Injectable({
  providedIn: 'root',
})
export class CreateSessionUiServices {

  readonly appComponentServices: AppComponentServices = inject(AppComponentServices);
  readonly storeApi: StoreServicesApi = inject(StoreServicesApi);
  readonly #map = signal<Array<Maps>>([])
  readonly eventMaps = this.#map.asReadonly();

  constructor() {
    this.appComponentServices.httpGetIfUserInsideRoom()
    this.httpGetMaps()
  }



  httpGetMaps() {
    this.storeApi.getMaps().subscribe((response: FormatRestApiModels) => {
      if (response.code >= 200 && response.code < 300) {
        this.#map.set(response.data)
      } else {
        console.log(response)
      }
    })
  }

  createSession(sessionBody: SessionCreatedBase) {
    this.storeApi.createSession(sessionBody).subscribe((response: FormatRestApiModels) => {
      console.log(response)
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
