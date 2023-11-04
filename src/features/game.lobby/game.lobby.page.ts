import {Component, effect, inject, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TeamCardUi} from "../../ui/team-card/team-card.ui";
import {LobbyRoomUi} from "../../ui/lobby-room/lobby-room.ui";
import {MatDialogModule} from "@angular/material/dialog";
import {CreateSessionUi} from "../../ui/create-session/create-session.ui";
import {Router} from "@angular/router";
import {StoreServicesApi} from "../../services/store-Api/store.services.api";
import {StoreServicesSocket} from "../../services/store-Socket/store.services.socket";
import {InfoGame} from "../../models/info.game.models";
import {UserModels} from "../../models/user.models";
import {SwiperCardUi} from "../../ui/swiper-card/swiper-card.ui";
import {LocalstorageServices} from "../../services/localsotrage/localstorage.services";

@Component({
  selector: 'app-game.lobby',
  standalone: true,
  imports: [CommonModule, TeamCardUi, LobbyRoomUi, MatDialogModule, CreateSessionUi, SwiperCardUi,],
  template: `
    <div style="padding-top: 4rem">
      <div class="container-fluid">
        <div class="page-title">{{title}} : </div>
        <div class="row">
          <div class="col">
            <div class="row">
              <ui-team-card [teamTag]="teamOne"></ui-team-card>
              <ui-team-card [teamTag]="teamThree"></ui-team-card>
            </div>
          </div>
          <div class="col d-flex justify-content-center align-items-center" style="height: 80vh;">
            <ui-lobby-room></ui-lobby-room>
          </div>
          <div class="col">
            <div class="row">
              <ui-team-card [teamTag]="teamTwo"></ui-team-card>
              <ui-team-card [teamTag]="teamFour"></ui-team-card>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./game.lobby.page.scss']
})
export class GameLobbyPage {


  teamOne : string = "teamOne"
  teamTwo : string = "teamTwo"
  teamThree : string = "teamThree"
  teamFour : string = "teamFour"
  title: string =  "Lobby";
  private storeServicesSocket = inject(StoreServicesSocket)
  private storeServiceApi = inject(StoreServicesApi)
  private local = inject(LocalstorageServices)
  private user = this.local.getUser()
  infoGame = this.local.getInfoGame()
  game = this.local.getGame()
  private router = inject(Router)
  private effectRef:any

  constructor() {
    this.effectRef = effect(() => {
      if(this.user !== null && this.game !== null && this.infoGame !== null) {
        console.log(this.user)
      }
    })
  }

}
