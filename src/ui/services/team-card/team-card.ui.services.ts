import {effect, inject, Injectable, signal} from "@angular/core";
import {StorageManagerApp} from "../../../services/storageManagerApp/storageManagerApp";
import {DispatcherSocket} from "../../../services/dispatchers/dispatcher-socket/dispatcher-socket";
import {SwiperCardUiServices} from "../swiper-card/swiper-card.ui.services";
import {CardEntitySimplify} from "../../../models/cards.models";

@Injectable({
  providedIn: 'root'
})
export class TeamCardUiServices {

  readonly #storageManagerApp = inject(StorageManagerApp)
  readonly stringImage = 'https://cdn.discordapp.com/attachments/1060501071056879618/1168479278174830602/kyrasw_the_frame_of_a_back_tarot_card_game_rpg_in_png_format_or_379c9eb1-9bea-4ea4-bd56-c5629407e849.png?ex=65d31d21&is=65c0a821&hm=283eec15deb0af4cde30532cce3bb56ec6f43acc88e8903b21bc2cac941502b8&'
  readonly #dispatcherSocket = inject(DispatcherSocket)
  readonly #switchCardService = inject(SwiperCardUiServices)

  teamName: string = 'Team #'
  imageSrcCard: string = this.stringImage
  rarityCard: string = 'legendary'
  playerName: string = 'Player #1'
  teamTag: number = -1
  atk: number = 0
  def: number = 0
  spd: number = 0
  luck: number = 0


  constructor() {
    effect(() => {
      let test = this.#storageManagerApp.getSession()
      if (this.#storageManagerApp.getSession()) {
        this.#switchCardService.isActive = false
        this.whatIsImageSrcCard(this.teamTag,0)
        this.whatIsImageSrcCard(this.teamTag,1)
        this.whatIsRarityCard(this.teamTag,0)
        this.whatIsRarityCard(this.teamTag,1)
        this.whatIsPlayerName(this.teamTag,0)
        this.whatIsPlayerName(this.teamTag,1)
        this.whatIsAtk(this.teamTag)
        this.whatIsDef(this.teamTag)
        this.whatIsSpd(this.teamTag)
        this.whatIsLuck(this.teamTag)
      }
    });
  }

