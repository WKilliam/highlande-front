import {inject, Injectable, signal} from "@angular/core";
import {LocalstorageServices} from "../../services/localsotrage/localstorage.services";
import {StoreServicesSocket} from "../../services/store-Socket/store.services.socket";
import {Cells} from "../../models/maps.models";
import {Can} from "../../models/emus";
import {Character} from "../../models/player.models";
import {SocketEndpoint} from "../../app/socket.endpoint";
import {Game, Session, SessionGame, SessionStatusGame} from "../../models/room.content.models";
import {CurrentTurnAction} from "../../models/formatSocket.models";
import {bsDatepickerReducer} from "ngx-bootstrap/datepicker/reducer/bs-datepicker.reducer";

@Injectable({
  providedIn: 'root',
})
export class GameSessionServices {

  private timer: any;
  readonly localStore: LocalstorageServices = inject(LocalstorageServices)
  private readonly imgSrcCard = 'https://cdn.discordapp.com/attachments/1060501071056879618/1168479278174830602/kyrasw_the_frame_of_a_back_tarot_card_game_rpg_in_png_format_or_379c9eb1-9bea-4ea4-bd56-c5629407e849.png?ex=65645f21&is=6551ea21&hm=d18e7e7f839624cb7c13e4137e8b18ebd37daa96993f61ff4bd6399a1a688ef6&'
  private storeSocket: StoreServicesSocket = inject(StoreServicesSocket)
  private map: Map<string, Session> = new Map<string, Session>()
  private readonly socketEndpointJoin = inject(SocketEndpoint)

  readonly #timerValueSignal = signal<number>(50);
  readonly #timerSignal = signal<any>(null);
  readonly #imgSrcCardOne = signal('')
  readonly #imgSrcCardTwo = signal('')
  readonly #rarityCardOne = signal('')
  readonly #rarityCardTwo = signal('')
  readonly #diceResult = signal(-1)
  readonly #allCanMovePosition = signal<Array<Cells>>([])
  readonly #moveLocation = signal<Cells>({id: -1, x: -1, y: -1, value: -1,})
  readonly #turnStatus = signal<string>(Can.WHO_IS_TURN)
  readonly #characters = signal<Array<Character>>([])
  readonly #hiddenDice = signal<boolean>(false)
  readonly #nowPosition = signal<boolean>(false)
  readonly #messageByAction = signal<string>('')
  readonly #called = signal<boolean>(true)


  readonly timerValueSignal = this.#timerValueSignal.asReadonly();
  readonly timerSignal = this.#timerSignal.asReadonly();
  readonly diceResultSignal = this.#diceResult.asReadonly()
  readonly imgSrcCardOneSignal = this.#imgSrcCardOne.asReadonly()
  readonly imgSrcCardTwoSignal = this.#imgSrcCardTwo.asReadonly()
  readonly rarityCardOneSignal = this.#rarityCardOne.asReadonly()
  readonly rarityCardTwoSignal = this.#rarityCardTwo.asReadonly()
  readonly allCanMovePositionSignal = this.#allCanMovePosition.asReadonly()
  readonly moveLocationSignal = this.#moveLocation.asReadonly()
  readonly turnStatusSignal = this.#turnStatus.asReadonly()
  readonly charactersSignal = this.#characters.asReadonly()
  readonly hiddenDiceSignal = this.#hiddenDice.asReadonly()
  readonly nowPositionSignal = this.#nowPosition.asReadonly()
  readonly messageByActionSignal = this.#messageByAction.asReadonly()
  readonly calledSignal = this.#called.asReadonly()


  constructor() {
    this.socketEndpointJoin.instanceRoomConnect('GameSessionServices')
    const position = this.localStore.getPlayerPosition()
    this.initCharacters()
    const cards = this.localStore.getGame().teams[position.teamTag].cardsPlayer ?? []
    this.setimgSrcCardOne(cards[0].imageSrc === '' ? this.imgSrcCard : cards[0].imageSrc)
    this.setimgSrcCardTwo(cards[1].imageSrc === '' ? this.imgSrcCard : cards[1].imageSrc)
    this.setrarityCardOne(cards[0].rarity.toLowerCase() === '' ? 'common' : cards[0].rarity.toLowerCase())
    this.setrarityCardTwo(cards[1].rarity.toLowerCase() === '' ? 'common' : cards[1].rarity.toLowerCase())
    this.timerEvolving()
  }

