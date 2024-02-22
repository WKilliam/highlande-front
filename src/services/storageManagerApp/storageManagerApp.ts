import {inject, Injectable, signal} from "@angular/core";
import {UserFrontData, UserModels,} from "../../models/users.models";
import {Maps, MapsModels} from "../../models/maps.models";
import {PlayerLobby} from "../../models/player.models";
import {SessionGame, SessionModels} from "../../models/session.models";
import {FormatRestApi, FormatRestApiModels} from "../../models/formatRestApi";
import {DispatcherSocket} from "../dispatchers/dispatcher-socket/dispatcher-socket";
import {CardByEntityPlaying, CardEntitySimplify} from "../../models/cards.models";
import {CardPlayerEntityModels, PlayerCardsEntity} from "../../models/cards.player.entity.models";

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
  readonly #connectRoom = signal<boolean>(false)
  readonly #timer = signal<number>(0)
  readonly #diceRollingValue = signal(0)
  readonly #cellsSelectedByBot = signal(MapsModels.initCells())


  // Events Signals
  readonly eventUserLogin = this.#userLogin.asReadonly()
  readonly eventSession = this.#session.asReadonly()
  readonly eventRoom = this.#room.asReadonly()
  readonly eventAlerte = this.#alerte.asReadonly()
  readonly eventCurrentActiveRoute = this.#currentActiveRoute.asReadonly()
  readonly eventConnectRoom = this.#connectRoom.asReadonly()
  readonly eventTimer = this.#timer.asReadonly()
  readonly eventDiceRollingValue = this.#diceRollingValue.asReadonly()
  readonly eventCellsSelectedByBot = this.#cellsSelectedByBot.asReadonly()

  constructor() {
    const user = this.getUser()
    if (user.token === '') {
      localStorage.setItem('User', JSON.stringify(UserModels.initUserFrontData()))
    } else {
      this.#userLogin.update(value => user)
    }
    this.setConnectRoom(false)
    this.setSessionAndLinkStorage(SessionModels.initSessionGame())
    this.setAlerte(FormatRestApiModels.initFormatRestApi())
  }

  getSessionStorage(key: string) {
    let session = sessionStorage.getItem(key)
    if (session !== null) {
      return JSON.parse(session)
    } else {
      return SessionModels.initSessionGame()
    }
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

  // Connect Room
  setConnectRoom(data: boolean) {
    this.#connectRoom.set(data)
    localStorage.setItem('ConnectRoom', JSON.stringify(data))
  }

  getConnectRoomEvent() {
    return this.eventConnectRoom()
  }

  getConnectRoomStore(): boolean {
    return localStorage.getItem('ConnectRoom') ? JSON.parse(localStorage.getItem('ConnectRoom') || '{}') : false
  }

  // Session
  sessionStorage(key: string, data: any) {
    return sessionStorage.setItem(key, JSON.stringify(data));
  }

  getSession(): SessionGame {
    return this.eventSession()
  }

  setSessionAndLinkStorage(data: SessionGame) {
    // console.log('init session', data)
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
    this.setRoom(data.sessionStatusGame.room)
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

  getChallenger(): Array<PlayerCardsEntity> {
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

  getCurrentActionMoving() {
    return this.getSession().sessionStatusGame.entityTurn[this.getRollingTurn()]

  }

  // Setters sessionStorage

  setRoom(room: string) {
    this.#room.update(value => {
      return {romeSession: room}
    })
  }


  // Current Active Route

  setCurrentActiveRoute(route: string) {
    this.#currentActiveRoute.set(route)
    // console.log('route',route)
    sessionStorage.setItem('CurrentActiveRoute', JSON.stringify(route))
  }

  getCurrentActiveRoute() {
    return this.eventCurrentActiveRoute()
  }

  // Timer
  setTimer(value: number) {
    this.#timer.set(value)
  }

  getTimer() {
    return this.eventTimer()
  }

  // StartPosibility

  getStartPossibilityIsValide() {
    const session = this.getSession().game.challenger;
    let isValidSession = [[false, false], [false, false], [false, false], [false, false]];
    let positionTaken = [[false, false], [false, false], [false, false], [false, false]];
    let isValide = false; // Modifiez la valeur initiale à false

    session.forEach((player: PlayerCardsEntity, indexPlayer) => {
      player.cardsInfo?.some((card, indexCard) => {
        if (card.player.pseudo !== '' && card.player.avatar !== '') {
          positionTaken[indexPlayer][indexCard] = true;
          if (card.atk !== -21 && card.def !== -21 && card.spd !== -21 && card.luk !== -21) {
            isValidSession[indexPlayer][indexCard] = true;
          } else {
            // Si une carte est prise (pseudo et avatar non vides) mais invalide (une des stats est -21), marquez comme invalide
            isValidSession[indexPlayer][indexCard] = false;
          }
        }
      });
    });

    // Vérifier si au moins une position est prise avec une carte valide
    for (let i = 0; i < positionTaken.length; i++) {
      for (let j = 0; j < positionTaken[i].length; j++) {
        if (positionTaken[i][j] && isValidSession[i][j]) {
          // Si une position est prise et la carte correspondante est valide, la session peut être valide
          isValide = true;
          break; // Sortie anticipée dès qu'une validité est trouvée
        }
      }
      if (isValide) break; // Sortie anticipée du boucle externe dès qu'une validité est trouvée
    }

    // Retourne false si toutes les positions sont false ou si aucune carte valide n'est associée à une position prise
    return isValide;
  }


  // Dice Rolling Value
  // Getters
  getDiceRollingValue() {
    return this.#diceRollingValue()
  }

  // Setters

  setDiceRollingValue(value: number) {
    this.#diceRollingValue.set(value)
  }


}
