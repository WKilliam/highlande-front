import {effect, inject, Injectable, signal, WritableSignal} from "@angular/core";
import {UserModels} from "../../models/user.models";
import {InfoGame} from "../../models/info.game.models";
import {GameModels} from "../../models/game.models";
import {MapModels} from "../../models/maps.models";
import {StoreServicesSocket} from "../store-Socket/store.services.socket";

@Injectable({
  providedIn: 'root',
})
export class LocalstorageServices {

  readonly #currentRoom = signal(window.localStorage.getItem('Room'))
  readonly #userSignal = signal(window.localStorage.getItem('User'))
  readonly #infoGameSignal = signal(window.localStorage.getItem('Game-Info'))
  readonly #gameSignal = signal(window.localStorage.getItem('Game'))
  readonly #mapSignal = signal(window.localStorage.getItem('Map'))

  readonly eventCurrentRoomSignal = this.#currentRoom.asReadonly()
  readonly eventUserSignal = this.#userSignal.asReadonly()
  readonly eventInfoGameSignal = this.#infoGameSignal.asReadonly()
  readonly eventGameSignal = this.#gameSignal.asReadonly()
  readonly eventMapSignal = this.#mapSignal.asReadonly()



  constructor() {
    if(this.eventCurrentRoomSignal() === null) {
      this.createStorageByKey('Room', null)
    }
    if(this.eventUserSignal() === null) {
      this.createStorageByKey('User', null)
    }
    if (this.eventInfoGameSignal() === null) {
      this.createStorageByKey('Game-Info', null)
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

  private getStorageByKey(key: string) {
    const value = localStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
    } else {
      return null;
    }
  }

  /** Current Room **/

  getCurrentRoom() {
    return this.eventCurrentRoomSignal
  }

  setCurrentRoom(room: string | null) {
    this.#currentRoom.update(()=> room)
    this.createStorageByKey('Room', room)
  }

  /** User **/
  setUser(user: UserModels | null) {
    this.#userSignal.update(()=> JSON.stringify(user))
    this.createStorageByKey('User', user)
  }

  getUser() {
    return this.eventUserSignal
  }

  /** InfoGame **/
  setInfoGame(infoGame: InfoGame | null) {
    this.#infoGameSignal.update(()=> JSON.stringify(infoGame))
    this.createStorageByKey('Game-Info',infoGame)
  }

  getInfoGame() {
    return this.eventInfoGameSignal
  }

  /** Game **/

  setGame(game: GameModels | null) {
    this.#gameSignal.update(()=> JSON.stringify(game))
    this.createStorageByKey('Game', game)
  }

  getGame() {
    return this.eventGameSignal
  }


  /** Map **/
  setMap(map: MapModels | null) {
    this.#mapSignal.update(()=> JSON.stringify(map))
    this.createStorageByKey('Map', map)
  }

  getMap() {
    return this.eventMapSignal
  }


}