  whatIsTeamName(teamTag: number) {
    switch (teamTag) {
      case 0:
        this.teamName = this.#storageManagerApp.getTeamOne().name || 'Team #1'
        break
      case 1:
        this.teamName = this.#storageManagerApp.getTeamTwo().name || 'Team #1'
        break
      case 2:
        this.teamName = this.#storageManagerApp.getTeamThree().name || 'Team #1'
        break
      case 3:
        this.teamName = this.#storageManagerApp.getTeamFour().name || 'Team #1'
        break
      default:
        this.teamName =  'Team #Null'
        break
    }
    return this.teamName
  }
  whatIsImageSrcCard(teamTag: number,positionCard: number) {
    if(positionCard === 0){
      switch (teamTag) {
        case 0:
          this.imageSrcCard = this.#storageManagerApp.getTeamOne().cardsInfo[0].imageSrc === '' ?  this.stringImage : this.#storageManagerApp.getTeamOne().cardsInfo[0].imageSrc
          break
        case 1:
          this.imageSrcCard  = this.#storageManagerApp.getTeamTwo().cardsInfo[0].imageSrc === '' ?  this.stringImage : this.#storageManagerApp.getTeamTwo().cardsInfo[0].imageSrc
          break
        case 2:
          this.imageSrcCard  = this.#storageManagerApp.getTeamThree().cardsInfo[0].imageSrc === '' ?  this.stringImage : this.#storageManagerApp.getTeamThree().cardsInfo[0].imageSrc
          break
        case 3:
          this.imageSrcCard  = this.#storageManagerApp.getTeamFour().cardsInfo[0].imageSrc === '' ?  this.stringImage : this.#storageManagerApp.getTeamFour().cardsInfo[0].imageSrc
          break
        default:
          this.imageSrcCard  = this.stringImage
          break
      }
      return this.imageSrcCard
    }else{
      switch (teamTag) {
        case 0:
          this.imageSrcCard = this.#storageManagerApp.getTeamOne().cardsInfo[1].imageSrc === '' ?  this.stringImage : this.#storageManagerApp.getTeamOne().cardsInfo[1].imageSrc
          break
        case 1:
          this.imageSrcCard  = this.#storageManagerApp.getTeamTwo().cardsInfo[1].imageSrc === '' ?  this.stringImage : this.#storageManagerApp.getTeamTwo().cardsInfo[1].imageSrc
          break
        case 2:
          this.imageSrcCard  = this.#storageManagerApp.getTeamThree().cardsInfo[1].imageSrc === '' ?  this.stringImage : this.#storageManagerApp.getTeamThree().cardsInfo[1].imageSrc
          break
        case 3:
          this.imageSrcCard  = this.#storageManagerApp.getTeamFour().cardsInfo[1].imageSrc === '' ?  this.stringImage : this.#storageManagerApp.getTeamFour().cardsInfo[1].imageSrc
          break
        default:
          this.imageSrcCard  = this.stringImage
          break
      }
      return this.imageSrcCard
    }
  }
  whatIsRarityCard(teamTag: number,positionCard: number) {
    if(positionCard === 0){
      switch (teamTag) {
        case 0:
          this.rarityCard = this.#storageManagerApp.getTeamOne().cardsInfo[0].rarity === '' ? 'common' : this.#storageManagerApp.getTeamOne().cardsInfo[0].rarity.toLowerCase()
          break
        case 1:
          this.rarityCard = this.#storageManagerApp.getTeamTwo().cardsInfo[0].rarity === '' ? 'common' : this.#storageManagerApp.getTeamTwo().cardsInfo[0].rarity.toLowerCase()
          break
        case 2:
          this.rarityCard = this.#storageManagerApp.getTeamThree().cardsInfo[0].rarity === '' ? 'common' : this.#storageManagerApp.getTeamThree().cardsInfo[0].rarity.toLowerCase()
          break
        case 3:
          this.rarityCard = this.#storageManagerApp.getTeamFour().cardsInfo[0].rarity === '' ? 'common' : this.#storageManagerApp.getTeamFour().cardsInfo[0].rarity.toLowerCase()
          break
        default:
          break
      }
      return this.rarityCard
    }else{
      switch (teamTag) {
        case 0:
          this.rarityCard = this.#storageManagerApp.getTeamOne().cardsInfo[1].rarity === '' ? 'common' : this.#storageManagerApp.getTeamOne().cardsInfo[1].rarity.toLowerCase()
          break
        case 1:
          this.rarityCard= this.#storageManagerApp.getTeamTwo().cardsInfo[1].rarity  === '' ? 'common' : this.#storageManagerApp.getTeamTwo().cardsInfo[1].rarity.toLowerCase()
          break
        case 2:
          this.rarityCard = this.#storageManagerApp.getTeamThree().cardsInfo[1].rarity === '' ? 'common' : this.#storageManagerApp.getTeamThree().cardsInfo[1].rarity.toLowerCase()
          break
        case 3:
          this.rarityCard = this.#storageManagerApp.getTeamFour().cardsInfo[1].rarity === '' ? 'common' : this.#storageManagerApp.getTeamFour().cardsInfo[1].rarity.toLowerCase()
          break
        default:
          break
      }
      return this.rarityCard
    }
  }
  whatIsPlayerName(teamTag: number,positionCard: number) {
    if(positionCard === 0){
      switch (teamTag) {
        case 0:
          this.playerName = this.#storageManagerApp.getTeamOne().cardsInfo[0].player.pseudo || 'Player #1'
          break
        case 1:
          this.playerName = this.#storageManagerApp.getTeamTwo().cardsInfo[0].player.pseudo || 'Player #1'
          break
        case 2:
          this.playerName = this.#storageManagerApp.getTeamThree().cardsInfo[0].player.pseudo || 'Player #1'
          break
        case 3:
          this.playerName = this.#storageManagerApp.getTeamFour().cardsInfo[0].player.pseudo || 'Player #1'
          break
        default:
          this.playerName = 'Player #1'
          break
      }
      return this.playerName
    }else{
      switch (teamTag) {
        case 0:
          this.playerName = this.#storageManagerApp.getTeamOne().cardsInfo[1].player.pseudo|| 'Player #2'
          break
        case 1:
          this.playerName = this.#storageManagerApp.getTeamTwo().cardsInfo[1].player.pseudo || 'Player #2'
          break
        case 2:
          this.playerName = this.#storageManagerApp.getTeamThree().cardsInfo[1].player.pseudo || 'Player #2'
          break
        case 3:
          this.playerName = this.#storageManagerApp.getTeamFour().cardsInfo[1].player.pseudo || 'Player #2'
          break
        default:
          this.playerName = 'Player #2'
          break
      }
      return this.playerName
    }
  }
  whatIsAtk(teamTag: number){
    switch (teamTag) {
      case 0:
        this.atk = this.#storageManagerApp.getTeamOne().commonAttack === -1 ? 0 : this.#storageManagerApp.getTeamOne().commonAttack
        break
      case 1:
        this.atk = this.#storageManagerApp.getTeamTwo().commonAttack === -1 ? 0 : this.#storageManagerApp.getTeamTwo().commonAttack
        break
      case 2:
        this.atk = this.#storageManagerApp.getTeamThree().commonAttack === -1 ? 0 : this.#storageManagerApp.getTeamThree().commonAttack
        break
      case 3:
        this.atk = this.#storageManagerApp.getTeamFour().commonAttack === -1 ? 0 : this.#storageManagerApp.getTeamFour().commonAttack
        break
      default:
        this.atk = -21
        break
    }
    return this.atk
  }
  whatIsDef(teamTag: number){
    switch (teamTag) {
      case 0:
        this.def = this.#storageManagerApp.getTeamOne().commonDefense === -1 ? 0 : this.#storageManagerApp.getTeamOne().commonDefense
        break
      case 1:
        this.def = this.#storageManagerApp.getTeamTwo().commonDefense === -1 ? 0 : this.#storageManagerApp.getTeamTwo().commonDefense
        break
      case 2:
        this.def = this.#storageManagerApp.getTeamThree().commonDefense === -1 ? 0 : this.#storageManagerApp.getTeamThree().commonDefense
        break
      case 3:
        this.def = this.#storageManagerApp.getTeamFour().commonDefense === -1 ? 0 : this.#storageManagerApp.getTeamFour().commonDefense
        break
      default:
        this.def = -21
        break
    }
    return this.def
  }
  whatIsSpd(teamTag: number){
    switch (teamTag) {
      case 0:
        this.spd = this.#storageManagerApp.getTeamOne().commonSpeed === -1 ? 0 : this.#storageManagerApp.getTeamOne().commonSpeed
        break
      case 1:
        this.spd = this.#storageManagerApp.getTeamTwo().commonSpeed === -1 ? 0 : this.#storageManagerApp.getTeamTwo().commonSpeed
        break
      case 2:
        this.spd = this.#storageManagerApp.getTeamThree().commonSpeed === -1 ? 0 : this.#storageManagerApp.getTeamThree().commonSpeed
        break
      case 3:
        this.spd = this.#storageManagerApp.getTeamFour().commonSpeed === -1 ? 0 : this.#storageManagerApp.getTeamFour().commonSpeed
        break
      default:
        this.spd = -21
        break
    }
    return this.spd
  }
  whatIsLuck(teamTag: number){
    switch (teamTag) {
      case 0:
        this.luck = this.#storageManagerApp.getTeamOne().commonLuck === -1 ? 0 : this.#storageManagerApp.getTeamOne().commonLuck
        break
      case 1:
        this.luck = this.#storageManagerApp.getTeamTwo().commonLuck === -1 ? 0 : this.#storageManagerApp.getTeamTwo().commonLuck
        break
      case 2:
        this.luck = this.#storageManagerApp.getTeamThree().commonLuck === -1 ? 0 : this.#storageManagerApp.getTeamThree().commonLuck
        break
      case 3:
        this.luck = this.#storageManagerApp.getTeamFour().commonLuck === -1 ? 0 : this.#storageManagerApp.getTeamFour().commonLuck
        break
      default:
        this.luck = -21
        break
    }
    return this.luck
  }

  getIfYouareInThisPosition(teamTag:number, cardPosition: number){
    let team = this.#storageManagerApp.getSession().game.challenger
    if(team[teamTag].cardsInfo){
      let list = team[teamTag].cardsInfo ?? []
      return list[cardPosition].player.pseudo === this.#storageManagerApp.getUser().pseudo;
    }else{
      return null
    }
  }

  joinTeam(teamTag: number, cardPosition: number) {
    this.#dispatcherSocket.joinTeam(teamTag, cardPosition)
    this.teamTag = teamTag
  }

  openSelectorCard(teamTag: number, cardPosition: number) {
    console.log('openSelectorCard')
    console.log('teamTag',teamTag)
    console.log('cardPosition',cardPosition)
    this.#switchCardService.isActive = true
    this.#switchCardService.teamTag = teamTag
    this.#switchCardService.cardTag = cardPosition
  }
}
