import {inject, Injectable, signal} from "@angular/core";
import {StorageManagerApp} from "../../../services/storageManagerApp/storageManagerApp";
import {DispatcherSocket} from "../../../services/dispatchers/dispatcher-socket/dispatcher-socket";
import {Utils} from "../../../services/utils";

@Injectable({
  providedIn: 'root'
})
export class TeamCardUiServices {

  readonly #storageManagerApp = inject(StorageManagerApp)
  readonly stringImage = 'https://cdn.discordapp.com/attachments/1060501071056879618/1168479278174830602/kyrasw_the_frame_of_a_back_tarot_card_game_rpg_in_png_format_or_379c9eb1-9bea-4ea4-bd56-c5629407e849.png?ex=65d31d21&is=65c0a821&hm=283eec15deb0af4cde30532cce3bb56ec6f43acc88e8903b21bc2cac941502b8&'
  readonly #dispatcherSocket = inject(DispatcherSocket)


  // team 0
  readonly #teamNameTag0 = signal<string>('')
  readonly #eventTeamName0 = this.#teamNameTag0.asReadonly()
  readonly #teamAtkTag0 = signal<number>(-1)
  readonly #eventTeamAtk0 = this.#teamAtkTag0.asReadonly()
  readonly #teamDefTag0 = signal<number>(-1)
  readonly #eventTeamDef0 = this.#teamDefTag0.asReadonly()
  readonly #teamSpd0 = signal<number>(-1)
  readonly #eventTeamSpd0 = this.#teamSpd0.asReadonly()
  readonly #teamLuck0 = signal<number>(-1)
  readonly #eventTeamLuck0 = this.#teamLuck0.asReadonly()
  readonly #teamImageOne0 = signal<string>(this.stringImage)
  readonly #eventTeamImageOne0 = this.#teamImageOne0.asReadonly()
  readonly #teamImageTwo0 = signal<string>(this.stringImage)
  readonly #eventTeamImageTwo0 = this.#teamImageTwo0.asReadonly()
  readonly #teamRarityCardOne0 = signal<string>('common')
  readonly #eventTeamRarityCardOne0 = this.#teamRarityCardOne0.asReadonly()
  readonly #teamRarityCardTwo0 = signal<string>('common')
  readonly #eventTeamRarityCardTwo0 = this.#teamRarityCardTwo0.asReadonly()

  // team 1
  readonly #teamNameTag1 = signal<string>('')
  readonly #eventTeamName1 = this.#teamNameTag1.asReadonly()
  readonly #teamAtkTag1 = signal<number>(-1)
  readonly #eventTeamAtk1 = this.#teamAtkTag1.asReadonly()
  readonly #teamDefTag1 = signal<number>(-1)
  readonly #eventTeamDef1 = this.#teamDefTag1.asReadonly()
  readonly #teamSpd1 = signal<number>(-1)
  readonly #eventTeamSpd1 = this.#teamSpd1.asReadonly()
  readonly #teamLuck1 = signal<number>(-1)
  readonly #eventTeamLuck1 = this.#teamLuck1.asReadonly()
  readonly #teamImageOne1 = signal<string>(this.stringImage)
  readonly #eventTeamImageOne1 = this.#teamImageOne1.asReadonly()
  readonly #teamImageTwo1 = signal<string>(this.stringImage)
  readonly #eventTeamImageTwo1 = this.#teamImageTwo1.asReadonly()
  readonly #teamRarityCardOne1 = signal<string>('common')
  readonly #eventTeamRarityCardOne1 = this.#teamRarityCardOne1.asReadonly()
  readonly #teamRarityCardTwo1 = signal<string>('common')
  readonly #eventTeamRarityCardTwo1 = this.#teamRarityCardTwo1.asReadonly()

  // team 2
  readonly #teamNameTag2 = signal<string>('')
  readonly #eventTeamName2 = this.#teamNameTag2.asReadonly()
  readonly #teamAtkTag2 = signal<number>(-1)
  readonly #eventTeamAtk2 = this.#teamAtkTag2.asReadonly()
  readonly #teamDefTag2 = signal<number>(-1)
  readonly #eventTeamDef2 = this.#teamDefTag2.asReadonly()
  readonly #teamSpd2 = signal<number>(-1)
  readonly #eventTeamSpd2 = this.#teamSpd2.asReadonly()
  readonly #teamLuck2 = signal<number>(-1)
  readonly #eventTeamLuck2 = this.#teamLuck2.asReadonly()
  readonly #teamImageOne2 = signal<string>(this.stringImage)
  readonly #eventTeamImageOne2 = this.#teamImageOne2.asReadonly()
  readonly #teamImageTwo2 = signal<string>(this.stringImage)
  readonly #eventTeamImageTwo2 = this.#teamImageTwo2.asReadonly()
  readonly #teamRarityCardOne2 = signal<string>('common')
  readonly #eventTeamRarityCardOne2 = this.#teamRarityCardOne2.asReadonly()
  readonly #teamRarityCardTwo2 = signal<string>('common')
  readonly #eventTeamRarityCardTwo2 = this.#teamRarityCardTwo2.asReadonly()

