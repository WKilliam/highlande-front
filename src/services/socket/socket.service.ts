import {EffectRef, inject, Injectable, signal} from "@angular/core";
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
import {StoreServicesApi} from "../store-Api/store.services.api";
import {FormatRestApiModels} from "../../models/formatRestApi.models";
import {
  logBuilderStatusWarnings
} from "@angular-devkit/build-angular/src/builders/browser-esbuild/builder-status-warnings";

@Injectable({
  providedIn: 'root',
})
export class SocketService {

  private socket: Socket;
  private localStore: LocalstorageServices = inject(LocalstorageServices)
  private storeHttpService = inject(StoreServicesApi)
  private router = inject(Router)

  constructor() {
    this.socket = io('http://localhost:3000', {transports: ['websocket']});
  }

  currentRoom(roomJoin: string | null = null) {
    if (roomJoin !== null) {
      console.log('currentRoom', roomJoin)
      this.localStore.setRoom(roomJoin)
      this.joinRoom({
        room: roomJoin,
        token: this.localStore.getUser().token
      })
    } else {
      if (this.localStore.getSessionStatusGame() !== null) {
        this.storeHttpService
          .getSessions(this.localStore.getSessionStatusGame().room)
          .subscribe((response: FormatRestApiModels) => {
            if (response !== null) {
              console.log('getSessions', response)
              if (response.code >= 200 && response.code < 300) {
                console.log('status 200')
                let roomString: string = response.data.sessionStatusGame.room
                this.localStore.setRoom(roomString)
                console.log('roomString', roomString)
                this.joinRoom({
                  room: roomString,
                  token: this.localStore.getUser().token
                })
              } else {
                if (!this.defaultPart()) {
                  this.localStore.setRoom('default')
                  this.joinRoom({
                    room: 'default',
                    token: this.localStore.getUser().token
                  })
                }
              }
            } else {
              if (!this.defaultPart()) {
                this.localStore.setRoom('default')
                this.joinRoom({
                  room: 'default',
                  token: this.localStore.getUser().token
                })
              }
            }
          })
      } else {
        if (!this.defaultPart()) {
          this.localStore.setRoom('default')
          this.joinRoom({
            room: 'default',
            token: this.localStore.getUser().token
          })
        }
      }
    }
    if (!this.defaultPart()) {
      console.log('joinEvent', this.localStore.getRoom())
      this.joinEvent(this.localStore.getRoom())
    } else {
      console.log('defaultPart', this.localStore.getRoom())
    }
  }

  defaultPart() {
    return this.localStore.getRoom() === 'default';
  }

  socketSecurityConnectToRoom() {
    console.log(this.localStore.getSessionStatusGame())
    if (this.localStore.getSessionStatusGame() !== null) {
      console.log("joinRoom")
      this.joinRoom({room: this.localStore.getSessionStatusGame().room, token: this.localStore.getUser().token})
    } else {
      console.log("joinDefaultRoom")
      this.joinRoom({room: 'default', token: this.localStore.getUser().token})
    }
  }

  joinRoom(join: JoinSessionSocket) {
    this.socket.emit('join', join);
  }

  joinEvent(room: string) {
    this.socket.on(`${room}`, (data: FormatSocketModels) => {
      console.log('data joinEvent', data)
      if (data.code === 200) {
        // this.socketLoadData(data)
        let sessionDiff = Utils.jsonDifference(data.data.game?.sessionStatusGame, this.localStore.getSessionStatusGame())
        let gameDiff = Utils.jsonDifference(data.data.game?.game, this.localStore.getGame())
        let mapDiff = Utils.jsonDifference(data.data.game?.maps, this.localStore.getMap())
        sessionDiff ? this.localStore.setSessionStatusGame(data.data.game?.sessionStatusGame) : console.log('no difference session')
        gameDiff ? this.localStore.setGame(data.data.game?.game) : console.log('no difference game')
        mapDiff ? this.localStore.setMap(data.data.game?.maps) : console.log('no difference map')
        console.log('session', this.localStore.getSessionStatusGame())
        console.log('game', this.localStore.getGame())
        console.log('map', this.localStore.getMap())
        if (this.localStore.getGame() !== null) {
          let position = Utils.findPlayerIndex(
            this.localStore.getGame().teams,
            this.localStore.getUser().pseudo,
            this.localStore.getUser().avatar)
          let positionDiff = Utils.jsonDifference(position, this.localStore.getPlayerPosition())
          positionDiff ? this.localStore.setPlayerPosition(position) : console.log('no difference position')
          switch (data.data.game?.sessionStatusGame?.status) {
            case 'LOBBY':
              if (this.localStore.getSessionStatusGame() !== null && this.localStore.getMap() !== null && this.localStore.getGame() !== null) {
                this.router.navigate([`/lobby/${data.data.game?.sessionStatusGame?.room}`]);
              } else {
                console.log('error session or map or game null')
                this.router.navigate([`/testeurio`]);
              }
              break;
            case 'GAME':
              if (this.localStore.getSessionStatusGame() !== null && this.localStore.getMap() !== null && this.localStore.getGame() !== null) {
                this.router.navigate([`/game`]);
              } else {
                console.log('error session or map or game null')
                this.router.navigate([`/testeurio`]);
              }
              break;
            default:
              console.log('error status not found', data.data.game?.sessionStatusGame?.status)
              this.router.navigate([`/testeurio`]);
          }
        } else {
          console.log('game null')
        }
      } else {
        console.log('data null or code not 200-299', data)
      }
    });
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
      default:
        console.log('error status not found', sessionGame.status)
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

  createTurnList() {
    console.log('createTurnList', this.localStore.getSessionStatusGame().room)
    this.socket.emit('createTurnList', {
      room: this.localStore.getSessionStatusGame().room
    });
  }

  whoIsTurn(room: string) {
    this.socketSecurityConnectToRoom()
    console.log('whoIsTurn', room)
    this.socket.emit('whoIsTurn', {room: room});
  }

  startTurn(data: SocketTurn) {
    this.socketSecurityConnectToRoom()
    this.socket.emit('startTurn', data);
  }

  sendDice(data: SocketTurn) {
    this.socketSecurityConnectToRoom()
    this.socket.emit('sendDice', data);
  }

  chooseMove(data: SocketTurn) {
    this.socketSecurityConnectToRoom()
    this.socket.emit('chooseMove', data);
  }

  endMove(data: SocketTurn) {
    this.socketSecurityConnectToRoom()
    this.socket.emit('endMove', data);
  }

  endTurn(data: SocketTurn) {
    this.socketSecurityConnectToRoom()
    this.socket.emit('endTurn', data);
  }


}
