import {Injectable, signal} from "@angular/core";
import {UserFrontData, UserPosition} from "../../models/users.models";
import {EntityCategorie, Game, SessionStatusGame, StatusGame, TurnListEntity} from "../../models/room.content.models";
import {Maps} from "../../models/maps.models";
import {CurrentTurnAction} from "../../models/formatSocket.models";
import {Can} from "../../models/emus";

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
  readonly #nowStatus = signal(window.sessionStorage.getItem('NowStatus'))
  readonly #nextStatus = signal(window.sessionStorage.getItem('NextStatus'))


  readonly eventCurrentRoomSignal = this.#currentRoom.asReadonly()
  readonly eventUserSignal = this.#userSignal.asReadonly()
  readonly eventGameSignal = this.#gameSignal.asReadonly()
  readonly eventMapSignal = this.#mapSignal.asReadonly()
  readonly eventSessionsSignal = this.#sessionStatusGameSignal.asReadonly()
  readonly eventPlayerPosition = this.#playerPosition.asReadonly()
  readonly eventCurrentTurn = this.#currentTurn.asReadonly()
  readonly eventNowStatus = this.#nowStatus.asReadonly()
  readonly eventNextStatus = this.#nextStatus.asReadonly()


  constructor() {
    if (this.eventUserSignal() === null) {
      this.createStorageLocalByKey('User', null)
    }
    if (this.eventSessionsSignal() === null) {
      this.createStorageSessionByKey('Session', null)
    }
    if (this.eventGameSignal() === null) {
      this.createStorageSessionByKey('Game', null)
    }
    if (this.eventMapSignal() === null) {
      this.createStorageSessionByKey('Map', null)
    }
    if (this.eventPlayerPosition() === null) {
      this.createStorageSessionByKey('Position', null)
    }
    if (this.eventCurrentTurn() === null) {
      this.createStorageSessionByKey('Turn', null)
    }
    if (this.eventCurrentRoomSignal() === null) {
      this.createStorageSessionByKey('Room', null)
    }
    if (this.eventNowStatus() === null) {
      this.#nowStatus.set(Can.WHO_IS_TURN)
    }
    if (this.eventNextStatus() === null) {
      this.#nextStatus.set(Can.WHO_IS_TURN)
    }
  }

  createStorageLocalByKey(key: string, data: any) {
    return localStorage.setItem(key, JSON.stringify(data));
  }

  createStorageSessionByKey(key: string, data: any) {
    return sessionStorage.setItem(key, JSON.stringify(data));
  }


  resetNullAllStorage() {
    this.createStorageSessionByKey('Session', null)
    this.createStorageSessionByKey('Game', null)
    this.createStorageSessionByKey('Map', null)
    this.createStorageSessionByKey('Position', null)
    this.createStorageSessionByKey('Turn', null)
    this.createStorageSessionByKey('Room', null)
    this.createStorageSessionByKey('NowStatus', Can.WHO_IS_TURN)
    this.createStorageSessionByKey('NextStatus', Can.WHO_IS_TURN)
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
      return {
        teams: [],
        monsters: [],
        fightings: []
      }
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
      return {
        room: '',
        teamNames: [],
        status: StatusGame.END,
        turnCount: 0,
        lobby: [],
        entityTurn: [],
        currentTurnEntity: {
          turnEntity: {
            pseudo: '',
            teamIndex: -1,
            cardIndex: -1,
            luk: 0,
            typeEntity: EntityCategorie.HUMAIN,
            cellPosition: {
              id: -1,
              x: -1,
              y: -1,
              value: 0
            }
          },
          indexInsideArray: -1,
          dice: -1,
          move: {
            id: -1,
            x: -1,
            y: -1,
            value: 0
          },
          moves: [],
          currentAction: ''
        }
      }
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
  getPlayerPosition(): UserPosition {
    let position = this.eventPlayerPosition()
    if (position === null) {
      return {teamTag: -1, cardTag: -1}
    } else {
      return JSON.parse(position)
    }
  }

  setPlayerPosition(position: UserPosition) {
    this.createStorageSessionByKey('Position', position)
    this.#playerPosition.set(JSON.stringify(position))
  }

  updatePlayerPosition(position: UserPosition) {
    this.#playerPosition.update(value => JSON.stringify(position))
    this.#playerPosition.set(JSON.stringify(position))
  }

  /**
   * Turn
   */

  getCurrentTurn(): TurnListEntity {
    let turn = this.eventCurrentTurn()
    if (turn === null) {
      return {
        team: '',
        pseudo: '',
        teamIndex: -1,
        cardIndex: -1,
        typeEntity: EntityCategorie.HUMAIN,
        luk: -100000,
        cellPosition: {
          id: -1,
          x: -1,
          y: -1,
          value: 0
        }
      }
    } else {
      return JSON.parse(turn)
    }
  }

  setCurrentTurn(turn: TurnListEntity | null) {
    this.createStorageSessionByKey('Turn', turn)
    this.#currentTurn.set(JSON.stringify(turn))
  }

  /**
   * Room
   */

  getRoom(): string {
    let turn = this.eventCurrentRoomSignal()
    if (turn === null) {
      return ''
    } else {
      return JSON.parse(turn)
    }
  }

  setRoom(value: string) {
    this.createStorageSessionByKey('Room', value)
    this.#currentRoom.set(JSON.stringify(value))
  }

  /**
   * Status
   */

  getNowStatus(): Can {
    let status = this.eventNowStatus()
    if (status === null) {
      return Can.WHO_IS_TURN
    } else {
      return JSON.parse(status)
    }
  }

  setNowStatus(value: Can) {
    this.createStorageSessionByKey('NowStatus', value)
    this.#nowStatus.set(JSON.stringify(value))
  }

  getNextStatus(): Can {
    let status = this.eventNextStatus()
    if (status === null) {
      return Can.WHO_IS_TURN
    } else {
      return JSON.parse(status)
    }
  }

  setNextStatus(value: Can) {
    this.createStorageSessionByKey('NextStatus', value)
    this.#nextStatus.set(JSON.stringify(value))
  }
}
