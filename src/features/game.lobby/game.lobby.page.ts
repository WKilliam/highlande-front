import {Component, effect, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TeamCardUi} from "../../ui/team-card/team-card.ui";
import {MatDialogModule} from "@angular/material/dialog";
import {CreateSessionUi} from "../../ui/create-session/create-session.ui";
import {SwiperCardUi} from "../../ui/swiper-card/swiper-card.ui";
import {LittleCardSelectorUi} from "../../ui/little-card-selector/little-card-selector.ui";
import {LobbyRoomUi} from "../../ui/lobby-room/lobby-room.ui";
import {AppServices} from "../../app/app.services";

@Component({
  selector: 'app-game.lobby',
  standalone: true,
  imports: [
    CommonModule,
    TeamCardUi,
    MatDialogModule,
    CreateSessionUi,
    SwiperCardUi,
    LittleCardSelectorUi,
    LobbyRoomUi,],
  template: `
    <div style="padding-top: 4rem">
      <div class="container-fluid">
        <div class="page-title">Lobby Session : {{appServices.getRoom()}}</div>
        <div class="row">
          <div class="col">
            <div class="row">
              <ui-team-card [teamTag]="0"></ui-team-card>
              <ui-team-card [teamTag]="1"></ui-team-card>
            </div>
          </div>
          <div
            class="col d-flex justify-content-center align-items-center"
            style="height: 80vh;">
            <ui-lobby-room></ui-lobby-room>
            <ui-swiper-card
              class="select-card"
              *ngIf="this.appServices.getOpenSelectorCard()"
            >
            </ui-swiper-card>
          </div>
          <div class="col">
            <div class="row">
              <ui-team-card [teamTag]="2"></ui-team-card>
              <ui-team-card [teamTag]="3"></ui-team-card>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./game.lobby.page.scss']
})
export class GameLobbyPage{

  readonly appServices = inject(AppServices);

}