  timerEvolving() {
    this.setTimerValue(50)
    this.timer = setInterval(() => {
      this.setTimerValue(this.getTimerValue() - 1)
      if (this.getTimerValue() === 0) {
        console.log("map ", this.storeSocket.getMap())
        console.log("turn ", this.localStore.getCurrentTurn())
        // if(this.getTurnStatus() !== Can.WHO_IS_TURN){
        //   this.setTurnStatus(Can.END_TURN)
        // }else{
        //   this.timerEvolving()
        // }
      } else {
        if (this.localStore.getCurrentTurn().typeEntity === 'COMPUTER') {
          this.ping(true)
        } else if (this.localStore.getCurrentTurn().typeEntity === 'HUMAIN') {
          this.ping(false)
        } else {
          console.log('error type entity')
        }
      }
    }, 1000);
  }

  ping(type: boolean) {
    if (type) {
      // Computer turn
      console.log(`computer playing status is ${this.getTurnStatus()}...`)
      this.botLogic()
    } else {
      // Player turn
      console.log(`humain playing status is ${this.getTurnStatus()}...`)
      this.playerLogic()
    }
  }

  botLogic() {
    if (this.getCalled()) {
      this.storeSocket.botTurnSuccessSend({
        ...this.localStore.getSessionStatusGame().currentTurnEntity,
        currentAction: Can.WHO_IS_TURN,
      })
      this.setCalled(false)
      setTimeout(() => {
        const sendDiceEvent = this.storeSocket.getMap().get(Can.SEND_DICE)
        const chooseMoveEvent = this.storeSocket.getMap().get(Can.CHOOSE_MOVE)
        const moveEvent = this.storeSocket.getMap().get(Can.MOVE)
        const endMoveEvent = this.storeSocket.getMap().get(Can.END_MOVE)
        const endTurnEvent = this.storeSocket.getMap().get(Can.END_TURN)
        const nextTurnEvent = this.storeSocket.getMap().get(Can.NEXT_TURN)
        const delays = [4000, 8000, 12000, 16000, 20000, 24000]
        console.log('map size : ', this.storeSocket.getMap())
        setTimeout(() => {
          // SEND_DICE
          this.setMessageByAction(`${this.localStore.getCurrentTurn().team} - ${this.localStore.getCurrentTurn().pseudo} send dice`)
          this.setDiceResult(chooseMoveEvent?.game.sessionStatusGame.currentTurnEntity.dice ?? -1)
          this.localStore.setSessionStatusGame(sendDiceEvent?.game.sessionStatusGame ?? null)
          this.setTurnStatus(Can.SEND_DICE)
        }, delays[0])
        setTimeout(() => {
          // CHOOSE_MOVE
          this.setMessageByAction(`${this.localStore.getCurrentTurn().team} - ${this.localStore.getCurrentTurn().pseudo} choose move`)
          const allMoves = chooseMoveEvent?.game.sessionStatusGame.currentTurnEntity.moves ?? []
          this.setallCanMovePosition(allMoves)
          this.localStore.setSessionStatusGame(chooseMoveEvent?.game.sessionStatusGame ?? null)
          this.setTurnStatus(Can.CHOOSE_MOVE)
        }, delays[1])
        setTimeout(() => {
          // MOVE
          this.setMessageByAction(`${this.localStore.getCurrentTurn().team} - ${this.localStore.getCurrentTurn().pseudo} move`)
          const findIndex = this.getCharacters().findIndex((character) => character.pseudo === this.localStore.getCurrentTurn().team)
          if (findIndex === -1) {
            return
          }
          let move = moveEvent?.game.sessionStatusGame.currentTurnEntity.move ?? {id: -1, x: -1, y: -1, value: -1}
          this.setallCanMovePosition([move])
          this.move(move, findIndex)
          this.localStore.setSessionStatusGame(moveEvent?.game.sessionStatusGame ?? null)
          this.setTurnStatus(Can.MOVE)
        }, delays[2])
        setTimeout(() => {
          // END_MOVE
          this.setMessageByAction(`${this.localStore.getCurrentTurn().team} - ${this.localStore.getCurrentTurn().pseudo} end move`)
          this.setDiceResult(-1)
          this.setallCanMovePosition([])
          this.setMove({id: -1, x: -1, y: -1, value: -1})
          this.localStore.setSessionStatusGame(endMoveEvent?.game.sessionStatusGame ?? null)
          this.setTurnStatus(Can.END_MOVE)
        }, delays[3])
        setTimeout(() => {
          // END_TURN
          this.setMessageByAction(`${this.localStore.getCurrentTurn().team} - ${this.localStore.getCurrentTurn().pseudo} end turn`)
          this.localStore.setSessionStatusGame(endTurnEvent?.game.sessionStatusGame ?? null)
          this.setTurnStatus(Can.END_TURN)
        }, delays[4])
        setTimeout(() => {
          // NEXT_TURN
          this.setMessageByAction(`${this.localStore.getCurrentTurn().team} - ${this.localStore.getCurrentTurn().pseudo} next turn`)
          console.log('next turn', nextTurnEvent?.game.sessionStatusGame.currentTurnEntity)
          this.localStore.setSessionStatusGame(nextTurnEvent?.game.sessionStatusGame ?? null)
          this.localStore.setCurrentTurn(nextTurnEvent?.game.sessionStatusGame.currentTurnEntity.turnEntity ?? null)
          this.setTurnStatus(Can.NEXT_TURN)
          this.storeSocket.botLeaveQueue()
          if (nextTurnEvent?.game.sessionStatusGame.currentTurnEntity.turnEntity.typeEntity === 'HUMAIN') {
            this.setCalled(true)
            this.setTimerValue(50)
            this.storeSocket.setMap(new Map<string, Session>())
            this.setTurnStatus(Can.WHO_IS_TURN)
            this.setMessageByAction(`${this.localStore.getCurrentTurn().team} - ${this.localStore.getCurrentTurn().pseudo} turn`)
          }
        }, delays[5])
      }, 1000)
    } else {
      if (this.getTurnStatus() === Can.NEXT_TURN) {
        this.setCalled(true)
        this.setTimerValue(50)
        this.storeSocket.setMap(new Map<string, Session>())
        this.setTurnStatus(Can.WHO_IS_TURN)
        this.setMessageByAction(`${this.localStore.getCurrentTurn().team} - ${this.localStore.getCurrentTurn().pseudo} turn`)
      }
    }
  }

