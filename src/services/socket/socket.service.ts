import {inject, Injectable} from "@angular/core";
import {io, Socket} from "socket.io-client";
import {StorageManagerApp} from "../storageManagerApp/storageManagerApp";
import {deburr} from "lodash";
import {UserCanJoin, UserIdentitiesGame, UserSocketConnect} from "../../models/users.models";
import {Utils} from "../utils";
import {FormatRestApi} from "../../models/formatRestApi";
import {SessionModels} from "../../models/session.models";
import {Router} from "@angular/router";
import {UtilsSocketReceived} from "../dispatchers/dispatcher-socket/utils.socket.received";


@Injectable({
  providedIn: 'root',
})
export class SocketService {

  private socket: Socket;
  readonly #storageManagerApp = inject(StorageManagerApp);
  readonly #router = inject(Router)

  constructor() {
    this.socket = io('http://localhost:3000', {transports: ['websocket']});
  }

  socketCallReceived() {
    const room = this.#storageManagerApp.getRoom()
    this.socket.onAny((eventName, ...args) => {
      const argsOjb: FormatRestApi = args[0]
      switch (eventName) {
        case `${args[0].data.game.sessionStatusGame.room}-join`:
          console.log('join step', argsOjb)
          console.log(this.#storageManagerApp.getSession().sessionStatusGame.room)
          UtilsSocketReceived.receivedJoinStep(argsOjb,this.#storageManagerApp,this.#router)
          break
        case `${room}-join`:
          console.log('join', argsOjb)
          UtilsSocketReceived.receivedJoin(argsOjb,this.#storageManagerApp,this.#router)
          break
        case `${room}-join-team`:
          console.log('join-team', argsOjb)
          UtilsSocketReceived.receivedJoinTeam(argsOjb,this.#storageManagerApp,this.#router)
          break
      }
    });
  }

  // check with call can-join if user inside session this  methode return session but if user not inside session this methode return message
  connect() {
    const user : UserSocketConnect = {
      token: this.#storageManagerApp.getUser().token,
      pseudo: this.#storageManagerApp.getUser().pseudo,
      avatar: this.#storageManagerApp.getUser().avatar,
      room: this.#storageManagerApp.getRoom(),
      cards: this.#storageManagerApp.getUser().cards
    }
    this.joinSession(user)
  }

  joinSession(user: UserSocketConnect) {
    this.socket.emit('join', user);
    this.socketCallReceived()
  }

  joinTeam(user: UserIdentitiesGame) {
    this.socket.emit('join-team', user);
    this.socketCallReceived()
  }

  selectCard(data: UserIdentitiesGame) {
    this.socket.emit('join-team-card', data);
    this.socketCallReceived()
  }
}
