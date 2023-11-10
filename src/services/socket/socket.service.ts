import { EffectRef, inject, Injectable} from "@angular/core";
import {io} from "socket.io-client";
import {Socket} from "socket.io-client";
import {FormatSocketModels, JoinSessionSocket, JoinSessionTeam} from "../../models/formatSocket.models";
import {LocalstorageServices} from "../localsotrage/localstorage.services";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class SocketService {

  private socket: Socket;
  private effectRef: EffectRef | null = null;
  private localStore: LocalstorageServices = inject(LocalstorageServices)
  private router = inject(Router)

  constructor() {
    this.socket = io('http://localhost:3000', {transports: ['websocket']});
  }

  joinDefaultRoom() {
    this.joinRoom({room: 'default', token: this.localStore.getUser().token})
  }

  joinRoom(join: JoinSessionSocket) {
    this.socket.emit('join', join);
    this.joinEvent(join.room)
  }

  joinEvent(room: string) {
    if (room !== 'default') {
      this.socket.on(`${room}`, (data: FormatSocketModels) => {
        if(data.data !== null){
          if(data.data.sessionStatusGame !== null && data.data.sessionStatusGame !== undefined){
            if (
              data.data.sessionStatusGame.room !== null &&
              data.data.game !== null &&
              data.data.map !== null ) {
              this.localStore.setCurrentRoom(data.data.sessionStatusGame.room)
              this.localStore.setGame(data.data.game)
              this.localStore.setMap(data.data.map)
              this.localStore.setSessionStatusGame(data.data.sessionStatusGame)
            } else {
              // this.router.navigate(['/testeurio'])
            }
          }else{
            console.log('error',data)
            // this.router.navigate(['/testeurio'])
          }
        }else{
          this.router.navigate(['/testeurio'])
        }
      });
    } else {
      this.localStore.setCurrentRoom('default')
    }
  }

  joinTeam(join: JoinSessionTeam) {
    this.socket.emit('join-team', join);
  }


}
