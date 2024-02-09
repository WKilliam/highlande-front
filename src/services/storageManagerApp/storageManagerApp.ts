import {inject, Injectable, signal} from "@angular/core";
import {UserFrontData, UserModels,} from "../../models/users.models";
import {Maps, MapsModels} from "../../models/maps.models";
import {PlayerLobby} from "../../models/player.models";
import {SessionGame, SessionModels} from "../../models/session.models";
import {FormatRestApi, FormatRestApiModels} from "../../models/formatRestApi";
import {DispatcherSocket} from "../dispatchers/dispatcher-socket/dispatcher-socket";

@Injectable({
  providedIn: 'root',
})
export class StorageManagerApp {

  private socketEndPoints: string = 'highlander-socket'

  // Signals
  readonly #userLogin = signal<UserFrontData>(UserModels.initUserFrontData())
  readonly #session = signal<SessionGame>(SessionModels.initSessionGame())
  readonly #room = signal<{ romeSession: string }>({romeSession: ''})
  readonly #alerte = signal<FormatRestApi>(FormatRestApiModels.initFormatRestApi())
  readonly #currentActiveRoute = signal<string>('')

  // Events Signals
  readonly eventUserLogin = this.#userLogin.asReadonly()
  readonly eventSession = this.#session.asReadonly()
  readonly eventRoom = this.#room.asReadonly()
  readonly eventAlerte = this.#alerte.asReadonly()
  readonly eventCurrentActiveRoute = this.#currentActiveRoute.asReadonly()

  constructor() {
    const user = this.getUser()
    if (user.token === '') {
      localStorage.setItem('User', JSON.stringify(UserModels.initUserFrontData()))
    }else{
      this.#userLogin.update(value => user)
    }

    const sessionStorage = this.getSessionStorage('Session') ? JSON.parse(this.getSessionStorage('Session') || '{}') : SessionModels.initSessionGame()

    if(sessionStorage.sessionStatusGame.room !== ''){
      this.setSessionAndLinkStorage(sessionStorage)
    }else{
      this.setSessionAndLinkStorage(SessionModels.initSessionGame())
    }
    this.setAlerte(FormatRestApiModels.initFormatRestApi())
  }

  getSessionStorage(key: string){
    return sessionStorage.getItem(key)
  }

  // Alert
  setAlerte(data: FormatRestApi) {
    this.#alerte.set(data)
    sessionStorage.setItem('Alerte', JSON.stringify(data))
  }

  getAlerte(): FormatRestApi {
    return sessionStorage.getItem('Alerte') ? JSON.parse(sessionStorage.getItem('Alerte') || '{}') : FormatRestApiModels.initFormatRestApi()
  }


  // User
  userStorage(key: string, data: any) {
    return localStorage.setItem(key, JSON.stringify(data));
  }

  getUser(): UserFrontData {
    return localStorage.getItem('User') ? JSON.parse(localStorage.getItem('User') || '{}') : {
      token: '', pseudo: '',
      avatar: '', bearcoins: 0,
      decks: [], cards: []
    }
  }

  setUser(data: UserFrontData) {
    this.#userLogin.update(value => data)
    this.userStorage('User', data)
  }

  // Session
  sessionStorage(key: string, data: any) {
    return sessionStorage.setItem(key, JSON.stringify(data));
  }

  getSession(): SessionGame {
    return this.eventSession()
  }

