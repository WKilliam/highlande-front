import {
  ChangeDetectionStrategy,
  Component,
  effect,
  Inject,
  inject,
  Input,
  OnInit,
  signal,
  WritableSignal
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserModels} from "../../models/user.models";
import { GameModels} from "../../models/game.models";
import {SwiperCardUi} from "../swiper-card/swiper-card.ui";
import {StoreServicesSocket} from "../../services/store-Socket/store.services.socket";
import {InfoGame} from "../../models/info.game.models";
import {LocalstorageServices} from "../../services/localsotrage/localstorage.services";
import {MapModels} from "../../models/maps.models";
import {TeamsModels} from "../../models/teams";
import {distinctUntilChanged, tap} from "rxjs";
import {SocketJoinSession, SocketJoinTeamCard} from "../../models/socket.models";

@Component({
  selector: 'ui-team-card',
  standalone: true,
  imports: [CommonModule, SwiperCardUi],
  template: `
    <div class="card  bg-transparent card-effect" style="margin: 1rem">
      <div class="card-header text-center team-text">
        {{teamName}}
      </div>
      <div class="card-body text-center">
        <div class="row">
          <div class="col-6">
            <div class="row">
              <div class="col">
                <div class="rectangle">
                  <img
                    [src]="imageSrcPlayerOne"
                    alt="Image"
                    [ngClass]="rarityPlayerOne"
                    width="120"
                    height="224"
                  />
                </div>
              </div>
              <div class="col">
                <button type="button" class="join-btn">Join</button>
              </div>
              <div style="color: #FFFFFF">
                Player : {{playerOnePseudo}}
              </div>
            </div>
          </div>
          <div class="col-6">
            <div class="row">
              <div class="col">
                <div class="rectangle">
                  <img
                    [src]="imageSrcPlayerTwo"
                    alt="Image"
                    [ngClass]="rarityPlayerTwo"
                    width="120"
                    height="224"
                  />
                </div>
              </div>
              <div class="col">
                <button type="button" class="join-btn">Join</button>
              </div>
              <div style="color: #FFFFFF">
                Player : {{ playerTwoPseudo}}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer text-center">
        <div class="d-flex justify-content-between">
          <div class="d-flex align-items-center">
            <div class="text-after-circle">Atk :</div>
            <div class="circle">{{teamAtk}}</div>
          </div>
          <div class="d-flex align-items-center">
            <div class="text-after-circle">Def :</div>
            <div class="circle">{{teamDef}}</div>
          </div>
          <div class="d-flex align-items-center">
            <div class="text-after-circle">Spd :</div>
            <div class="circle">{{teamSpd}}</div>
          </div>
          <div class="d-flex align-items-center">
            <div class="text-after-circle">Luk :</div>
            <div class="circle">{{teamLuk}}</div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./team-card.ui.scss']
})
export class TeamCardUi implements OnInit {

  @Input() teamTag: string = ''
  imageSrcPlayerOne: string = ''
  imageSrcPlayerTwo: string = ''
  rarityPlayerOne: string = 'common';
  rarityPlayerTwo: string = 'common';
  teamName: string = 'Team #';
  teamAtk: number = 0;
  teamDef: number = 0;
  teamSpd: number = 0;
  teamLuk: number = 0;
  playerOnePseudo: string = '';
  playerTwoPseudo: string = '';
  private local = inject(LocalstorageServices)
  private eventUser = this.local.getUser()
  private eventInfoGame = this.local.getInfoGame()
  private eventGame = this.local.getGame()
  storeSocketService = inject(StoreServicesSocket)
  private effectRef: any

  private eventGameSignal = this.local.eventGameSignal()


  ngOnInit(): void {
    this.effectRef = effect(() => {
      effect(() => {
        if(this.eventInfoGame() !== null){
          console.log('inside eventInfoGame')
        }
      })
    })
  }

  // JoinPlayer1() {
  //   if(this.user !== null && this.infoGame !== null){
  //     let socketJoin: SocketJoinTeamCard = {
  //       room: this.infoGame.gameKeySession.key,
  //       pseudo: this.user.pseudo,
  //       avatar: this.user.avatar,
  //       teamTag: this.teamTag,
  //       position: 1
  //     }
  //     this.storeSocketService.selectPlaceTeam(socketJoin)
  //   }else{
  //     console.log('error')
  //   }
  // }
  //
  // JoinPlayer2() {
  //   // this.storeSocketService.joinTeamCardEvent(this.teamTag, 2)
  // }
  //
  // initVIew(){
  //   if(this.game !== null){
  //     switch (this.teamTag) {
  //       case 'teamOne':
  //         this.teamName = this.game.teams.teamOne.teamName
  //         this.teamAtk = this.game.teams.teamOne.cardOne.atk + this.game.teams.teamOne.cardTwo.atk
  //         this.teamDef = this.game.teams.teamOne.cardOne.def + this.game.teams.teamOne.cardTwo.def
  //         this.teamSpd = this.game.teams.teamOne.cardOne.spd + this.game.teams.teamOne.cardTwo.spd
  //         this.teamLuk = this.game.teams.teamOne.cardOne.luk + this.game.teams.teamOne.cardTwo.luk
  //         this.imageSrcPlayerOne = this.game.teams.teamOne.cardOne.image
  //         this.imageSrcPlayerTwo = this.game.teams.teamOne.cardTwo.image
  //         this.playerOnePseudo = this.game.teams.teamOne.playerOne.pseudo
  //         this.playerTwoPseudo = this.game.teams.teamOne.playerTwo.pseudo
  //         this.rarityPlayerOne = this.game.teams.teamOne.cardOne.rarity
  //         this.rarityPlayerTwo = this.game.teams.teamOne.cardTwo.rarity
  //         break
  //       case 'teamTwo':
  //         this.teamName = this.game.teams.teamTwo.teamName
  //         this.teamAtk = this.game.teams.teamTwo.cardOne.atk + this.game.teams.teamTwo.cardTwo.atk
  //         this.teamDef = this.game.teams.teamTwo.cardOne.def + this.game.teams.teamTwo.cardTwo.def
  //         this.teamSpd = this.game.teams.teamTwo.cardOne.spd + this.game.teams.teamTwo.cardTwo.spd
  //         this.teamLuk = this.game.teams.teamTwo.cardOne.luk + this.game.teams.teamTwo.cardTwo.luk
  //         this.imageSrcPlayerOne = this.game.teams.teamTwo.cardOne.image
  //         this.imageSrcPlayerTwo = this.game.teams.teamTwo.cardTwo.image
  //         this.playerOnePseudo = this.game.teams.teamTwo.playerOne.pseudo
  //         this.playerTwoPseudo = this.game.teams.teamTwo.playerTwo.pseudo
  //         this.rarityPlayerOne = this.game.teams.teamTwo.cardOne.rarity
  //         this.rarityPlayerTwo = this.game.teams.teamTwo.cardTwo.rarity
  //         break
  //       case 'teamThree':
  //         this.teamName = this.game.teams.teamThree.teamName
  //         this.teamAtk = this.game.teams.teamThree.cardOne.atk + this.game.teams.teamThree.cardTwo.atk
  //         this.teamDef = this.game.teams.teamThree.cardOne.def + this.game.teams.teamThree.cardTwo.def
  //         this.teamSpd = this.game.teams.teamThree.cardOne.spd + this.game.teams.teamThree.cardTwo.spd
  //         this.teamLuk = this.game.teams.teamThree.cardOne.luk + this.game.teams.teamThree.cardTwo.luk
  //         this.imageSrcPlayerOne = this.game.teams.teamThree.cardOne.image
  //         this.imageSrcPlayerTwo = this.game.teams.teamThree.cardTwo.image
  //         this.playerOnePseudo = this.game.teams.teamThree.playerOne.pseudo
  //         this.playerTwoPseudo = this.game.teams.teamThree.playerTwo.pseudo
  //         this.rarityPlayerOne = this.game.teams.teamThree.cardOne.rarity
  //         this.rarityPlayerTwo = this.game.teams.teamThree.cardTwo.rarity
  //         break
  //       case 'teamFour':
  //         this.teamName = this.game.teams.teamFour.teamName
  //         this.teamAtk = this.game.teams.teamFour.cardOne.atk + this.game.teams.teamFour.cardTwo.atk
  //         this.teamDef = this.game.teams.teamFour.cardOne.def + this.game.teams.teamFour.cardTwo.def
  //         this.teamSpd = this.game.teams.teamFour.cardOne.spd + this.game.teams.teamFour.cardTwo.spd
  //         this.teamLuk = this.game.teams.teamFour.cardOne.luk + this.game.teams.teamFour.cardTwo.luk
  //         this.imageSrcPlayerOne = this.game.teams.teamFour.cardOne.image
  //         this.imageSrcPlayerTwo = this.game.teams.teamFour.cardTwo.image
  //         this.playerOnePseudo = this.game.teams.teamFour.playerOne.pseudo
  //         this.playerTwoPseudo = this.game.teams.teamFour.playerTwo.pseudo
  //         this.rarityPlayerOne = this.game.teams.teamFour.cardOne.rarity
  //         this.rarityPlayerTwo = this.game.teams.teamFour.cardTwo.rarity
  //         break
  //     }
  //   }
  // }
}