  playerLogic() {
    if (this.localStore.getCurrentTurn().pseudo === this.localStore.getUser().pseudo) {
      switch (this.getTurnStatus()) {
        case Can.WHO_IS_TURN:
          console.log('WHO_IS_TURN')
          if (this.getCalled()) {
            this.setMessageByAction(`${this.localStore.getCurrentTurn().team} - ${this.localStore.getCurrentTurn().pseudo} turn`)
            this.storeSocket.humainTurnSuccessSend({
              ...this.localStore.getSessionStatusGame().currentTurnEntity,
              currentAction: Can.WHO_IS_TURN,
            })
            this.setCalled(false)
          } else {
            if (this.storeSocket.getMap().size === 1) {
              console.log('map size : ', this.storeSocket.getMap())
              this.setTurnStatus(Can.SEND_DICE)
              this.setCalled(true)
              this.setHiddenDice(true)
            }
          }
          break
        case Can.SEND_DICE:
          console.log('SEND_DICE')
          if (this.getCalled()) {
            this.setMessageByAction(`${this.localStore.getCurrentTurn().team} - ${this.localStore.getCurrentTurn().pseudo} send dice`)
            this.setCalled(false)
          } else {
            if (this.getDiceResult() !== -1 && this.storeSocket.getMap().size === 1) {
              this.storeSocket.humainTurnSuccessSend({
                ...this.localStore.getSessionStatusGame().currentTurnEntity,
                currentAction: Can.SEND_DICE,
                dice: this.getDiceResult(),
              })
            } else {
              if (this.storeSocket.getMap().size === 2) {
                console.log('map size : ', this.storeSocket.getMap())
                this.setTurnStatus(Can.CHOOSE_MOVE)
                this.setCalled(true)
              }
            }
          }
          break
        case Can.CHOOSE_MOVE:
          console.log('CHOOSE_MOVE')
          if (this.getCalled()) {
            this.setMessageByAction(`${this.localStore.getCurrentTurn().team} - ${this.localStore.getCurrentTurn().pseudo} choose move`)
            const allMoves = this.storeSocket.getMap().get(Can.CHOOSE_MOVE)?.game.sessionStatusGame.currentTurnEntity.moves ?? []
            this.setallCanMovePosition(allMoves)
            this.setCalled(false)
          } else {
            if (this.getMove().id !== -1 && this.storeSocket.getMap().size === 2) {
              this.storeSocket.humainTurnSuccessSend({
                ...this.localStore.getSessionStatusGame().currentTurnEntity,
                currentAction: Can.CHOOSE_MOVE,
                move: this.getMove()
              })
              this.setallCanMovePosition([this.getMove()])
            } else {
              if (this.storeSocket.getMap().size === 3) {
                this.setCalled(true)
                console.log('map size : ', this.storeSocket.getMap())
                this.setTurnStatus(Can.MOVE)
              }
            }
          }
          break;
        case Can.MOVE:
          console.log('MOVE')
          if (this.getCalled()) {
            const findIndex = this.getCharacters().findIndex((character) => character.pseudo === this.localStore.getCurrentTurn().team)
            if (findIndex === -1) {
              break
            }
            this.move(this.getMove(), findIndex)
            this.storeSocket.humainTurnSuccessSend({
              ...this.localStore.getSessionStatusGame().currentTurnEntity,
              currentAction: Can.MOVE,
            })
            this.setCalled(false)
          } else {
            if (this.storeSocket.getMap().size === 4) {
              console.log('map size : ', this.storeSocket.getMap())
              this.setMove({id: -1, x: -1, y: -1, value: -1})
              this.setallCanMovePosition([])
              this.setTurnStatus(Can.END_MOVE)
              this.setCalled(true)
            }
          }
          break;
        case Can.END_MOVE:
          console.log('END_MOVE')
          if (this.getCalled()) {
            this.setMessageByAction(`${this.localStore.getCurrentTurn().team} - ${this.localStore.getCurrentTurn().pseudo} end move`)
            this.storeSocket.humainTurnSuccessSend({
              ...this.localStore.getSessionStatusGame().currentTurnEntity,
              currentAction: Can.END_MOVE,
            })
            this.setCalled(false)
          } else {
            if (this.storeSocket.getMap().size === 5) {
              console.log('map size : ', this.storeSocket.getMap())
              this.setTurnStatus(Can.END_TURN)
              this.setCalled(true)
            }
          }
          break;
        case Can.END_TURN:
          console.log('END_TURN')
          if (this.getCalled()) {
            this.setMessageByAction(`${this.localStore.getCurrentTurn().team} - ${this.localStore.getCurrentTurn().pseudo} end turn`)
            this.storeSocket.humainTurnSuccessSend({
              ...this.localStore.getSessionStatusGame().currentTurnEntity,
              currentAction: Can.END_TURN,
            })
            this.setCalled(false)
          } else {
            if (this.storeSocket.getMap().size === 6) {
              console.log('map size : ', this.storeSocket.getMap())
              this.setTurnStatus(Can.NEXT_TURN)
              this.setCalled(true)
            }
          }
          break;
        case Can.NEXT_TURN:
          console.log('NEXT_TURN')
          const nextTurnEvent = this.storeSocket.getMap().get(Can.NEXT_TURN)?.game.sessionStatusGame ?? null
          const currentTurnEvent = this.storeSocket.getMap().get(Can.NEXT_TURN)?.game.sessionStatusGame.currentTurnEntity.turnEntity ?? null
          console.log('next turn', nextTurnEvent)
          console.log('current turn', currentTurnEvent)
          if (nextTurnEvent !== null && currentTurnEvent !== null) {
            this.localStore.setSessionStatusGame(nextTurnEvent)
            this.localStore.setCurrentTurn(currentTurnEvent)
            this.setMessageByAction(`${this.localStore.getCurrentTurn().team} - ${this.localStore.getCurrentTurn().pseudo} turn`)
            this.setTimerValue(50)
            this.storeSocket.setMap(new Map<string, Session>())
            this.setTurnStatus(Can.WHO_IS_TURN)
          }else{
            console.log('error next turn')
          }
          break
        default:
          console.log('error')
          console.log('get turn status : ', this.getTurnStatus())
          break;
      }
    } else {
      console.log('wait your turn')
    }
  }

