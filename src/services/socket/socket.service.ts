import {EffectRef, inject, Injectable} from "@angular/core";
import {io} from "socket.io-client";
import {Socket} from "socket.io-client";
import {
  CurrentTurnAction,
  FormatSocketModels,
  JoinSessionSocket,
  JoinSessionTeam,
  JoinSessionTeamCard, SocketTurn
} from "../../models/formatSocket.models";
import {LocalstorageServices} from "../localsotrage/localstorage.services";
import {Router} from "@angular/router";
import {Utils} from "../Utils";
import {UserPosition} from "../../models/users.models";
import {Game, SessionGame, SessionStatusGame} from "../../models/room.content.models";
import {Maps} from "../../models/maps.models";

@Injectable({
  providedIn: 'root',
})
export class SocketService {

  private socket: Socket;
  private localStore: LocalstorageServices = inject(LocalstorageServices)
  private router = inject(Router)

  constructor() {
    this.socket = io('http://localhost:3000', {transports: ['websocket']});
  }

  socketSecurityConnectToRoom(){
    this.socket
  }

  socketLoadData(data: FormatSocketModels) {
    const sessionGame = data.data.game?.sessionStatusGame ?? null
    const game = data.data.game?.game ?? null
    const map = data.data.game?.maps ?? null
    console.log('sessionGame', sessionGame)
    console.log('game', game)
    console.log('map', map)
    this.localStore.setSessionStatusGame(sessionGame)
    const roomString: string = sessionGame?.room ?? 'none'
    this.localStore.setGame(game)
    this.localStore.setMap(map)
    let position = Utils.findPlayerIndex(
      this.localStore.getGame().teams,
      this.localStore.getUser().pseudo,
      this.localStore.getUser().avatar)
    if (position.teamTag !== -1 && position.cardTag !== -1) {
      this.localStore.setPlayerPosition(position)
    }
    switch (sessionGame.status) {
      case 'LOBBY':
        this.router.navigate([`/lobby/${sessionGame.room}`]);
        break;
      case 'GAME':
        this.router.navigate([`/game`]);
        break;
      default:
        console.log('error status not found', sessionGame.status)
    }

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
        console.log('data joinEvent', data)
        if (data.code === 200) {
          this.socketLoadData(data)
        } else {
          console.log('data null or code not 200-299', data)
        }
      });
    } else {
      console.log('error room default')
    }
  }

  joinTeam(join: JoinSessionTeam) {
    this.socket.emit('join-team', join);
    this.joinEvent(join.room)
  }

  joinCard(joinCard: JoinSessionTeamCard) {
    this.socket.emit('join-card', joinCard);
    this.joinEvent(joinCard.room)
  }

  socketLoadDataTurn(data: FormatSocketModels) {
    const sessionGame = data.data.game?.sessionStatusGame ?? null
    const game = data.data.game?.game ?? null
    console.log('sessionGame', sessionGame)
    console.log('game', game)
    this.localStore.setSessionStatusGame(sessionGame)
    this.localStore.setGame(game)
  }

  eventTurn(room: string) {
    this.socket.on(`${room}-turn`, (data: FormatSocketModels) => {
      console.log('data eventTurn', data)
      if (data.code === 200) {
        this.socketLoadDataTurn(data)
      } else {
        console.log('data null or code not 200-299', data)
      }
    });
  }

  createTurnList() {
    this.socket.emit('createTurnList', {room: this.localStore.getSessionStatusGame().room});
    this.joinEvent(this.localStore.getSessionStatusGame().room)
  }

  whoIsTurn(room: string) {
    console.log('whoIsTurn', room)
    this.socket.emit('whoIsTurn', {room: room});
    this.eventTurn(room)
  }

  startTurn(data: SocketTurn) {
    this.socket.emit('startTurn', data);
    this.eventTurn(data.room)
  }

  sendDice(data: SocketTurn) {
    this.socket.emit('sendDice', data);
    this.eventTurn(data.room)
  }

  chooseMove(data: SocketTurn) {
    this.socket.emit('chooseMove', data);
    this.eventTurn(data.room)
  }

  endMove(data: SocketTurn) {
    this.socket.emit('endMove', data);
    this.eventTurn(data.room)
  }

  endTurn(data: SocketTurn) {
    this.socket.emit('endTurn', data);
    this.eventTurn(data.room)
  }


}
