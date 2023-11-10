import {inject, Injectable} from "@angular/core";
import {SocketService} from "../socket/socket.service";
import {Router} from "@angular/router";
import {JoinSessionSocket, JoinSessionTeam} from "../../models/formatSocket.models";

@Injectable({
  providedIn: 'root',
})
export class StoreServicesSocket {

  private router = inject(Router)
  private readonly socket: SocketService = inject(SocketService);

  joinDefaultRoom(){
    this.socket.joinDefaultRoom()
  }

  joinRoom(join: JoinSessionSocket) {
    this.socket.joinRoom(join);
  }

  joinEvent(room: string) {
    this.socket.joinEvent(room)
  }

  joinTeam(join: JoinSessionTeam) {
    this.socket.joinTeam(join)
  }


}