  startStatus() {
    if (this.localStore.getNextStatus() === Can.WHO_IS_TURN && this.localStore.getNowStatus() === Can.WHO_IS_TURN) {
      return true
    } else return this.localStore.getNextStatus() === this.localStore.getNowStatus();
  }

  roolingStatus() {
    if (this.localStore.getSessionStatusGame().currentTurnEntity.currentAction === "") {
      this.setTurnStatus(Can.WHO_IS_TURN)
    } else {
      this.setTurnStatus(this.localStore.getSessionStatusGame().currentTurnEntity.currentAction)
    }
  }

  getIfUserPlay() {
    return this.localStore.getCurrentTurn().pseudo === this.localStore.getUser().pseudo &&
      this.localStore.getCurrentTurn().typeEntity === "HUMAIN";
  }

  stopTimer(): void {
    clearInterval(this.timer);
  }

  selectedMove(cell: Cells) {
    this.setMove(cell)
  }

  roollingDice() {
    let nombreAleatoire = Math.floor(Math.random() * 20) + 1;
    this.setDiceResult(nombreAleatoire);
  }

  lerp(start: number, end: number, t: number): number {
    return start * (1 - t) + end * t;
  }

  move(cell: Cells, indexCharacterInsideArray: number): void {
    const targetX = cell.y;
    const targetY = cell.x;
    let t = 0;
    const speed = 0.1; // Vous pouvez ajuster cette valeur pour changer la vitesse de l'animation

    const animate = () => {
      t += speed;
      this.getCharacters()[indexCharacterInsideArray].X = this.lerp(this.getCharacters()[indexCharacterInsideArray].X, targetX, t);
      this.getCharacters()[indexCharacterInsideArray].Y = this.lerp(this.getCharacters()[indexCharacterInsideArray].Y, targetY, t);
      // Si le personnage n'a pas encore atteint la destination, planifiez le prochain déplacement
      if (t < 1) {
        requestAnimationFrame(animate);
      } else {
        this.setNowPosition(true)
      }
    };
    animate();
  }

