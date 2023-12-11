import {inject, Injectable, signal} from "@angular/core";
import {LocalstorageServices} from "../../services/localsotrage/localstorage.services";
import {StoreServicesSocket} from "../../services/store-Socket/store.services.socket";
import {Cells} from "../../models/maps.models";
import {Can} from "../../models/emus";
import {Character} from "../../models/player.models";
import {SocketEndpoint} from "../../app/socket.endpoint";
import {Game, Session, SessionGame, SessionStatusGame} from "../../models/room.content.models";
import {CurrentTurnAction} from "../../models/formatSocket.models";

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
  readonly #moveLocation = signal<Cells>({id: -1, x: -1, y: -1, value: 0,})
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
    this.localStore.setCurrentTurn(this.localStore.getSessionStatusGame().entityTurn[0])
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
        this.timerEvolving()
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
    // Computer turn
    if (type) {
      if (this.getCalled()) {
        this.setCalled(false)
        this.storeSocket.botTurnSuccessSend()
        // WAITING RECEIVE DATA
        setTimeout(() => {
          console.log('map : ', this.storeSocket.getMap())
          if (this.storeSocket.getMap().size === 6) {
            let dice = this.storeSocket.getMap().get(Can.CHOOSE_MOVE)?.game.sessionStatusGame.currentTurnEntity.dice ?? -1
            let moves = this.storeSocket.getMap().get(Can.CHOOSE_MOVE)?.game.sessionStatusGame.currentTurnEntity.moves ?? []
            let move = this.storeSocket.getMap().get(Can.MOVE)?.game.sessionStatusGame.currentTurnEntity.move ?? {
              id: -1,
              x: -1,
              y: -1,
              value: 0,
            }
            let next = this.storeSocket.getMap().get(Can.NEXT_TURN)?.game.sessionStatusGame.currentTurnEntity
            let session: SessionStatusGame | null = null
            let game: Game | null = null
            // SEND DICE
            setTimeout(() => {
              this.setMessageByAction(`Computer ${this.localStore.getCurrentTurn().team}-${this.localStore.getCurrentTurn().pseudo} send dice`)
              this.setDiceResult(dice)
              this.setTurnStatus(Can.SEND_DICE)
              session = this.storeSocket.getMap().get(Can.SEND_DICE)?.game.sessionStatusGame ?? null
              game = this.storeSocket.getMap().get(Can.SEND_DICE)?.game.game ?? null
              this.localStore.setGame(game)
              this.localStore.setSessionStatusGame(session)
            }, 6000)
            // CHOOSE MOVE
            setTimeout(() => {
              this.setMessageByAction(`Computer ${this.localStore.getCurrentTurn().team}-${this.localStore.getCurrentTurn().pseudo} choose move`)
              this.setallCanMovePosition(moves)
              this.setTurnStatus(Can.CHOOSE_MOVE)
            }, 8000)
            // MOVE
            setTimeout(() => {
              this.setMessageByAction(`Computer ${this.localStore.getCurrentTurn().team}-${this.localStore.getCurrentTurn().pseudo} move`)
              this.setallCanMovePosition([move])
              this.setTurnStatus(Can.MOVE)
            }, 15000)
            // END MOVE
            setTimeout(() => {
              this.setMessageByAction(`Computer ${this.localStore.getCurrentTurn().team}-${this.localStore.getCurrentTurn().pseudo} end move`)
              let findIndex = this.getCharacters().findIndex((character) => character.pseudo === this.localStore.getCurrentTurn().team)
              this.move(move, findIndex)
              this.setTurnStatus(Can.END_MOVE)
            }, 20000)
            // END TURN
            setTimeout(() => {
              this.setMessageByAction(`Computer ${this.localStore.getCurrentTurn().team}-${this.localStore.getCurrentTurn().pseudo} end turn`)
              this.setDiceResult(-1)
              this.setallCanMovePosition([])
              this.storeSocket.setMap(new Map<string, Session>())
              this.setTurnStatus(Can.NEXT_TURN)
              if (next?.turnEntity.typeEntity === 'HUMAIN') {
                this.setCalled(true)
                this.setTimer(0)
                this.localStore.setCurrentTurn(next.turnEntity)
              }
              this.setCalled(true)
              this.setTimer(0)
            }, 25000)
          }
        }, 4000);
      }
    }
    // Humain turn
    else {
      if (this.localStore.getCurrentTurn().pseudo === this.localStore.getUser().pseudo) {
        switch (this.getTurnStatus()) {
          case Can.WHO_IS_TURN:
            console.log('inside who is turn')
            if (this.getCalled()) {
              this.setMessageByAction(`${this.localStore.getCurrentTurn().team} - ${this.localStore.getCurrentTurn().pseudo} turn`)
              this.storeSocket.humainTurnSuccessSend({
                turnEntity: this.localStore.getCurrentTurn(),
                currentAction: Can.WHO_IS_TURN,
                dice: -1,
                moves: [],
                move: {
                  id: -1,
                  x: -1,
                  y: -1,
                  value: 0,
                }
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
          case Can.NEXT_TURN:
            console.log('inside next turn')
            if (this.getCalled()) {
              this.storeSocket.humainTurnSuccessSend({
                turnEntity: this.localStore.getCurrentTurn(),
                currentAction: Can.WHO_IS_TURN,
                dice: -1,
                moves: [],
                move: {
                  id: -1,
                  x: -1,
                  y: -1,
                  value: 0,
                }
              })
              let turnEntity = this.storeSocket.getMap().get(Can.SEND_DICE)?.game.sessionStatusGame.currentTurnEntity.turnEntity ?? null
              if (turnEntity !== null) {
                this.localStore.setCurrentTurn(turnEntity)
              } else {
                console.log('inside next turn')
              }
              this.setCalled(false)
            } else {
              console.log('wait your turn')
              // if(this.storeSocket.getMap().get())
            }
            break;
          case Can.SEND_DICE:
            if (this.getCalled()) {
              this.setMessageByAction(`${this.localStore.getCurrentTurn().team} - ${this.localStore.getCurrentTurn().pseudo} send dice`)
              this.setCalled(false)
            } else {
              if (this.getDiceResult() !== -1) {
                this.setTurnStatus(Can.CHOOSE_MOVE)
                this.storeSocket.humainTurnSuccessSend({
                  turnEntity: this.localStore.getCurrentTurn(),
                  currentAction: Can.CHOOSE_MOVE,
                  dice: this.getDiceResult(),
                  moves: [],
                  move: {
                    id: -1,
                    x: -1,
                    y: -1,
                    value: 0,
                  }
                })
                this.setDiceResult(-1)
              }else{
                if(this.storeSocket.getMap().size === 2){
                  console.log('map size : ', this.storeSocket.getMap())
                  this.setTurnStatus(Can.CHOOSE_MOVE)
                  this.setCalled(true)
                }
              }
            }
            break
          case Can.CHOOSE_MOVE:
            console.log('CHOOSE_MOVE')
            break;
          // case Can.WHO_IS_TURN:
          //   console.log('WHO_IS_TURN')
          //   break;
          // case Can.SEND_DICE:
          //   if(this.getCalled()) {
          //     this.setTurnStatus(Can.SEND_DICE)
          //     this.setHiddenDice(true)
          //     this.setCalled(false)
          //   }else{
          //     if(this.getDiceResult() !== -1){
          //       this.setTurnStatus(Can.CHOOSE_MOVE)
          //       this.storeSocket.humainTurnSuccessSend({
          //         turnEntity: this.localStore.getCurrentTurn(),
          //         currentAction: Can.CHOOSE_MOVE,
          //         dice: this.getDiceResult(),
          //         moves: [],
          //         move: {
          //           id: -1,
          //           x: -1,
          //           y: -1,
          //           value: 0,
          //         }
          //       })
          //       this.setCalled(true)
          //     }
          //   }
          //   break;

          // case Can.MOVE:
          //   console.log('MOVE')
          //   break;
          // case Can.END_MOVE:
          //   console.log('END_MOVE')
          //   break;
          // case Can.END_TURN:
          //   console.log('END_TURN')
          //   break;
          //
          // case Can.END_GAME:
          //   console.log('END_GAME')
          //   break;
          default:
            console.log('error')
            console.log('get turn status : ', this.getTurnStatus())
            break;
        }
      } else {
        console.log('wait your turn')
      }
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
