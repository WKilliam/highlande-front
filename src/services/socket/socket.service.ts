import {inject, Injectable} from "@angular/core";
import {io, Socket} from "socket.io-client";
import {StorageManagerApp} from "../storageManagerApp/storageManagerApp";
import {UserIdentitiesGame, UserSocketConnect} from "../../models/users.models";
import {Utils} from "../utils";
import {FormatRestApi} from "../../models/formatRestApi";
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root',
})
export class SocketService {

  private socket: Socket;
  readonly #storageManagerApp = inject(StorageManagerApp);
  readonly #router = inject(Router)

  constructor() {
    // this.socket = io('http://localhost:3000', {transports: ['websocket']});
    this.socket = io('http://195.154.114.37:3000', {transports: ['websocket']});
  }

  socketCallReceived() {
    const room = this.#storageManagerApp.getRoom()
    const pseudo = this.#storageManagerApp.getUser().pseudo
    this.socket.onAny((eventName, ...args) => {
      const argsOjb: any = args[0]
      switch (eventName) {
        case `${pseudo}-whats`:
          console.log(`${pseudo}-whats`, argsOjb)
          break
        case `${pseudo}-join`:
          console.log(`${pseudo}-join`, argsOjb)
          // UtilsSocketReceived.receivedDefault(argsOjb, this.#storageManagerApp, this.#router)
          this.#storageManagerApp.setConnectRoom(false)
          const isNotValidpseudo = Utils.codeErrorChecking(argsOjb.code)
          if (isNotValidpseudo) { // error
            this.#storageManagerApp.setAlerte(argsOjb)
            this.#router.navigate(['/testeurio'])
          } else { // valid
            console.log('default-join', argsOjb)
            if (argsOjb.data.game.sessionStatusGame.room !== 'default') {
              console.log('room equal default', argsOjb.data.game.sessionStatusGame.room)
              this.#storageManagerApp.setSessionAndLinkStorage(argsOjb.data.game)
              this.#storageManagerApp.setConnectRoom(true)
              const user: UserSocketConnect = {
                token: this.#storageManagerApp.getUser().token,
                pseudo: this.#storageManagerApp.getUser().pseudo,
                room: this.#storageManagerApp.getRoom()
              }
              this.socket.emit('join-room', user);
              this.#router.navigate([`/lobby/${argsOjb.data.game.sessionStatusGame.room}`])
            } else {
              console.log('room not equal default', argsOjb.data.game.sessionStatusGame.room)
              this.#storageManagerApp.setSessionAndLinkStorage(argsOjb.data.game)
              this.#router.navigate(['/testeurio'])
            }
          }
          break
        case `${room}-join`:
          console.log(`${room}-join`, argsOjb)
          const isNotValidjoin = Utils.codeErrorChecking(argsOjb.code)
          if (isNotValidjoin) { // error
            this.#storageManagerApp.setAlerte(argsOjb)
            this.#router.navigate(['/testeurio'])
          } else { // valid
            this.#storageManagerApp.setSessionAndLinkStorage(argsOjb.data.game)
            this.#router.navigate([`/lobby/${argsOjb.data.game.sessionStatusGame.room}`])
          }
          break
        case `${room}-join-team`:
          console.log(`${room}-join-team`, argsOjb)
          const isNotValidteam = Utils.codeErrorChecking(argsOjb.code)
          if (isNotValidteam) { // error
            this.#storageManagerApp.setAlerte(argsOjb)
          } else { // valid
            console.log('join-team', argsOjb)
            this.#storageManagerApp.setSessionAndLinkStorage(argsOjb.data.game)
          }
          break
        case `${room}-join-team-card`:
          console.log(`${room}-join-team-card`, argsOjb)
          const isNotValidcard = Utils.codeErrorChecking(argsOjb.code)
          if (isNotValidcard) { // error
            this.#storageManagerApp.setAlerte(argsOjb)
          } else { // valid
            console.log('join-team-card', argsOjb)
            this.#storageManagerApp.setSessionAndLinkStorage(argsOjb.data.game)
          }
          break
        case `${room}-init-chrono-start`:
          if(argsOjb === true){
            console.log(`${room}-init-chrono-start`, argsOjb)
            console.log('move to game')
          }else{
            console.log(`${room}-init-chrono-start`, argsOjb)
            this.#storageManagerApp.setTimer(argsOjb)
          }
          break
      }
    });
  }

  // check with call can-join if user inside session this  methode return session but if user not inside session this methode return message
  connect() {
    const user: UserSocketConnect = {
      token: this.#storageManagerApp.getUser().token,
      pseudo: this.#storageManagerApp.getUser().pseudo,
      room: this.#storageManagerApp.getRoom()
    }
    console.log('connect', user)
    if (this.#storageManagerApp.getConnectRoomStore() && this.#storageManagerApp.getRoom() !== 'default') {
      this.socket.emit('join-room', this.#storageManagerApp.getRoom());
      this.socketCallReceived()
    } else {
      this.socket.emit('default-join', user);
      this.socketCallReceived()
    }
  }

  joinRoom() {
    const user: UserSocketConnect = {
      token: this.#storageManagerApp.getUser().token,
      pseudo: this.#storageManagerApp.getUser().pseudo,
      room: this.#storageManagerApp.getRoom()
    }
    if (this.#storageManagerApp.getRoom() !== 'default') {
      this.socket.emit('join-room', this.#storageManagerApp.getRoom());
      this.socketCallReceived()
    } else {
      this.socket.emit('default-join', user);
      this.socketCallReceived()
    }
  }

  joinSession(user: UserSocketConnect) {
    this.socket.emit('join-session', user);
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

  startGame() {
    console.log('startGame', this.#storageManagerApp.getRoom())
    this.socket.emit('init-game', {room:this.#storageManagerApp.getRoom()});
    this.socketCallReceived()
  }
}
