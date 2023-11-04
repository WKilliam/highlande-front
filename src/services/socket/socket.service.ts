import {effect, inject, Injectable, OnInit, signal} from "@angular/core";
import {io} from "socket.io-client";
import {SocketFormatModel, SocketJoinSession, SocketJoinTeamCard} from "../../models/socket.models";
import {LocalstorageServices} from "../localsotrage/localstorage.services";
import {Socket} from "socket.io-client";
import {FormatModel} from "../../models/format.model";

@Injectable({
  providedIn: 'root',
})
export class SocketService {

  private socket: Socket;

  readonly #eventDefaultRoom = signal<SocketFormatModel | null>(null)
  readonly #eventAnotherRoom = signal<SocketFormatModel | null>(null)

  readonly eventDefaultRoom = this.#eventDefaultRoom.asReadonly()
  readonly eventAnotherRoom = this.#eventAnotherRoom.asReadonly()

  constructor() {
    this.socket = io('http://localhost:3000', {transports: ['websocket']});
    this.joinDefaultRoom()
  }

  getEventDefaultRoom() {
    return this.eventDefaultRoom
  }

  getEventAnotherRoom() {
    return this.eventAnotherRoom
  }

  joinDefaultRoom(defaultRoom: string = 'default') {
    this.socket.emit('session-default', {});
  }

  defaultRoomEvent() {
    this.socket.on('session-default', (data: SocketFormatModel) => {
      this.#eventDefaultRoom.update(()=>data)
    });
  }

  joinRoom(socketJoinSession: SocketJoinSession) {
    this.socket.emit('join-session', socketJoinSession);
  }

  anotherRoomEvent(room: string) {
    this.socket.on(`${room}`, (data: SocketFormatModel) => {
      this.#eventAnotherRoom.update(()=>data)
    });
  }

  selectPlaceTeam(socketJoinTeamCard: SocketJoinTeamCard) {
    this.socket.emit('select-place-team', socketJoinTeamCard);
  }

}
