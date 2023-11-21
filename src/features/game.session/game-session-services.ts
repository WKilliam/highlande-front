import {inject, Injectable, signal} from "@angular/core";
import {LocalstorageServices} from "../../services/localsotrage/localstorage.services";
import {StoreServicesSocket} from "../../services/store-Socket/store.services.socket";
import {Cells} from "../../models/maps.models";
import {Can} from "../../models/emus";
import {CurrentTurnAction} from "../../models/formatSocket.models";
import {Character} from "../../models/player.models";

@Injectable({
  providedIn: 'root',
})
export class GameSessionServices {

  private timerValue = 5;
  private timer: any;
  private isChooseMoveCompleted = false;
  private isInitialCountdownStarted = false;
  readonly localStore: LocalstorageServices = inject(LocalstorageServices)
  private readonly imgSrcCard = 'https://cdn.discordapp.com/attachments/1060501071056879618/1168479278174830602/kyrasw_the_frame_of_a_back_tarot_card_game_rpg_in_png_format_or_379c9eb1-9bea-4ea4-bd56-c5629407e849.png?ex=65645f21&is=6551ea21&hm=d18e7e7f839624cb7c13e4137e8b18ebd37daa96993f61ff4bd6399a1a688ef6&'
  private storeSocket: StoreServicesSocket = inject(StoreServicesSocket)

  readonly #timerValueSignal = signal<number>(5);
  readonly #timerSignal = signal<any>(null);
  readonly #imgSrcCardOne = signal('')
  readonly #imgSrcCardTwo = signal('')
  readonly #rarityCardOne = signal('')
  readonly #rarityCardTwo = signal('')
  readonly #diceResult = signal(-1)
  readonly #allCanMovePosition = signal<Array<Cells>>([])
  readonly #moveLocation = signal<Cells>({id: -1, x: -1, y: -1, value: 0,})
  readonly #turnStatus = signal<string>(Can.START)
  readonly #characters = signal<Array<Character>>([])
  readonly #hiddenDice = signal<boolean>(false)
  readonly #nowPosition = signal<boolean>(false)


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

  constructor() {
    const position = this.localStore.getPlayerPosition()
    this.initCharacters()
    this.storeSocket.joinRoom({room: this.localStore.getCurrentRoom(), token: this.localStore.getUser().token})
    this.storeSocket.joinRoom({room: this.localStore.getCurrentRoom(), token: this.localStore.getUser().token})
    const cards = this.localStore.getGame().teams[position.teamTag].cardsPlayer ?? []
    if (position !== null) {
      this.setimgSrcCardOne(cards[0].imageSrc === '' ? this.imgSrcCard : cards[0].imageSrc)
      this.setimgSrcCardTwo(cards[1].imageSrc === '' ? this.imgSrcCard : cards[1].imageSrc)
      this.setrarityCardOne(cards[0].rarity.toLowerCase() === '' ? 'common' : cards[0].rarity.toLowerCase())
      this.setrarityCardTwo(cards[1].rarity.toLowerCase() === '' ? 'common' : cards[1].rarity.toLowerCase())
    }
    this.timerEvolving()
  }

