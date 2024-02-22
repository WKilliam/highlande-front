import {effect, inject, Injectable, OnInit} from "@angular/core";
import {StorageManagerApp} from "../../services/storageManagerApp/storageManagerApp";
import {DispatcherSocket} from "../../services/dispatchers/dispatcher-socket/dispatcher-socket";
import {Can} from "../../models/enums";
import {DiceService} from "../../ui/services/dice/dice";
import {Utils} from "../../services/utils";
import {CellsServices} from "../../ui/services/cell/cells.services";
import {EntityActionMoving} from "../../models/actions.game.models";
import {MapsModels} from "../../models/maps.models";

@Injectable({
  providedIn: 'root',
})
export class GameSessionServices {

  readonly #storageManagerApp = inject(StorageManagerApp);
  readonly #dispatcherSocket = inject(DispatcherSocket);
  readonly #diceService = inject(DiceService);
  readonly #cellsService = inject(CellsServices);

  constructor() {
    if (this.#storageManagerApp.getSession().sessionStatusGame.currentEntityActionMovingPosition === -1) {
      this.#dispatcherSocket.checkTurn()
    }else{
      this.#dispatcherSocket.playingTurn()
    }
    effect(() => {
      console.log('effect', this.#storageManagerApp.getSession())
      const currentIndex = this.#storageManagerApp.getSession().sessionStatusGame.currentEntityActionMovingPosition
      if(currentIndex !== -1){
        const currentEntity = this.#storageManagerApp.getSession().sessionStatusGame.entityTurn[currentIndex]
        switch (currentEntity.resume.typeEntity){
          case 'HUMAIN':
            this.humainPlayingTurn(currentEntity)
            break
          case 'COMPUTER':
            this.computerPlayingTurn(currentEntity)
            break
          default:
            console.log('default message by action', currentEntity.evolving.currentCan, ' ...')
            break
        }
      }
    });
  }

  humainPlayingTurn(currentEntity:EntityActionMoving) {
    switch (currentEntity.evolving.currentCan) {
      case Can.NULL:
        console.log('NULL')
        this.#dispatcherSocket.playingTurn()
        break;
      case Can.START_TURN:
        console.log('START_TURN')
        this.#dispatcherSocket.playingTurn()
        this.#dispatcherSocket.initChronoGame()
        break;
      case Can.SEND_DICE:
        console.log('SEND_DICE')
        break;
      case Can.CHOOSE_MOVE:
        console.log('CHOOSE_MOVE')
        this.#cellsService.movingCellList = currentEntity.evolving.movesCansIds ?? []
        break;
      case Can.MOVE:
        console.log('MOVE')
        this.#dispatcherSocket.playingTurn()
        break;
      case Can.FINISH_TURN:
        this.#dispatcherSocket.resetChronoGame()
        this.#dispatcherSocket.checkTurn()

        break;
      default:
        console.log('default message by action', this.#storageManagerApp.getSession().sessionStatusGame.entityTurn[this.#storageManagerApp.getSession().sessionStatusGame.currentEntityActionMovingPosition].evolving.currentCan, ' ...')
        break;
    }
  }

  private computerPlayingTurn(currentEntity: EntityActionMoving) {
    switch (currentEntity.evolving.currentCan) {
      case Can.NULL:
        console.log('NULL')
        this.#dispatcherSocket.playingTurnBot()
        break;
      case Can.START_TURN:
        console.log('START_TURN')
        this.#dispatcherSocket.playingTurnBot()
        break;
      case Can.SEND_DICE:
        console.log('SEND_DICE')
        this.#diceService.rollDice()
        break;
      case Can.CHOOSE_MOVE:
        console.log('CHOOSE_MOVE')
        this.#cellsService.movingCellList = currentEntity.evolving.movesCansIds ?? []
        this.#dispatcherSocket.botSelectedMove(this.#cellsService.movingCellList)
        break;
      case Can.MOVE:
        console.log('MOVE')
        this.#dispatcherSocket.playingTurnBot()
        break;
      case Can.FINISH_TURN:
        this.#dispatcherSocket.resetChronoGame()
        this.#dispatcherSocket.checkTurn()
        break;
      default:
        console.log('default message by action', this.#storageManagerApp.getSession().sessionStatusGame.entityTurn[this.#storageManagerApp.getSession().sessionStatusGame.currentEntityActionMovingPosition].evolving.currentCan, ' ...')
        break;
    }
  }


  getImgCardByValue(position: number) {
    const user = this.#storageManagerApp.getUser()
    let data = {
      cardImage: ''
    }
    this.#storageManagerApp.getSession().game.challenger.forEach((challenger) => {
      challenger.cardsInfo?.forEach((card, index) => {
        if (card.player.avatar === user.avatar && card.player.pseudo === user.pseudo && index === position) {
          data = {
            cardImage: card.imageSrc
          }
        }
      })
    })
    switch (position) {
      case 0:
        return data.cardImage === '' ? "https://cdn.discordapp.com/attachments/1060501071056879618/1168479278174830602/kyrasw_the_frame_of_a_back_tarot_card_game_rpg_in_png_format_or_379c9eb1-9bea-4ea4-bd56-c5629407e849.png?ex=65645f21&is=6551ea21&hm=d18e7e7f839624cb7c13e4137e8b18ebd37daa96993f61ff4bd6399a1a688ef6&" : data.cardImage;
      case 1:
        return data.cardImage === '' ? "https://cdn.discordapp.com/attachments/1060501071056879618/1168479278174830602/kyrasw_the_frame_of_a_back_tarot_card_game_rpg_in_png_format_or_379c9eb1-9bea-4ea4-bd56-c5629407e849.png?ex=65645f21&is=6551ea21&hm=d18e7e7f839624cb7c13e4137e8b18ebd37daa96993f61ff4bd6399a1a688ef6&" : data.cardImage;
      default:
        return "https://cdn.discordapp.com/attachments/1060501071056879618/1168479278174830602/kyrasw_the_frame_of_a_back_tarot_card_game_rpg_in_png_format_or_379c9eb1-9bea-4ea4-bd56-c5629407e849.png?ex=65645f21&is=6551ea21&hm=d18e7e7f839624cb7c13e4137e8b18ebd37daa96993f61ff4bd6399a1a688ef6&";
    }
  }

  getRarityCardByValue(position: number) {
    const user = this.#storageManagerApp.getUser()
    let data = {
      rarity: ''
    }
    this.#storageManagerApp.getSession().game.challenger.forEach((challenger) => {
      challenger.cardsInfo?.forEach((card, index) => {
        if (card.player.avatar === user.avatar && card.player.pseudo === user.pseudo && index === position) {
          data = {
            rarity: card.rarity.toLowerCase()
          }
        }
      })
    })
    switch (position) {
      case 0:
        return data.rarity === '' ? "common" : data.rarity;
      case 1:
        return data.rarity === '' ? "common" : data.rarity;
      default:
        return "common";
    }
  }

  getCountTurn() {
    const count = this.#storageManagerApp.getSession().sessionStatusGame.turnCount
    if (count === undefined) {
      return 0
    }else{
      return count
    }
  }

  getCurrentEntityPlaying() {
    const currentPosition = this.#storageManagerApp.getSession().sessionStatusGame.currentEntityActionMovingPosition
    const entity = this.#storageManagerApp.getSession().sessionStatusGame.entityTurn[currentPosition]
    const name = this.#storageManagerApp.getSession().game.challenger[entity.resume.teamIndex].name
    if (name === undefined) {
      return 'Waiting for start logic ...'
    }else{
      return name
    }
  }

  getTimerValue() {
    return this.#storageManagerApp.getTimer()
  }

  getStatusCurrentEntity() {
    const status = this.#storageManagerApp.getSession().sessionStatusGame.entityTurn[this.#storageManagerApp.getSession().sessionStatusGame.currentEntityActionMovingPosition]
    if (status === undefined) {
      return {
        evolving: {
          currentCan: Can.NULL
        }
      }
    }
    return status
  }

  getMessageByAction() {
    const status = this.getStatusCurrentEntity()
    switch (status.evolving.currentCan) {
      case Can.NULL:
        return 'Waiting for start logic ...'
      case Can.START_TURN:
        return 'Entity starting turn ...'
      case Can.SEND_DICE:
        return 'Entity sending dice ...'
      case Can.CHOOSE_MOVE:
        return 'Entity choosing move ...'
      case Can.MOVE:
        return 'Entity moving ...'
      case Can.FINISH_TURN:
        return 'Entity finishing turn ...'
      case Can.START_FIGHT:
      default:
        return `default message by action ${status.evolving.currentCan} ...`
    }
  }

  getValueDice() {
    return this.#diceService.currentFace
  }

  itYourTurnPleasePrintDice() {
    const session = this.#storageManagerApp.getSession();
    const currentEntityActionMovingPosition = session.sessionStatusGame.currentEntityActionMovingPosition;
    const entityTurn = session.sessionStatusGame.entityTurn[currentEntityActionMovingPosition];

    // Check if entityTurn is defined
    if (!entityTurn) {
      return false;
    }

    // Check if teamIndex and cardIndex are defined
    const teamIndex = entityTurn.resume?.teamIndex;
    const cardIndex = entityTurn.resume?.cardIndex;
    if (teamIndex === undefined || cardIndex === undefined) {
      return false;
    }

    const challengerTeam = session.game.challenger[teamIndex];
    const cardInfo = challengerTeam?.cardsInfo?.[cardIndex];

    if (!cardInfo) {
      return false; // No card info
    }

    const playerPseudo = cardInfo.player?.pseudo;
    const userPseudo = this.#storageManagerApp.getUser().pseudo;

    return playerPseudo === userPseudo;
  }

  getCommonHP() {
    const user = this.#storageManagerApp.getUser()
    let data = {
      commonHp: 0,
      maxCommonHp: 0
    }
    this.#storageManagerApp.getSession().game.challenger.forEach((challenger) => {
      challenger.cardsInfo?.forEach((card, index) => {
        if (card.player.avatar === user.avatar && card.player.pseudo === user.pseudo) {
          data = {
            commonHp: challenger.commonLife,
            maxCommonHp: challenger.commonMaxLife
          }
        }
      })
    })
    return Utils.calculatePercentage(data.commonHp, data.maxCommonHp)
  }

}
