import {Component, inject, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SocketService} from "../../services/socket/socket.service";
import {TeamBodyModels, TeamsModels} from "../../models/teams";
import {UserModels} from "../../models/user.models";
import {GameModels} from "../../models/game.models";
import {SwiperCardUi} from "../swiper-card/swiper-card.ui";

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
                <div class="rectangle" (click)="call($event)">
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
                <button type="button" class="join-btn" (click)="JoinPlayer1()">Join</button>
              </div>
            </div>
          </div>
          <div class="col-6">
            <div class="row">
              <div class="col">
                <div class="rectangle" (click)="call($event)">
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
                <button type="button" class="join-btn" (click)="JoinPlayer2()">Join</button>
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

  imageSrcPlayerOne: string = 'https://cdn.discordapp.com/attachments/1060501071056879618/1168479278174830602/kyrasw_the_frame_of_a_back_tarot_card_game_rpg_in_png_format_or_379c9eb1-9bea-4ea4-bd56-c5629407e849.png?ex=6551ea21&is=653f7521&hm=6c6f2206917ece648f45a5e47c078b653280858dfed24979dedf207d22795991&';
  imageSrcPlayerTwo: string = 'https://cdn.discordapp.com/attachments/1060501071056879618/1168479278174830602/kyrasw_the_frame_of_a_back_tarot_card_game_rpg_in_png_format_or_379c9eb1-9bea-4ea4-bd56-c5629407e849.png?ex=6551ea21&is=653f7521&hm=6c6f2206917ece648f45a5e47c078b653280858dfed24979dedf207d22795991&';
  rarityPlayerOne: string = 'common';
  rarityPlayerTwo: string = 'common';
  teamName: string = 'Team #';
  teamAtk: number = 0;
  teamDef: number = 0;
  teamSpd: number = 0;
  teamLuk: number = 0;
  gameModels: GameModels = JSON.parse(localStorage.getItem('game') || '{}');
  storeSocketService = inject(SocketService)



  JoinPlayer1() {

  }

  JoinPlayer2() {

  }

  ngOnInit(): void {
    // console.log(this.teamsModels)
    this.init()
  }

  init() {
    if (JSON.stringify(this.gameModels) !== '{}') {
      let value: TeamsModels = this.gameModels.teams
      switch (this.teamTag) {
        case 'teamOne':
          this.teamName = value.teamOne.teamName
          this.teamAtk = value.teamOne.commonAttack
          this.teamDef = value.teamOne.commonDefense
          this.teamSpd = value.teamOne.commonSpeed
          this.teamLuk = value.teamOne.commonLuck
          this.imageSrcPlayerOne = value.teamOne.cardOne.image != '' ? value.teamOne.cardOne.image : this.imageSrcPlayerOne
          this.imageSrcPlayerTwo = value.teamOne.cardTwo.image != '' ? value.teamOne.cardTwo.image : this.imageSrcPlayerTwo
          this.rarityPlayerOne = value.teamOne.cardOne.rarity != '' ? value.teamOne.cardOne.rarity : this.rarityPlayerOne
          this.rarityPlayerTwo = value.teamOne.cardTwo.rarity != '' ? value.teamOne.cardTwo.rarity : this.rarityPlayerTwo
          break
        case 'teamTwo':
          this.teamName = value.teamTwo.teamName
          this.teamAtk = value.teamTwo.commonAttack
          this.teamDef = value.teamTwo.commonDefense
          this.teamSpd = value.teamTwo.commonSpeed
          this.teamLuk = value.teamTwo.commonLuck
          this.imageSrcPlayerOne = value.teamTwo.cardOne.image != '' ? value.teamTwo.cardOne.image : this.imageSrcPlayerOne
          this.imageSrcPlayerTwo = value.teamTwo.cardTwo.image != '' ? value.teamTwo.cardTwo.image : this.imageSrcPlayerTwo
          this.rarityPlayerOne = value.teamTwo.cardOne.rarity != '' ? value.teamTwo.cardOne.rarity : this.rarityPlayerOne
          this.rarityPlayerTwo = value.teamTwo.cardTwo.rarity != '' ? value.teamTwo.cardTwo.rarity : this.rarityPlayerTwo
          break
        case 'teamThree':
          this.teamName = value.teamThree.teamName
          this.teamAtk = value.teamThree.commonAttack
          this.teamDef = value.teamThree.commonDefense
          this.teamSpd = value.teamThree.commonSpeed
          this.teamLuk = value.teamThree.commonLuck
          this.imageSrcPlayerOne = value.teamThree.cardOne.image != '' ? value.teamThree.cardOne.image : this.imageSrcPlayerOne
          this.imageSrcPlayerTwo = value.teamThree.cardTwo.image != '' ? value.teamThree.cardTwo.image : this.imageSrcPlayerTwo
          this.rarityPlayerOne = value.teamThree.cardOne.rarity != '' ? value.teamThree.cardOne.rarity : this.rarityPlayerOne
          this.rarityPlayerTwo = value.teamThree.cardTwo.rarity != '' ? value.teamThree.cardTwo.rarity : this.rarityPlayerTwo
          break
        case 'teamFour':
          this.teamName = value.teamFour.teamName
          this.teamAtk = value.teamFour.commonAttack
          this.teamDef = value.teamFour.commonDefense
          this.teamSpd = value.teamFour.commonSpeed
          this.teamLuk = value.teamFour.commonLuck
          this.imageSrcPlayerOne = value.teamFour.cardOne.image != '' ? value.teamFour.cardOne.image : this.imageSrcPlayerOne
          this.imageSrcPlayerTwo = value.teamFour.cardTwo.image != '' ? value.teamFour.cardTwo.image : this.imageSrcPlayerTwo
          this.rarityPlayerOne = value.teamFour.cardOne.rarity != '' ? value.teamFour.cardOne.rarity : this.rarityPlayerOne
          this.rarityPlayerTwo = value.teamFour.cardTwo.rarity != '' ? value.teamFour.cardTwo.rarity : this.rarityPlayerTwo
          break
        default:
          break
      }
    }
  }

  call($event: any) {
    console.log($event)
  }

}
