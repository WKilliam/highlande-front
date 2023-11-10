import {effect, EffectRef, inject, Injectable, OnDestroy} from "@angular/core";
import {LocalstorageServices} from "../../services/localsotrage/localstorage.services";
import {StoreServicesSocket} from "../../services/store-Socket/store.services.socket";

@Injectable({
  providedIn: 'root'
})
export class TeamCardUiServices implements OnDestroy{

  private imageRef: string = "https://cdn.discordapp.com/attachments/1060501071056879618/1168479278174830602/kyrasw_the_frame_of_a_back_tarot_card_game_rpg_in_png_format_or_379c9eb1-9bea-4ea4-bd56-c5629407e849.png?ex=6551ea21&is=653f7521&hm=6c6f2206917ece648f45a5e47c078b653280858dfed24979dedf207d22795991&";
  private localStore :LocalstorageServices = inject(LocalstorageServices);
  private readonly storeSocket = inject(StoreServicesSocket)
  private effectRef: EffectRef | null = null;



  constructor() {
    this.effectRef = effect(() => {
      if(this.localStore.getGame()){
        // console.log('inside',this.localStore.getGame())
      }
    })
  }

  initRoom(){

  }

  joinCard(positionBtn:number){
    let position = 0
    let user = this.localStore.getUser()
    let lobby = this.localStore.getSessionStatusGame().lobby
    for (let i = 0; i < lobby.length; i++) {
      if(lobby[i].avatar === user.avatar && lobby[i].pseudo === user.pseudo){
        position = i
      }
    }
    this.storeSocket.joinTeam({
      room:this.localStore.getCurrentRoom(),
      lobbyPosition:position,
      teamPosition:positionBtn
    })
  }

  teamByPositionName(positionBtn:number){
    let team = this.localStore.getGame().teams
    let name = 'Team #'
    for (let i = 0; i < team.length; i++) {
      if(i === positionBtn){
        name = team[i].name
      }
    }
    return name
  }

  teamByPositionImage(positionBtn:number,player:number){
    const teams = this.localStore.getGame().teams;
    if (teams[positionBtn]?.cardsPlayer) {
      return this.imageRef;
    }
    const cards = teams[positionBtn]?.cardsPlayer ?? [];
    for (const card of cards) {
      if (player === cards.indexOf(card)) {
        return card.imageSrc === '' ? this.imageRef : card.imageSrc;
      }
    }
    return this.imageRef;
  }

  teamByPositionRarity(positionBtn:number,player:number){
    const teams = this.localStore.getGame().teams;
    if (teams[positionBtn]?.cardsPlayer) {
      return 'legendary';
    }
    const cards = teams[positionBtn]?.cardsPlayer ?? [];
    for (const card of cards) {
      if (player === cards.indexOf(card)) {
        return card.imageSrc === '' ? 'legendary' : card.imageSrc;
      }
    }
    return 'legendary';
  }

  teamByPositionPlayer(positionBtn:number,player:number){
    return ''
  }

  teamByPositionCommonAtk(positionBtn:number){
    if(this.localStore.getGame().teams[positionBtn]?.commonAttack){
      return this.localStore.getGame().teams[positionBtn]?.commonAttack
    }else{
      return -1
    }
  }

  teamByPositionCommonDef(positionBtn:number){
    if(this.localStore.getGame().teams[positionBtn]?.commonDefense){
      return this.localStore.getGame().teams[positionBtn]?.commonDefense
    }else{
      return -1
    }
  }

  teamByPositionCommonSpd(positionBtn:number){
    if(this.localStore.getGame().teams[positionBtn]?.commonSpeed){
      return this.localStore.getGame().teams[positionBtn]?.commonSpeed
    }else{
      return -1
    }
  }

  teamByPositionCommonLuk(positionBtn:number){
    if(this.localStore.getGame().teams[positionBtn]?.commonLuck){
      return this.localStore.getGame().teams[positionBtn]?.commonLuck
    }else{
      return -1
    }
  }

  ngOnDestroy(): void {
    this.effectRef?.destroy()
  }

}
