import {inject, Injectable} from "@angular/core";
import {ApiServices} from "../api/api.services";
import {SessionGamePlace, SessionModelRequest} from "../../models/sessions";
import {SocketService} from "../socket/socket.service";
import {StoreServicesApi} from "../store-Api/store.services.api";
import {FormatModel} from "../../models/format.model";

@Injectable({
  providedIn: 'root',
})
export class StoreServicesSocket {

  readonly socket: SocketService = inject(SocketService);

  joinSessionDefaultEvent() {
    this.socket.joinDefaultRoom();
  }

  appReceivedConnectedEvent(gameKey: string) {
    return this.socket.appConnectedEvent(gameKey);
  }

  joinSessionEvent(gameKey: string) {
    return this.socket.joinRoom(gameKey);
  }

}