  // team 3
  readonly #teamNameTag3 = signal<string>('')
  readonly #eventTeamName3 = this.#teamNameTag3.asReadonly()
  readonly #teamAtkTag3 = signal<number>(-1)
  readonly #eventTeamAtk3 = this.#teamAtkTag3.asReadonly()
  readonly #teamDefTag3 = signal<number>(-1)
  readonly #eventTeamDef3 = this.#teamDefTag3.asReadonly()
  readonly #teamSpd3 = signal<number>(-1)
  readonly #eventTeamSpd3 = this.#teamSpd3.asReadonly()
  readonly #teamLuck3 = signal<number>(-1)
  readonly #eventTeamLuck3 = this.#teamLuck3.asReadonly()
  readonly #teamImageOne3 = signal<string>(this.stringImage)
  readonly #eventTeamImageOne3 = this.#teamImageOne3.asReadonly()
  readonly #teamImageTwo3 = signal<string>(this.stringImage)
  readonly #eventTeamImageTwo3 = this.#teamImageTwo3.asReadonly()
  readonly #teamRarityCardOne3 = signal<string>('common')
  readonly #eventTeamRarityCardOne3 = this.#teamRarityCardOne3.asReadonly()
  readonly #teamRarityCardTwo3 = signal<string>('common')
  readonly #eventTeamRarityCardTwo3 = this.#teamRarityCardTwo3.asReadonly()

  readonly #playerOneName = signal<string>('Player #')
  readonly #playerTwoName = signal<string>('Player #')

  readonly #eventPlayerOneName = this.#playerOneName.asReadonly()
  readonly #eventPlayerTwoName = this.#playerTwoName.asReadonly()

  getEventTeamName(teamTag: number) {
    switch (teamTag) {
      case 0:
        return this.#eventTeamName0()
      case 1:
        return this.#eventTeamName1()
      case 2:
        return this.#eventTeamName2()
      case 3:
        return this.#eventTeamName3()
      default:
        return 'teamName'
    }
  }

  getEventTeamAtk(teamTag: number) {
    switch (teamTag) {
      case 0:
        return this.#eventTeamAtk0()
      case 1:
        return this.#eventTeamAtk1()
      case 2:
        return this.#eventTeamAtk2()
      case 3:
        return this.#eventTeamAtk3()
      default:
        return -1
    }
  }

  getEventTeamDef(teamTag: number) {
    switch (teamTag) {
      case 0:
        return this.#eventTeamDef0()
      case 1:
        return this.#eventTeamDef1()
      case 2:
        return this.#eventTeamDef2()
      case 3:
        return this.#eventTeamDef3()
      default:
        return -1
    }
  }


  getEventTeamSpd(teamTag: number) {
    switch (teamTag) {
      case 0:
        return this.#eventTeamSpd0()
      case 1:
        return this.#eventTeamSpd1()
      case 2:
        return this.#eventTeamSpd2()
      case 3:
        return this.#eventTeamSpd3()
      default:
        return -1
    }
  }

  getEventTeamLuck(teamTag: number) {
    switch (teamTag) {
      case 0:
        return this.#eventTeamLuck0()
      case 1:
        return this.#eventTeamLuck1()
      case 2:
        return this.#eventTeamLuck2()
      case 3:
        return this.#eventTeamLuck3()
      default:
        return -1
    }
  }


  getEventTeamImageOne(teamTag: number) {
    switch (teamTag) {
      case 0:
        return this.#eventTeamImageOne0()
      case 1:
        return this.#eventTeamImageOne1()
      case 2:
        return this.#eventTeamImageOne2()
      case 3:
        return this.#eventTeamImageOne3()
      default:
        return this.stringImage
    }
  }

  getEventTeamImageTwo(teamTag: number) {
    switch (teamTag) {
      case 0:
        return this.#eventTeamImageTwo0()
      case 1:
        return this.#eventTeamImageTwo1()
      case 2:
        return this.#eventTeamImageTwo2()
      case 3:
        return this.#eventTeamImageTwo3()
      default:
        return this.stringImage
    }
  }

  getEventTeamRarityCardOne(teamTag: number) {
    switch (teamTag) {
      case 0:
        return this.#eventTeamRarityCardOne0()
      case 1:
        return this.#eventTeamRarityCardOne1()
      case 2:
        return this.#eventTeamRarityCardOne2()
      case 3:
        return this.#eventTeamRarityCardOne3()
      default:
        return 'common'
    }
  }

