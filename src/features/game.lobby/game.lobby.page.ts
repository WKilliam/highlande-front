import {Component, inject, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TeamCardUi} from "../../ui/team-card/team-card.ui";
import {LobbyRoomUi} from "../../ui/lobby-room/lobby-room.ui";
import {MatDialogModule} from "@angular/material/dialog";
import {CreateSessionUi} from "../../ui/create-session/create-session.ui";
import {SocketService} from "../../services/socket/socket.service";
import {GameKeySession, SessionGamePlace} from "../../models/sessions";
import {ActivatedRoute, Router} from "@angular/router";
import {StoreServicesApi} from "../../services/store-Api/store.services.api";
import {StoreServicesSocket} from "../../services/store-Socket/store.services.socket";
import {InfoGame} from "../../models/info.game.models";
import {FormatModel} from "../../models/format.model";
import {UserModels} from "../../models/user.models";
import {SwiperCardUi} from "../../ui/swiper-card/swiper-card.ui";

@Component({
  selector: 'app-game.lobby',
  standalone: true,
  imports: [CommonModule, TeamCardUi, LobbyRoomUi, MatDialogModule, CreateSessionUi, SwiperCardUi,],
  template: `
    <div style="padding-top: 4rem">
      <div class="container-fluid">
        <div class="page-title">{{title}} : {{sessionKey}}</div>

        <div class="row" *ngIf="initSession; else notInit">
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
        <ng-template #notInit>
          <div class="row" style="padding: 2rem">
            <div class="col-3">
            </div>
            <div class="col-6">
              <ui-create-session (onInitSession)="initSessionEvent()"></ui-create-session>
            </div>
            <div class="col-3">
            </div>
          </div>
        </ng-template>
      </div>
    </div>
  `,
  styleUrls: ['./game.lobby.page.scss']
})
export class GameLobbyPage implements OnInit {

  @Input() sessionKey!: string
  infoGame: InfoGame = JSON.parse(localStorage.getItem('infoGame') || '{}');
  user: UserModels = JSON.parse(localStorage.getItem('user') || '{}');
  teamOne : string = "teamOne"
  teamTwo : string = "teamTwo"
  teamThree : string = "teamThree"
  teamFour : string = "teamFour"

  initSession: boolean = false;
  title: string = this.initSession ? "Lobby" : "Create a new session";
  storeServicesSocket = inject(StoreServicesSocket)
  storeServiceApi = inject(StoreServicesApi)
  router = inject(Router)

  ngOnInit(): void {
    this.init()
  }

  init(){
    if (JSON.stringify(this.user) !== '{}') {
      if (JSON.stringify(this.infoGame) !== '{}') {
        this.initSession = true;
        this.title = "Lobby";
        this.sessionKey = this.infoGame.gameKeySession.key;
        this.router.navigateByUrl(`/lobby/${this.sessionKey}`);
        this.joinSessionEvent();
      } else {
        this.initSession = false;
        this.title = "Create a new session";
      }
    } else {
      this.router.navigateByUrl(`/testeurio`);
    }
  }

  initSessionEvent() {
    this.initSession = true;
    this.title = "Lobby";
  }

  joinSessionEvent() {
    this.storeServiceApi.postSessionFreeplace({
      gameKeySession: this.sessionKey,
      avatar: this.user.avatar,
      pseudo: this.user.pseudo
    }).subscribe((received :FormatModel) => {
      console.log(received)
      if (received.code >= 200 && received.code < 300) {
        this.storeServicesSocket.joinSessionEvent(this.sessionKey)
      }else{
        this.router.navigateByUrl(`/testeurio`);
      }
    })
  }

}
