import {EffectRef, inject, Injectable} from "@angular/core";
import {io} from "socket.io-client";
import {Socket} from "socket.io-client";
import {
  FormatSocketModels,
  JoinSessionSocket,
  JoinSessionTeam,
  JoinSessionTeamCard
} from "../../models/formatSocket.models";
import {LocalstorageServices} from "../localsotrage/localstorage.services";
import {Router} from "@angular/router";
import {AppServices} from "../../app/app.services";
import {Utils} from "../Utils";
import {UserPosition} from "../../models/users.models";

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
        if (data.data !== null) {
          if (data.data.sessionStatusGame !== null && data.data.sessionStatusGame !== undefined && data.data.sessionStatusGame) {
            if (
              data.data.sessionStatusGame.room !== null &&
              data.data.game !== null &&
              data.data.map !== null) {
              this.localStore.setCurrentRoom(data.data.sessionStatusGame.room)
              this.localStore.setGame(data.data.game)
              this.localStore.setMap(data.data.maps)
              this.localStore.setSessionStatusGame(data.data.sessionStatusGame)
              let position: UserPosition = Utils.findPlayerIndex(this.localStore.getGame().teams, this.localStore.getUser().pseudo, this.localStore.getUser().avatar)
              if (position.teamTag !== -1 && position.cardTag !== -1) {
                this.localStore.setPlayerPosition(position)
              } else {
                console.log('error', data)
              }
              if(this.localStore.getGame().monsters.length > 0){
                this.router.navigate(['/game'])
              }
            } else {
              console.log('error', data)
              // this.router.navigate(['/testeurio'])
            }
          } else {
            console.log('error', data)
            // this.router.navigate(['/testeurio'])
          }
        } else {
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

  joinCard(joinCard:JoinSessionTeamCard){
    this.socket.emit('join-card', joinCard);

  }

  startGame() {
    this.socket.emit('start-game', {room: this.localStore.getCurrentRoom()});
  }
}