  getEventTeamRarityCardTwo(teamTag: number) {
    switch (teamTag) {
      case 0:
        return this.#eventTeamRarityCardTwo0()
      case 1:
        return this.#eventTeamRarityCardTwo1()
      case 2:
        return this.#eventTeamRarityCardTwo2()
      case 3:
        return this.#eventTeamRarityCardTwo3()
      default:
        return 'common'
    }
  }


  setTeam0() {
    const team = this.#storageManagerApp.getTeamOne()
    this.#teamNameTag0.set(team.name)
    this.#teamAtkTag0.set(team.commonAttack)
    this.#teamDefTag0.set(team.commonDefense)
    this.#teamSpd0.set(team.commonSpeed)
    this.#teamLuck0.set(team.commonLuck)
    this.#teamImageOne0.set(team.cardsInfo[0].image)
    this.#teamImageTwo0.set(team.cardsInfo[1].image)
    this.#teamRarityCardOne0.set(team.cardsInfo[0].rarity)
    this.#teamRarityCardTwo0.set(team.cardsInfo[1].rarity)
  }

  setTeam1() {
    const team = this.#storageManagerApp.getTeamTwo()
    this.#teamNameTag1.set(team.name)
    this.#teamAtkTag1.set(team.commonAttack)
    this.#teamDefTag1.set(team.commonDefense)
    this.#teamSpd1.set(team.commonSpeed)
    this.#teamLuck1.set(team.commonLuck)
    this.#teamImageOne1.set(team.cardsInfo[0].image)
    this.#teamImageTwo1.set(team.cardsInfo[1].image)
    this.#teamRarityCardOne1.set(team.cardsInfo[0].rarity)
    this.#teamRarityCardTwo1.set(team.cardsInfo[1].rarity)
  }

  setTeam2() {
    const team = this.#storageManagerApp.getTeamThree()
    this.#teamNameTag2.set(team.name)
    this.#teamAtkTag2.set(team.commonAttack)
    this.#teamDefTag2.set(team.commonDefense)
    this.#teamSpd2.set(team.commonSpeed)
    this.#teamLuck2.set(team.commonLuck)
    this.#teamImageOne2.set(team.cardsInfo[0].image)
    this.#teamImageTwo2.set(team.cardsInfo[1].image)
    this.#teamRarityCardOne2.set(team.cardsInfo[0].rarity)
    this.#teamRarityCardTwo2.set(team.cardsInfo[1].rarity)
  }

  setTeam3() {
    const team = this.#storageManagerApp.getTeamFour()
    this.#teamNameTag3.set(team.name)
    this.#teamAtkTag3.set(team.commonAttack)
    this.#teamDefTag3.set(team.commonDefense)
    this.#teamSpd3.set(team.commonSpeed)
    this.#teamLuck3.set(team.commonLuck)
    this.#teamImageOne3.set(team.cardsInfo[0].image)
    this.#teamImageTwo3.set(team.cardsInfo[1].image)
    this.#teamRarityCardOne3.set(team.cardsInfo[0].rarity)
    this.#teamRarityCardTwo3.set(team.cardsInfo[1].rarity)
  }

  joinTeam(teamTag: number, cardPosition: number) {
    this.#dispatcherSocket.joinTeam(teamTag, cardPosition)
    this.setTeam0()
    this.setTeam1()
    this.setTeam2()
    this.setTeam3()
  }

  selectTeamCardPosition(teamTag: number, number: number) {

  }


  getPlayerOneName() {
    return this.#eventPlayerOneName()
  }

  setPlayerOneName(teamTag: number) {
    switch (teamTag) {
      case 0:
        this.#playerOneName.set(this.#storageManagerApp.getTeamOne().cardsInfo[0].player.pseudo)
        break
      case 1:
        this.#playerOneName.set(this.#storageManagerApp.getTeamTwo().cardsInfo[0].player.pseudo)
        break
      case 2:
        this.#playerOneName.set(this.#storageManagerApp.getTeamThree().cardsInfo[0].player.pseudo)
        break
      case 3:
        this.#playerOneName.set(this.#storageManagerApp.getTeamFour().cardsInfo[0].player.pseudo)
        break
      default:
        this.#playerOneName.set('Player #')
    }
  }

  getPlayerTwoName() {
    return this.#eventPlayerTwoName()
  }



  setPlayerTwoName(teamTag: number) {
    switch (teamTag) {
      case 0:
        this.#playerOneName.set(this.#storageManagerApp.getTeamOne().cardsInfo[1].player.pseudo)
        break
      case 1:
        this.#playerOneName.set(this.#storageManagerApp.getTeamTwo().cardsInfo[1].player.pseudo)
        break
      case 2:
        this.#playerOneName.set(this.#storageManagerApp.getTeamThree().cardsInfo[1].player.pseudo)
        break
      case 3:
        this.#playerOneName.set(this.#storageManagerApp.getTeamFour().cardsInfo[1].player.pseudo)
        break
      default:
        this.#playerOneName.set('Player #')
    }
  }




}