  setSessionAndLinkStorage(data: SessionGame) {
    console.log('data',data)
    sessionStorage.setItem('Session', JSON.stringify(data))
    this.#session.set(data)
    sessionStorage.setItem('Lobby', JSON.stringify(this.getSession().sessionStatusGame.lobby))
    sessionStorage.setItem('SessionTurnCount', JSON.stringify(this.getSession().sessionStatusGame.turnCount))
    sessionStorage.setItem('SessionStatus', JSON.stringify(this.getSession().sessionStatusGame.status))
    sessionStorage.setItem('SessionRollingTurn', JSON.stringify(this.getSession().sessionStatusGame.currentEntityActionMovingPosition))
    sessionStorage.setItem('List-Turn', JSON.stringify(this.getSession().sessionStatusGame.entityTurn))
    sessionStorage.setItem('Map', JSON.stringify(this.getSession().maps))
    sessionStorage.setItem('Challenger', JSON.stringify(this.getSession().game.challenger))
    sessionStorage.setItem('Fight-Session', JSON.stringify(this.getSession().game.fightings))
    sessionStorage.setItem('Team-One', JSON.stringify(this.getSession().game.challenger[0]))
    sessionStorage.setItem('Team-Two', JSON.stringify(this.getSession().game.challenger[1]))
    sessionStorage.setItem('Team-Three', JSON.stringify(this.getSession().game.challenger[2]))
    sessionStorage.setItem('Team-Four', JSON.stringify(this.getSession().game.challenger[3]))
    if(this.getSession().sessionStatusGame.room !== '') {
      this.setRoom(`${this.getSession().sessionStatusGame.room}`)
    }else{
      this.setRoom('default')
    }
  }

  // Getters sessionStorage
  getLobby(): Array<PlayerLobby> {
    return sessionStorage.getItem('Lobby') ? JSON.parse(sessionStorage.getItem('Lobby') || '{}') : []
  }
  getTurnCount(): number {
    return sessionStorage.getItem('SessionTurnCount') ? JSON.parse(sessionStorage.getItem('SessionTurnCount') || '{}') : 0
  }
  getStatus(): string {
    return sessionStorage.getItem('SessionStatus') ? JSON.parse(sessionStorage.getItem('SessionStatus') || '{}') : ''
  }
  getRollingTurn(): number {
    return sessionStorage.getItem('SessionRollingTurn') ? JSON.parse(sessionStorage.getItem('SessionRollingTurn') || '{}') : 0
  }
  getRoom(): string {
    return this.eventRoom().romeSession
  }
  getListTurn(): Array<string> {
    return sessionStorage.getItem('List-Turn') ? JSON.parse(sessionStorage.getItem('List-Turn') || '{}') : []
  }
  getMap(): Maps {
    return sessionStorage.getItem('Map') ? JSON.parse(sessionStorage.getItem('Map') || '{}') : MapsModels.initMaps()
  }
  getChallenger(): Array<PlayerLobby> {
    return sessionStorage.getItem('Challenger') ? JSON.parse(sessionStorage.getItem('Challenger') || '{}') : []
  }
  getFightSession(): any {
    return sessionStorage.getItem('Fight-Session') ? JSON.parse(sessionStorage.getItem('Fight-Session') || '{}') : []
  }
  getTeamOne(): any {
    return sessionStorage.getItem('Team-One') ? JSON.parse(sessionStorage.getItem('Team-One') || '{}') : []
  }
  getTeamTwo(): any {
    return sessionStorage.getItem('Team-Two') ? JSON.parse(sessionStorage.getItem('Team-Two') || '{}') : []
  }
  getTeamThree(): any {
    return sessionStorage.getItem('Team-Three') ? JSON.parse(sessionStorage.getItem('Team-Three') || '{}') : []
  }
  getTeamFour(): any {
    return sessionStorage.getItem('Team-Four') ? JSON.parse(sessionStorage.getItem('Team-Four') || '{}') : []
  }
  getCurrentActionMoving(){
    return this.getSession().sessionStatusGame.entityTurn[this.getRollingTurn()]

  }

  // Setters sessionStorage

  setRoom(room: string) {
    sessionStorage.setItem('Room', room)
    this.#room.update(value => {return {romeSession: room}})
  }


  // Current Active Route

  setCurrentActiveRoute(route: string) {
    this.#currentActiveRoute.set(route)
    console.log('route',route)
    sessionStorage.setItem('CurrentActiveRoute', JSON.stringify(route))
  }

  getCurrentActiveRoute() {
    return this.eventCurrentActiveRoute()
  }

}