  initCharacters() {
    const players = this.localStore.getGame().teams
    const monsters = this.localStore.getGame().monsters
    const characters = [...players, ...monsters]
    let content: Array<Character> = []
    for (let i = 0; i < characters.length; i++) {
      if (characters[i].cellPosition.x !== -1 &&
        content.findIndex((character) => character.pseudo === characters[i].name) === -1
      ) {
        let character: Character = {
          pseudo: characters[i].name,
          X: characters[i].cellPosition.y,
          Y: characters[i].cellPosition.x,
          render: './../../assets/character/button.gif'
        }
        content.push(character)
      }
    }
    this.setCharacters(content)
  }

  movingToCellPosition(id: number) {
    let valid = this.getallCanMovePosition()
    return valid.some(cell => cell.id === id);
  }

  getTimerValue() {
    return this.timerValueSignal();
  }

  setTimerValue(value: number) {
    this.#timerValueSignal.set(value);
  }

  getTimer() {
    return this.timerSignal();
  }

  setTimer(value: any) {
    this.#timerSignal.set(value);
  }

  getDiceResult() {
    return this.diceResultSignal();
  }

  setDiceResult(value: number) {
    this.#diceResult.set(value);
    this.setHiddenDice(false)
  }

  getimgSrcCardOne() {
    return this.imgSrcCardOneSignal();
  }

  setimgSrcCardOne(value: string) {
    this.#imgSrcCardOne.set(value);
  }

  getimgSrcCardTwo() {
    return this.imgSrcCardTwoSignal();
  }

  setimgSrcCardTwo(value: string) {
    this.#imgSrcCardTwo.set(value);
  }

  getrarityCardOne() {
    return this.rarityCardOneSignal();
  }

  setrarityCardOne(value: string) {
    this.#rarityCardOne.set(value);
  }

  getrarityCardTwo() {
    return this.rarityCardTwoSignal();
  }

  setrarityCardTwo(value: string) {
    this.#rarityCardTwo.set(value);
  }

  getallCanMovePosition() {
    return this.allCanMovePositionSignal();
  }

  setallCanMovePosition(value: Array<Cells>) {
    this.#allCanMovePosition.set(value);
  }

  getMove() {
    return this.moveLocationSignal();
  }

  setMove(value: Cells) {
    this.#moveLocation.set(value);
  }

  getTurnStatus() {
    return this.turnStatusSignal();
  }

  setTurnStatus(value: string) {
    this.#turnStatus.set(value);
  }

  getCharacters() {
    return this.charactersSignal();
  }

  setCharacters(value: Array<Character>) {
    this.#characters.set(value);
  }

  getHiddenDice() {
    return this.hiddenDiceSignal();
  }

  setHiddenDice(value: boolean) {
    this.#hiddenDice.set(value);
  }

  getNowPosition() {
    return this.nowPositionSignal();
  }

  setNowPosition(value: boolean) {
    this.#nowPosition.set(value);
  }

  getMessageByAction() {
    return this.messageByActionSignal();
  }

  setMessageByAction(message: string) {
    this.#messageByAction.set(message);
  }

  getCalled() {
    return this.calledSignal();
  }

  setCalled(value: boolean) {
    this.#called.set(value);
  }
}
