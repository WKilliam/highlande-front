import {inject, Injectable, signal} from "@angular/core";
import {io, Socket} from "socket.io-client";
import {
  CurrentTurnAction,
  FormatSocketModels,
  JoinSessionSocket,
  JoinSessionTeam,
  JoinSessionTeamCard
} from "../../models/formatSocket.models";
import {LocalstorageServices} from "../localsotrage/localstorage.services";
import {Router} from "@angular/router";
import {Utils} from "../Utils";
import {StoreServicesApi} from "../store-Api/store.services.api";
import {FormatRestApiModels} from "../../models/formatRestApi.models";
import {Can} from "../../models/emus";
import {Game, Session, SessionGame, TurnListEntity} from "../../models/room.content.models";
import {Maps} from "../../models/maps.models";

@Injectable({
  providedIn: 'root',
})
export class SocketService {

  private socket: Socket;
  private localStore: LocalstorageServices = inject(LocalstorageServices)
  private storeHttpService = inject(StoreServicesApi)
  private router = inject(Router)
  private sessionDTOMap: Map<string, Session> = new Map();

  readonly #mapForBot = signal<Map<string, Session>>(new Map<string, Session>())
  readonly #eventMapForBot = this.#mapForBot.asReadonly()

  constructor() {
    this.socket = io('http://localhost:3000', {transports: ['websocket']});
  }

  currentRoom(roomJoin: string | null = null) {
    if (roomJoin !== null) {
      this.localStore.setRoom(roomJoin)
    } else {
      if (this.localStore.getSessionStatusGame() !== null) {
        this.storeHttpService
          .getSessions(this.localStore.getSessionStatusGame().room)
          .subscribe((response: FormatRestApiModels) => {
            if (response !== null) {
              if (response.code >= 200 && response.code < 300) {
                let roomString: string = response.data.sessionStatusGame.room
                this.localStore.setRoom(roomString)
              } else {
                if (!this.defaultPart()) {
                  this.localStore.setRoom('default')
                }
              }
            } else {
              if (!this.defaultPart()) {
                this.localStore.setRoom('default')
              }
            }
          })
      } else {
        if (!this.defaultPart()) {
          this.localStore.setRoom('default')
        }
      }
    }
    if (!this.defaultPart() && this.localStore.getRoom() !== null) {
      this.getRoom()
      this.joinEvent(this.localStore.getRoom())
    } else {
      this.joinRoom({
        room: this.localStore.getRoom(),
        token: this.localStore.getUser().token
      })
    }
  }

  defaultPart() {
    return this.localStore.getRoom() === 'default';
  }

  getRoom() {
    this.joinRoom({
      room: this.localStore.getRoom(),
      token: this.localStore.getUser().token
    })
    this.socket.emit('room', this.localStore.getRoom());
    this.socket.on(`room-${this.localStore.getRoom()}`, (data) => {
      if (data !== 'default') {
        if (this.localStore.getRoom() !== data) {
          this.localStore.setRoom(data)
        }
      } else if (data === 'default') {
        if (this.localStore.getRoom() !== 'default') {
          this.localStore.setRoom('default')
        }
      } else {
        console.log('error data', data)
      }
    })
  }

  joinRoom(join: JoinSessionSocket) {
    this.socket.emit('join', join);
  }

  joinEvent(room: string) {
    this.socket.on(`${room}`, (data: FormatSocketModels) => {
      if (data.code === 200) {
        let sessionDiff = Utils.jsonDifference(data.data.game?.sessionStatusGame, this.localStore.getSessionStatusGame())
        let gameDiff = Utils.jsonDifference(data.data.game?.game, this.localStore.getGame())
        let mapDiff = Utils.jsonDifference(data.data.game?.maps, this.localStore.getMap())
        sessionDiff ? this.localStore.setSessionStatusGame(data.data.game?.sessionStatusGame) : false
        gameDiff ? this.localStore.setGame(data.data.game?.game) : false
        mapDiff ? this.localStore.setMap(data.data.game?.maps) : false
        if (this.localStore.getGame() !== null) {
          let position = Utils.findPlayerIndex(
            this.localStore.getGame().teams,
            this.localStore.getUser().pseudo,
            this.localStore.getUser().avatar)
          let positionDiff = Utils.jsonDifference(position, this.localStore.getPlayerPosition())
          positionDiff ? this.localStore.setPlayerPosition(position) : false
          switch (data.data.game?.sessionStatusGame?.status) {
            case 'LOBBY':
              if (this.localStore.getSessionStatusGame() !== null && this.localStore.getMap() !== null && this.localStore.getGame() !== null) {
                this.router.navigate([`/lobby/${data.data.game?.sessionStatusGame?.room}`]);
              } else {
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


  /**
   * Turn
   */

  botTurnSuccessSend() {
    this.socket.emit('botTurn', {
      room: this.localStore.getSessionStatusGame().room,
      seconds: 50,
      entityTurn: {
        turnEntity: this.localStore.getSessionStatusGame().entityTurn[0],
        dice: 0,
        moves: [],
        move: {
          x: 0,
          y: 0,
          z: 0,
        },
        currentAction: Can.WHO_IS_TURN
      }
    })
    this.extract()
  }

  humainTurnSuccessSend(humainAction: CurrentTurnAction) {
    this.socket.emit('humainTurn', {
      room: this.localStore.getRoom(),
      action: humainAction
    })
    this.extract()
  }

  private extract() {
    this.socket.onAny((eventName, ...args) => {
      if (eventName === `${this.localStore.getRoom()}-turn`) {
        let sessionDto: FormatRestApiModels = args[0]
        console.log('sessionDto', sessionDto.data.game.sessionStatusGame.currentTurnEntity.currentAction)
        this.addElementMap(sessionDto.data.game.sessionStatusGame.currentTurnEntity.currentAction, sessionDto.data)
      }
    });
  }

  /**
   * Map
   */

  getMap() {
    return this.#eventMapForBot()
  }

  addElementMap(key: string, value: Session) {
    this.#mapForBot.update((map) => {
      map.set(key, value)
      return map
    })
  }

  setMap(map: Map<string, Session>) {
    this.#mapForBot.set(map)
  }
}
