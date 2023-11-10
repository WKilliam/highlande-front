import {Injectable, signal} from "@angular/core";
import {UserFrontData} from "../../models/users.models";
import {Game, SessionStatusGame, StatusGame} from "../../models/room.content.models";
import {Maps} from "../../models/maps.models";

@Injectable({
  providedIn: 'root',
})
export class LocalstorageServices {

  readonly #currentRoom = signal(window.localStorage.getItem('Room'))
  readonly #userSignal = signal(window.localStorage.getItem('User'))
  readonly #gameSignal = signal(window.localStorage.getItem('Game'))
  readonly #mapSignal = signal(window.localStorage.getItem('Map'))
  readonly #sessionStatusGameSignal = signal(window.localStorage.getItem('Session'))

  readonly eventCurrentRoomSignal = this.#currentRoom.asReadonly()
  readonly eventUserSignal = this.#userSignal.asReadonly()
  readonly eventGameSignal = this.#gameSignal.asReadonly()
  readonly eventMapSignal = this.#mapSignal.asReadonly()
  readonly eventSessionsSignal = this.#sessionStatusGameSignal.asReadonly()


  constructor() {
    if (this.eventCurrentRoomSignal() === null) {
      this.createStorageByKey('Room', null)
    }
    if (this.eventUserSignal() === null) {
      this.createStorageByKey('User', null)
    }
    if (this.eventSessionsSignal() === null) {
      this.createStorageByKey('Session', null)
    }
    if (this.eventGameSignal() === null) {
      this.createStorageByKey('Game', null)
    }
    if (this.eventMapSignal() === null) {
      this.createStorageByKey('Map', null)
    }
  }

  createStorageByKey(key: string, data: any) {
    return localStorage.setItem(key, JSON.stringify(data));
  }

  /***
   * User
   */
  getUser(): UserFrontData {
    let user = this.eventUserSignal()
    if (user === null) {
      return {
        token: '',
        pseudo: '',
        avatar: '',
        bearcoins: 0,
        decks: [],
        cards: []
      }
    } else {
      return JSON.parse(user)
    }
  }

  setUser(user: UserFrontData) {
    this.createStorageByKey('User', user)
    this.#userSignal.set(JSON.stringify(user))
  }


  /***
   * Room
   */
  getCurrentRoom(): string {
    let room = this.eventCurrentRoomSignal()
    if (room === null) {
      return ''
    } else {
      return room
    }
  }

  setCurrentRoom(room: string) {
    this.createStorageByKey('Room', room)
    this.#currentRoom.set(room)
  }

  /**
   * Game
   */
  getGame(): Game {
    let game = this.eventGameSignal()
    if (game === null) {
      return {
        teams: [],
        monsters: [],
      }
    } else {
      return JSON.parse(game)
    }
  }

  setGame(game: Game) {
    this.createStorageByKey('Game', game)
    this.#gameSignal.set(JSON.stringify(game))
  }

  /**
   * Session
   */
  getSessionStatusGame(): SessionStatusGame {
    let game = this.eventSessionsSignal()
    if (game === null) {
      return {
        room: '',
        teamNames: [],
        status: StatusGame.END,
        turnCount: 0,
        lobby: [],
        entityTurn: []
      }
    } else {
      return JSON.parse(game)
    }
  }

  setSessionStatusGame(game: SessionStatusGame) {
    this.createStorageByKey('Session', game)
    this.#sessionStatusGameSignal.set(JSON.stringify(game))
  }

  /**
   * Map
   */
  getMap(): Maps {
    let map = this.eventMapSignal()
    if (map === null) {
      return {
        id: -1,
        name: '',
        backgroundImg: '',
        height: 0,
        width: 0,
        cellsGrid: []
      }
    } else {
      return JSON.parse(map)
    }
  }

  setMap(map: Maps) {
    this.createStorageByKey('Map', map)
    this.#mapSignal.set(JSON.stringify(map))
  }
}
