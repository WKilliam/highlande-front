import {inject, Injectable, signal} from "@angular/core";
import {io, Socket} from "socket.io-client";
import {StorageManagerApp} from "../storageManagerApp/storageManagerApp";
import {UserGamePlay, UserIdentitiesGame, UserSocketConnect} from "../../models/users.models";
import {Utils} from "../utils";
import {FormatRestApi} from "../../models/formatRestApi";
import {Router} from "@angular/router";
import {DiceRolling} from "../../models/room.content.models";
import {Cells, MapsModels} from "../../models/maps.models";


@Injectable({
  providedIn: 'root',
})
export class SocketService {

  private socket: Socket;
  readonly #storageManagerApp = inject(StorageManagerApp);
  readonly #router = inject(Router)


  constructor() {
    // this.socket = io('http://localhost:3000', {transports: ['websocket']});
    this.socket = io(
      'http://195.154.114.37:3000'
      // 'http://localhost:3000'
      , {
      transports: ['websocket'],
      // reconnection: true, // Activer la reconnexion automatique
      // reconnectionAttempts: Infinity, // Nombre infini de tentatives de reconnexion
      // reconnectionDelay: 1000, // Délai avant de tenter une reconnexion
    });
    this.socketCallReceived();
  }

  socketCallReceived() {
    const room = this.#storageManagerApp.getRoom()
    const pseudo = this.#storageManagerApp.getUser().pseudo
    this.socket.onAny((eventName, ...args) => {
      const argsOjb: any = args[0]
      switch (eventName) {
        case `${pseudo}-join`:
          console.log(`${pseudo}-join`, argsOjb)
          this.#storageManagerApp.setConnectRoom(false)
          const isNotValidpseudo = Utils.codeErrorChecking(argsOjb.code)
          if (isNotValidpseudo) { // error
            this.#storageManagerApp.setAlerte(argsOjb)
            this.#router.navigate(['/testeurio'])
          } else { // valid
            // console.log('default-join', argsOjb)
            if (argsOjb.data.game.sessionStatusGame.room !== 'default') {
              this.#storageManagerApp.setSessionAndLinkStorage(argsOjb.data.game)
              this.#storageManagerApp.setConnectRoom(true)
              const user: UserSocketConnect = {
                token: this.#storageManagerApp.getUser().token,
                pseudo: this.#storageManagerApp.getUser().pseudo,
                room: this.#storageManagerApp.getRoom()
              }
              this.socket.emit('join-room', user);
              if(argsOjb.data.game.game.challenger.length > 3 && argsOjb.data.game.sessionStatusGame.status === 'GAME'){
                // this.initChronoGame()
                this.#router.navigate([`/game/${argsOjb.data.game.sessionStatusGame.room}`])
              }else{
                this.#router.navigate([`/lobby/${argsOjb.data.game.sessionStatusGame.room}`])
              }
            } else {
              // console.log('room not equal default', argsOjb.data.game.sessionStatusGame.room)
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
          console.log(`${room}-init-chrono-start`, argsOjb)
          if(argsOjb.start === true){
            // console.log(`${room}-init-chrono-start`, argsOjb)
            console.log(`data`, argsOjb)
            this.#storageManagerApp.setSessionAndLinkStorage(argsOjb.session.data.game)
            this.#router.navigate([`/game/${room}`])
          }else{
            console.log(`${room}-init-chrono-start`, argsOjb)
            this.#storageManagerApp.setTimer(argsOjb)
          }
          break
        case `${room}-init-chrono-start-game`:
          console.log(`${room}-init-chrono-start-game`, argsOjb)
          this.#storageManagerApp.setTimer(argsOjb)

          // this.#storageManagerApp.setSessionAndLinkStorage(argsOjb.data.game)
          // this.#router.navigate([`/game/${room}`])
          break
        case `${room}-rolling`:
          console.log(`${room}-dice-rolling`, argsOjb)
          this.#storageManagerApp.setDiceRollingValue(argsOjb.data)
          break
        case `${room}-game`:
          console.log(`${room}-game`, argsOjb)
          this.#storageManagerApp.setSessionAndLinkStorage(argsOjb.data.game)
          this.#router.navigate([`/game/${room}`])
          break
        case `${room}-game-humain`:
          console.log(`${room}-game-humain`, argsOjb)
          this.#storageManagerApp.setSessionAndLinkStorage(argsOjb.data.game)
          this.#router.navigate([`/game/${room}`])
          break
        case `${room}-game-bot`:
          console.log(`${room}-game-bot`, argsOjb)
          this.#storageManagerApp.setSessionAndLinkStorage(argsOjb.data.game)
          this.#router.navigate([`/game/${room}`])
          break
        case `${room}-bot-move`:
          console.log(`${room}-game-bot`, argsOjb)

          // this.playingTurnBot
          // this.socket.emit('bot-selection-move', {cells: argsOjb.data,room: room});
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
    if (this.#storageManagerApp.getConnectRoomStore() && this.#storageManagerApp.getRoom() !== 'default') {
      this.socket.emit('join-room', user);
    } else {
      this.socket.emit('default-join', user);
    }
    this.socketCallReceived()
  }

  joinRoom() {
    const user: UserSocketConnect = {
      token: this.#storageManagerApp.getUser().token,
      pseudo: this.#storageManagerApp.getUser().pseudo,
      room: this.#storageManagerApp.getRoom()
    }
    if (this.#storageManagerApp.getRoom() !== 'default') {
      // console.log('join-room difff', user.room)
      this.socket.emit('join-room', user);
      this.socketCallReceived()
    } else {
      // console.log('default-join difff', user)
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

  initChronoGame() {
    this.socket.emit('chrono-game', {room: this.#storageManagerApp.getSession().sessionStatusGame.room,user:this.#storageManagerApp.getUser().pseudo});
    this.socketCallReceived()
  }

  checkTurn() {
    this.socket.emit('check-turn', {room: this.#storageManagerApp.getSession().sessionStatusGame.room});
    this.socketCallReceived()
  }


  playingTurn(userGamePlay: UserGamePlay) {
    console.log('playingTurn', userGamePlay)
    this.socket.emit('humain-action', userGamePlay);
    this.socketCallReceived()
  }

  playingTurnBot(userGamePlay: UserGamePlay) {
    console.log('playingTurn', userGamePlay)
    this.socket.emit('bot-action', userGamePlay);
    this.socketCallReceived()
  }

  rollingDice(diceRoll: DiceRolling) {
    console.log('rollingDice', diceRoll)
    this.socket.emit('rolling-dice', diceRoll);
    this.socketCallReceived()
  }

  resetChronoGame() {
    this.socket.emit('reset-timer-next-turn', {room: this.#storageManagerApp.getSession().sessionStatusGame.room});
    this.socketCallReceived()
  }

  botSelectedMove(movingCellList: Array<Cells>) {
    this.socket.emit('bot-selection-move', {cells: movingCellList,room: this.#storageManagerApp.getSession().sessionStatusGame.room});
  }





}
