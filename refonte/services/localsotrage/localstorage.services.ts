import {Injectable, signal} from "@angular/core";
import {UserFrontData, UserModels} from "../../../src/models/users.models";
import {Maps, MapsModels} from "../../../src/models/maps.models";
import {Game, SessionModels, SessionStatusGame} from "../../../src/models/session.models";
import {PlayerModels, PlayerPosition} from "../../../src/models/player.models";

@Injectable({
  providedIn: 'root',
})
export class LocalstorageServices {


  readonly #userSignal = signal(window.localStorage.getItem('User'))

  readonly #currentRoom = signal(window.sessionStorage.getItem('Room'))
  readonly #gameSignal = signal(window.sessionStorage.getItem('Game'))
  readonly #mapSignal = signal(window.sessionStorage.getItem('Map'))
  readonly #sessionStatusGameSignal = signal(window.sessionStorage.getItem('Session'))
  readonly #playerPosition = signal(window.sessionStorage.getItem('Position'))
  readonly #currentTurn = signal(window.sessionStorage.getItem('Turn'))
  readonly #timer = signal(window.sessionStorage.getItem('Timer'))


  readonly eventCurrentRoomSignal = this.#currentRoom.asReadonly()
  readonly eventUserSignal = this.#userSignal.asReadonly()
  readonly eventGameSignal = this.#gameSignal.asReadonly()
  readonly eventMapSignal = this.#mapSignal.asReadonly()
  readonly eventSessionsSignal = this.#sessionStatusGameSignal.asReadonly()
  readonly eventPlayerPosition = this.#playerPosition.asReadonly()
  readonly eventCurrentTurn = this.#currentTurn.asReadonly()
  readonly eventTimer = this.#timer.asReadonly()


  constructor() {
    if (this.eventUserSignal() === null) {
      this.createStorageLocalByKey('User', JSON.stringify(UserModels.initUserFrontData()))
    }
    if (this.eventSessionsSignal() === null) {
      this.createStorageSessionByKey('Session', JSON.stringify(SessionModels.initSessionGame()))
    }
    if (this.eventGameSignal() === null) {
      this.createStorageSessionByKey('Game', null)
    }
    // if (this.eventMapSignal() === null) {
    //   this.createStorageSessionByKey('Map', null)
    // }
    // if (this.eventPlayerPosition() === null) {
    //   this.createStorageSessionByKey('Position', null)
    // }
    // if (this.eventCurrentTurn() === null) {
    //   this.createStorageSessionByKey('Turn', null)
    // }
    // if (this.eventCurrentRoomSignal() === null) {
    //   this.createStorageSessionByKey('Room', null)
    // }
    // if (this.eventTimer() === null) {
    //   this.createStorageSessionByKey('Timer', {time:0})
    // }
  }

  createStorageLocalByKey(key: string, data: any) {
    return localStorage.setItem(key, JSON.stringify(data));
  }

  createStorageSessionByKey(key: string, data: any) {
    return sessionStorage.setItem(key, JSON.stringify(data));
  }


  resetNullAllStorage() {
    this.createStorageSessionByKey('Session', JSON.stringify(UserModels.initUserFrontData()))
    this.createStorageSessionByKey('Game', JSON.stringify(SessionModels.initSessionGame()))
    // this.createStorageSessionByKey('Map', null)
    // this.createStorageSessionByKey('Position', null)
    // this.createStorageSessionByKey('Turn', null)
    // this.createStorageSessionByKey('Room', null)
    // this.createStorageSessionByKey('Timer', {time:0})
  }

  /***
   * User
   */
  getUser(): UserFrontData {
    let user = this.eventUserSignal()
    if (user === null) {
      return UserModels.initUserFrontData()
    } else {
      return JSON.parse(user)
    }
  }
  setUser(user: UserFrontData) {
    this.createStorageLocalByKey('User', user)
    this.#userSignal.set(JSON.stringify(user))
  }
  updateUser(user: UserFrontData) {
    this.#userSignal.update(value => JSON.stringify(user))
    this.#userSignal.set(JSON.stringify(user))
  }

  /**
   * Game
   */
  getGame(): Game {
    let game = this.eventGameSignal()
    if (game === null) {
      return SessionModels.initGame(['Alpha', 'Beta', 'Gamma', 'Delta'])
    } else {
      return JSON.parse(game)
    }
  }
  setGame(game: Game | null) {
    this.createStorageSessionByKey('Game', game)
    this.#gameSignal.set(JSON.stringify(game))
  }
  updateGame(game: Game) {
    this.#gameSignal.update(value => JSON.stringify(game))
    this.#gameSignal.set(JSON.stringify(game))
  }

  /**
   * Session
   */
  getSessionStatusGame(): SessionStatusGame {
    let game = this.eventSessionsSignal()
    if (game === null) {
      return SessionModels.initSessionStatusGame()
    } else {
      return JSON.parse(game)
    }
  }
  setSessionStatusGame(game: SessionStatusGame | null) {
    this.createStorageSessionByKey('Session', game)
    this.#sessionStatusGameSignal.set(JSON.stringify(game))
  }
  updateSessionStatusGame(game: SessionStatusGame) {
    this.#sessionStatusGameSignal.update(value => JSON.stringify(game))
    this.#sessionStatusGameSignal.set(JSON.stringify(game))
  }

  /**
   * Map
   */
  getMap(): Maps {
    let map = this.eventMapSignal()
    if (map === null) {
      return MapsModels.initMaps()
    } else {
      return JSON.parse(map)
    }
  }
  setMap(map: Maps) {
    this.createStorageSessionByKey('Map', map)
    this.#mapSignal.set(JSON.stringify(map))
  }
  updateMap(map: Maps) {
    this.#mapSignal.update(value => JSON.stringify(map))
    this.#mapSignal.set(JSON.stringify(map))
  }

  /**
   * Position
   */
  getPlayerPosition(): PlayerPosition {
    let position = this.eventPlayerPosition()
    if (position === null) {
      return PlayerModels.initPlayerPosition()
    } else {
      return JSON.parse(position)
    }
  }
  setPlayerPosition(position: PlayerPosition){
    this.createStorageSessionByKey('Position', position)
    this.#playerPosition.set(JSON.stringify(position))
  }
  updatePlayerPosition(position: PlayerPosition) {
    this.#playerPosition.update(value => JSON.stringify(position))
    this.#playerPosition.set(JSON.stringify(position))
  }


}
