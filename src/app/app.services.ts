import {effect, inject, Injectable, signal} from "@angular/core";
import {StoreServicesSocket} from "../services/store-Socket/store.services.socket";
import {LocalstorageServices} from "../services/localsotrage/localstorage.services";
import {FormatRestApiModels} from "../models/formatRestApi.models";
import {StoreServicesApi} from "../services/store-Api/store.services.api";
import {Router} from "@angular/router";
import {Utils} from "../services/Utils";
import {Game, SessionStatusGame} from "../models/room.content.models";
import {UserPosition} from "../models/users.models";
import {SocketEndpoint} from "./socket.endpoint";

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

  private readonly socketEndpoint= inject(SocketEndpoint)

  constructor(){
    this.socketEndpoint.instanceRoomConnect('AppServices')
  }

  getRoom(): string {
    return this.#room()
  }

  setRoom(value: string) {
    this.#room.set(value)
  }

  getOpenSelectorCard(): boolean {
    return this.eventOpenSelectorCard()
  }

  setOpenSelectorCard(value: boolean) {
    this.#openSelectorCard.set(value)
  }

}
