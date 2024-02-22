import {effect, inject, Injectable} from "@angular/core";
import {SocketService} from "../../socket/socket.service";
import {StorageManagerApp} from "../../storageManagerApp/storageManagerApp";
import {UserGamePlay, UserIdentitiesGame, UserSocketConnect} from "../../../models/users.models";
import {DiceRolling} from "../../../models/room.content.models";
import {Cells} from "../../../models/maps.models";

@Injectable({
  providedIn: 'root',
})
export class DispatcherSocket {

  readonly apiSocketService = inject(SocketService)
  readonly #storeManagerApp = inject(StorageManagerApp);

  connect() {
    this.apiSocketService.connect()
  }

  listenAllSocket() {
    this.apiSocketService.socketCallReceived()
  }

  joinRoom() {
    this.apiSocketService.joinRoom()
  }

  joinSession(room: string) {
    const userSocketConnect: UserSocketConnect = {
      room: room,
      token: this.#storeManagerApp.getUser().token,
      pseudo: this.#storeManagerApp.getUser().pseudo,
    }
    this.apiSocketService.joinSession(userSocketConnect)
    setTimeout(() => {
      this.apiSocketService.joinRoom()
    },2000)
  }

  joinTeam(teamTag: number, cardPosition: number) {
    const positionInsideLobby = this.#storeManagerApp.getLobby().findIndex((player) => player.pseudo === this.#storeManagerApp.getUser().pseudo)
    const userIdentitiesGame: UserIdentitiesGame = {
      room: this.#storeManagerApp.getRoom(),
      positionPlayerInLobby: positionInsideLobby,
      teamSelected: teamTag,
      cardPositionInTeam: cardPosition
    }
    this.apiSocketService.joinTeam(userIdentitiesGame)
  }

  selectCard(cardIndex: number, teamTag: number, cardTag: number) {
    const userIdentitiesGame: UserIdentitiesGame = {
      room: this.#storeManagerApp.getRoom(),
      positionPlayerInLobby: this.#storeManagerApp.getLobby().findIndex((player) => player.pseudo === this.#storeManagerApp.getUser().pseudo),
      teamSelected: teamTag,
      cardPositionInTeam: cardTag,
      cardSelected: cardIndex
    }
    console.log('userIdentitiesGame', userIdentitiesGame)
    this.apiSocketService.selectCard(userIdentitiesGame)
  }


  startGame() {
    this.apiSocketService.startGame()
  }

  initChronoGame() {
    this.apiSocketService.initChronoGame()
  }

  checkTurn() {
    this.apiSocketService.checkTurn()
  }

  playingTurn() {
    const session = this.#storeManagerApp.getSession();
    const currentEntityActionMovingPosition = session.sessionStatusGame.currentEntityActionMovingPosition;
    const entityTurn = session.sessionStatusGame.entityTurn[currentEntityActionMovingPosition];

    // Check if entityTurn is defined
    if (!entityTurn) {
      console.error('entityTurn is not defined')
    }

    // Check if teamIndex and cardIndex are defined
    const teamIndex = entityTurn.resume?.teamIndex;
    const cardIndex = entityTurn.resume?.cardIndex;
    if (teamIndex === undefined || cardIndex === undefined) {
      console.error('teamIndex or cardIndex is not defined')
    }

    const challengerTeam = session.game.challenger[teamIndex];
    const cardInfo = challengerTeam?.cardsInfo?.[cardIndex];
    const typeEntity = entityTurn.resume.typeEntity

    const userGamePlay :UserGamePlay = {
      room: session.sessionStatusGame.room,
      action: entityTurn
    }
    this.apiSocketService.playingTurn(userGamePlay)
  }

  rollingDice() {
    const session = this.#storeManagerApp.getSession();
    const currentEntityActionMovingPosition = session.sessionStatusGame.currentEntityActionMovingPosition;
    const entityTurn = session.sessionStatusGame.entityTurn[currentEntityActionMovingPosition];
    // Check if entityTurn is defined
    if (!entityTurn) {
      console.error('entityTurn is not defined')
    }
    // Check if teamIndex and cardIndex are defined
    const teamIndex = entityTurn.resume?.teamIndex;
    const cardIndex = entityTurn.resume?.cardIndex;
    if (teamIndex === undefined || cardIndex === undefined) {
      console.error('teamIndex or cardIndex is not defined')
    }
    const challengerTeam = session.game.challenger[teamIndex];

    const diceRoll:DiceRolling = {
      room: this.#storeManagerApp.getRoom(),
      luk:challengerTeam.commonLuck,
      min:1,
      max:6,
      arrayLimit:[]
    }
    this.apiSocketService.rollingDice(diceRoll)
  }