  timerEvolving() {
    let isMethodCalled = true;
    this.timer = setInterval(() => {
      if (this.getTimerValue() > 0) {
        this.setTimerValue(this.getTimerValue() - 1)
        switch (this.getTurnStatus()) {
          case Can.START:
            if(this.localStore.getSessionStatusGame().entityTurn.length === 0){
              this.storeSocket.createTurnList()
              this.storeSocket.whoIsTurn()
            }else{
              this.storeSocket.whoIsTurn()
            }
            break;
          case Can.SEND_DICE:
            if(this.localStore.getCurrentTurn().turnEntity.typeEntity === 'HUMAIN'){
              const teamName = this.localStore.getGame().teams[this.localStore.getPlayerPosition().teamTag].name
              const cardContent = this.localStore.getGame().teams[this.localStore.getPlayerPosition().teamTag].cardsPlayer ?? []
              const nameUser =  cardContent[this.localStore.getPlayerPosition().cardTag]?.player?.pseudo ?? ''
              if(nameUser !== '' && this.localStore.getSessionStatusGame().entityTurn[0].pseudo === `${teamName}-${nameUser}`){
                this.setHiddenDice(true)
                const diceResult = this.getDiceResult();
                if (diceResult !== -1 && this.getTimerValue() > 0) {
                  let currentTurn = {
                    ...this.localStore.getCurrentTurn(),
                    dice: this.getDiceResult(),
                  };
                  this.storeSocket.sendDice(currentTurn);
                  this.setallCanMovePosition(this.localStore.getCurrentTurn().moves)
                  if(this.localStore.getCurrentTurn().moves.length !== 0){
                    this.switchStatusByCurrentStatus()
                  }
                }
              }
            }else{
              this.roollingDice()
              let currentTurn = {
                ...this.localStore.getCurrentTurn(),
                dice: this.getDiceResult(),
              };
              this.storeSocket.sendDice(currentTurn);
              if(this.localStore.getCurrentTurn().moves.length !== 0){
                this.switchStatusByCurrentStatus()
              }
            }
            break
          case Can.CHOOSE_MOVE:
            if(this.localStore.getCurrentTurn().turnEntity.typeEntity === 'HUMAIN'){
              const teamName = this.localStore.getGame().teams[this.localStore.getPlayerPosition().teamTag].name
              const cardContent = this.localStore.getGame().teams[this.localStore.getPlayerPosition().teamTag].cardsPlayer ?? []
              const nameUser =  cardContent[this.localStore.getPlayerPosition().cardTag]?.player?.pseudo ?? ''
              if(nameUser !== '' && this.localStore.getSessionStatusGame().entityTurn[0].pseudo === `${nameUser}-${teamName}`){
                this.setHiddenDice(false)
                const moving = this.getMove()
                if (moving.id !== -1 && this.getTimerValue() > 0) {
                  let currentTurn = {
                    ...this.localStore.getCurrentTurn(),
                    move: this.getMove(),
                  };
                  this.storeSocket.chooseMove(currentTurn);
                  if(this.getMove().id !== -1){
                    this.switchStatusByCurrentStatus()
                  }
                }
              }
            }else{
              this.storeSocket.chooseMove(this.localStore.getCurrentTurn());
              if(this.localStore.getCurrentTurn().move.id !== -1){
                this.switchStatusByCurrentStatus()
              }
            }
            break;
          case Can.MOVE:
            let characters = this.getCharacters()
            if(this.localStore.getSessionStatusGame().entityTurn[0].typeEntity === 'HUMAIN'){
              const name = this.localStore.getSessionStatusGame().entityTurn[0].pseudo.split('-')[0]
              if(characters.findIndex((character) => character.pseudo === name) !== -1){
                let index = characters.findIndex((character) => character.pseudo === name)
                this.move(this.getMove(),index)
                if(this.getMove().id !== -1){
                  this.switchStatusByCurrentStatus()
                }
              }
            }else if(this.localStore.getSessionStatusGame().entityTurn[0].typeEntity === 'COMPUTER'){
              const name = this.localStore.getSessionStatusGame().entityTurn[0].pseudo
              if(characters.findIndex((character) => character.pseudo === name) !== -1){
                let index = characters.findIndex((character) => character.pseudo === name)
                this.move(this.localStore.getCurrentTurn().move,index)
              }
            }
            break;
          case Can.END_MOVE:
            if(this.nowPositionSignal()){
              console.log('end move')
              this.setallCanMovePosition([])
              this.setDiceResult(-1)
              this.setMove({id: -1, x: -1, y: -1, value: 0,})
              // this.storeSocket.endMove(this.localStore.getCurrentTurn())
              this.switchStatusByCurrentStatus()
            }else{
              console.log('wait')
            }
            break;
          case Can.END_TURN:
            this.switchStatusByCurrentStatus()
            break;
        }
      } else {
        isMethodCalled = true
        this.switchStatusByCurrentStatus()
      }
    }, 1000);
  }

  switchStatusByCurrentStatus() {
    this.stopTimer()
    switch (this.getTurnStatus()) {
      case Can.START:
        this.setTimerValue(15)
        this.timerEvolving()
        this.setTurnStatus(Can.SEND_DICE)
        break;
      case Can.SEND_DICE:
        if(this.localStore.getCurrentTurn().dice === -1){
          this.setTurnStatus(Can.END_TURN)
        }else{
          this.setTimerValue(8)
          this.timerEvolving()
          this.setTurnStatus(Can.CHOOSE_MOVE)
        }
        break
      case Can.CHOOSE_MOVE:
        if(this.localStore.getCurrentTurn().turnEntity.typeEntity === 'HUMAIN'){
          if(this.getallCanMovePosition().length === 0){
            this.setTurnStatus(Can.END_TURN)
          }else{
            this.setTimerValue(8)
            this.timerEvolving()
            this.setTurnStatus(Can.MOVE)
          }
        }else{
          this.setTimerValue(8)
          this.timerEvolving()
          this.setTurnStatus(Can.MOVE)
        }
        break;
      case Can.MOVE:
        this.setTimerValue(8)
        this.timerEvolving()
        this.setTurnStatus(Can.END_MOVE)
        break;
      case Can.END_MOVE:
        this.setTimerValue(8)
        this.timerEvolving()
        this.setTurnStatus(Can.END_TURN)
        break;
      case Can.END_TURN:
        this.setTimerValue(8)
        this.timerEvolving()
        this.setTurnStatus(Can.START)
        break;
    }
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

  move(cell: Cells,index:number): void {
    const targetX = cell.y;
    const targetY = cell.x;
    let t = 0;
    const speed = 0.1; // Vous pouvez ajuster cette valeur pour changer la vitesse de l'animation

    const animate = () => {
      t += speed;
      this.getCharacters()[index].X = this.lerp(this.getCharacters()[index].X, targetX, t);
      this.getCharacters()[index].Y = this.lerp(this.getCharacters()[index].Y, targetY, t);
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
}
