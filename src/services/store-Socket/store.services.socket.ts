import {inject, Injectable} from "@angular/core";
import {SocketService} from "../socket/socket.service";
import {SocketJoinSession, SocketJoinTeamCard} from "../../models/socket.models";
import {BehaviorSubject} from "rxjs";
import {PartiesModelsJson} from "../../models/parties.models";

@Injectable({
  providedIn: 'root',
})
export class StoreServicesSocket {

  readonly socket: SocketService = inject(SocketService);
  // private alerteSubject = new BehaviorSubject<string>('');
  // alert$: Observable<string> = this.alerteSubject.asObservable();
  private messageSubject = new BehaviorSubject<PartiesModelsJson | null>(null);
  // message$: BehaviorSubject<PartiesModelsJson | null> = this.messageSubject.asObservable();


  joinSessionDefaultEvent() {
    this.socket.joinDefaultRoom();
  }

  appReceivedConnectedEvent(gameKey: string) {
    this.socket.appConnectedEvent(gameKey);
  }

  joinSessionEvent(socketJoinSession:SocketJoinSession) {
    return this.socket.joinRoom(socketJoinSession);
  }

  joinTeamEvent(socketJoinTeamCard: SocketJoinTeamCard) {
    return this.socket.joinTeamCard(socketJoinTeamCard);
  }
}