  nextDiceValue(currentFace: number) {
    const session = this.#storeManagerApp.getSession();
    const currentEntityActionMovingPosition = session.sessionStatusGame.currentEntityActionMovingPosition;
    const entityTurn = session.sessionStatusGame.entityTurn[currentEntityActionMovingPosition];

    // Check if entityTurn is defined
    if (!entityTurn) {
      console.error('entityTurn is not defined')
    }

    // Check if teamIndex and cardIndex are defined
    const teamIndex = entityTurn.resume?.teamIndex;
    const cardIndex = entityTurn.resume?.cardIndex;
    if (teamIndex === undefined || cardIndex === undefined) {
      console.error('teamIndex or cardIndex is not defined')
    }

    const challengerTeam = session.game.challenger[teamIndex];
    const cardInfo = challengerTeam?.cardsInfo?.[cardIndex];
    const typeEntity = entityTurn.resume.typeEntity

    const userGamePlay :UserGamePlay = {
      room: session.sessionStatusGame.room,
      action: {
        resume: entityTurn.resume,
        evolving: {
          ...entityTurn.evolving,
          dice: currentFace
        }
      }
    }
    this.apiSocketService.playingTurn(userGamePlay)
  }

  move(id: number) {
    const session = this.#storeManagerApp.getSession();
    const currentEntityActionMovingPosition = session.sessionStatusGame.currentEntityActionMovingPosition;
    const entityTurn = session.sessionStatusGame.entityTurn[currentEntityActionMovingPosition];

    // Check if entityTurn is defined
    if (!entityTurn) {
      console.error('entityTurn is not defined')
    }

    // Check if teamIndex and cardIndex are defined
    const teamIndex = entityTurn.resume?.teamIndex;
    const cardIndex = entityTurn.resume?.cardIndex;
    if (teamIndex === undefined || cardIndex === undefined) {
      console.error('teamIndex or cardIndex is not defined')
    }

    const challengerTeam = session.game.challenger[teamIndex];
    const cardInfo = challengerTeam?.cardsInfo?.[cardIndex];
    const typeEntity = entityTurn.resume.typeEntity

    const userGamePlay :UserGamePlay = {
      room: session.sessionStatusGame.room,
      action: {
        resume: entityTurn.resume,
        evolving: {
          ...entityTurn.evolving,
          moveToId: id
        }
      }
    }
    this.apiSocketService.playingTurn(userGamePlay)
  }

  playingTurnBot() {
    const session = this.#storeManagerApp.getSession();
    const currentEntityActionMovingPosition = session.sessionStatusGame.currentEntityActionMovingPosition;
    const entityTurn = session.sessionStatusGame.entityTurn[currentEntityActionMovingPosition];

    // Check if entityTurn is defined
    if (!entityTurn) {
      console.error('entityTurn is not defined')
    }

    // Check if teamIndex and cardIndex are defined
    const teamIndex = entityTurn.resume?.teamIndex;
    const cardIndex = entityTurn.resume?.cardIndex;
    if (teamIndex === undefined || cardIndex === undefined) {
      console.error('teamIndex or cardIndex is not defined')
    }

    const challengerTeam = session.game.challenger[teamIndex];
    const cardInfo = challengerTeam?.cardsInfo?.[cardIndex];
    const typeEntity = entityTurn.resume.typeEntity

    const userGamePlay :UserGamePlay = {
      room: session.sessionStatusGame.room,
      action: entityTurn
    }
    this.apiSocketService.playingTurnBot(userGamePlay)
  }

  resetChronoGame() {
    this.apiSocketService.resetChronoGame()
  }

  botSelectedMove(movingCellList: Array<Cells>) {
    this.apiSocketService.botSelectedMove(movingCellList)
  }

  // Getters
  // getDiceValue() {
  //   return this.apiSocketService.getDiceRollingValue()
  // }


}
