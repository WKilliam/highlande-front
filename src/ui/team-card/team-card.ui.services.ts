import {effect, EffectRef, inject, Injectable, OnDestroy} from "@angular/core";
import {LocalstorageServices} from "../../services/localsotrage/localstorage.services";
import {StoreServicesSocket} from "../../services/store-Socket/store.services.socket";
import {Game} from "../../models/room.content.models";
import {AppServices} from "../../app/app.services";
import {Utils} from "../../services/Utils";

@Injectable({
  providedIn: 'root'
})
export class TeamCardUiServices implements OnDestroy {

  private imageRef: string = "https://cdn.discordapp.com/attachments/1060501071056879618/1168479278174830602/kyrasw_the_frame_of_a_back_tarot_card_game_rpg_in_png_format_or_379c9eb1-9bea-4ea4-bd56-c5629407e849.png?ex=6551ea21&is=653f7521&hm=6c6f2206917ece648f45a5e47c078b653280858dfed24979dedf207d22795991&";
  private localStore: LocalstorageServices = inject(LocalstorageServices);
  readonly appServices = inject(AppServices);
  private readonly storeSocket = inject(StoreServicesSocket)
  private effectRef: EffectRef | null = null;
  protected game: any;


  constructor() {
    this.effectRef = effect(() => {
      if (this.localStore.getGame()) {
        this.game = {
          teams: this.localStore.getGame().teams,
          monsters: this.localStore.getGame().monsters,
        }
        console.log('inside set')
      }
    })
  }


  joinCard(teamTag: number, positionBtn: number) {
    this.storeSocket.joinTeam(positionBtn, teamTag)
  }

  teamByPositionName(positionBtn: number) {
    if (this.game.teams[positionBtn] === undefined) {
      return 'Team #'
    } else {
      let team = this.game.teams[positionBtn]
      // console.log("teamByPositionName", team)
      let name = 'Team #'
      if (team) {
        name = team.name
      } else {
        name = 'Team #'
      }
      return name
    }

  }

  teamByPositionImage(teamTag: number, cardTag: number) {
    if (this.game?.teams[teamTag] === undefined) {
      return this.imageRef
    } else {
      const teams = this.game.teams[teamTag]
      if (teams) {
        if (teams.cardsPlayer) {
          let image = teams.cardsPlayer[cardTag].imageSrc
          if (image && image !== '') {
            return image
          } else {
            return this.imageRef
          }
        } else {
          return this.imageRef
        }
      } else {
        return this.imageRef
      }
    }
  }

  teamByPositionRarity(positionBtn: number, player: number) {
    if (this.game?.teams[positionBtn] === undefined) {
      return 'legendary'
    } else {
      const teams = this.game.teams[positionBtn]
      if (teams) {
        if (teams.cardsPlayer) {
          let rarity = teams.cardsPlayer[player].rarity
          if (rarity && rarity !== '') {
            return rarity.toLowerCase()
          } else {
            return 'legendary'
          }
        } else {
          return 'legendary'
        }
      } else {
        return 'legendary'
      }
    }
  }

  teamByPositionPlayer(teamTag: number, cardTag: number) {
    const teams = this.game.teams[teamTag]
    if (teams) {
      if (teams.cardsPlayer) {
        let pseudo = teams.cardsPlayer[cardTag]?.player?.pseudo
        if (pseudo && pseudo !== '') {
          return pseudo
        } else {
          return 'Player #'
        }
      } else {
        return 'Player #'
      }
    } else {
      return 'Player #'
    }
  }

  teamByPositionCommonAtk(positionBtn: number) {
    if (this.game.teams[positionBtn]?.commonAttack) {
      return this.localStore.getGame().teams[positionBtn]?.commonAttack
    } else {
      return -1
    }
  }

  teamByPositionCommonDef(positionBtn: number) {
    if (this.game.teams[positionBtn]?.commonDefense) {
      return this.localStore.getGame().teams[positionBtn]?.commonDefense
    } else {
      return -1
    }
  }

  teamByPositionCommonSpd(positionBtn: number) {
    if (this.game.teams[positionBtn]?.commonSpeed) {
      return this.localStore.getGame().teams[positionBtn]?.commonSpeed
    } else {
      return -1
    }
  }

  teamByPositionCommonLuk(positionBtn: number) {
    if (this.game.teams[positionBtn]?.commonLuck) {
      return this.localStore.getGame().teams[positionBtn]?.commonLuck
    } else {
      return -1
    }
  }

  selectCardBtnIfPlayer(positionBtn: number, player: number) {
    let validePlayer = this.game.teams[positionBtn]?.cardsPlayer[player]?.player?.pseudo === this.localStore.getUser()?.pseudo;
    if(validePlayer){
      let card = this.game.teams[positionBtn]?.cardsPlayer[player]?.name !== ''
      if(card) {
        return false
      }else{
        return true
      }
    }else{
      return false
    }
  }

  ngOnDestroy(): void {
    this.effectRef?.destroy()
  }

  openSelectorCard() {
    if(this.appServices.getOpenSelectorCard()) {
      this.appServices.setOpenSelectorCard(false)
    } else {
      this.appServices.setOpenSelectorCard(true)
    }
  }


}
