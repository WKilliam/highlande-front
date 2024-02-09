import {Component, effect, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatDialogModule} from "@angular/material/dialog";
import {LobbyFeaturesServices} from "./lobby.features.services";
import {TeamCardUi} from "../../ui/component/team-card/team-card.ui";
import {LobbyRoomUi} from "../../ui/component/lobby-room/lobby-room.ui";

@Component({
  selector: 'app-game.lobby',
  standalone: true,
  imports: [
    CommonModule,
    TeamCardUi,
    MatDialogModule,
    // CreateSessionUi,
    // SwiperCardUi,
    // LittleCardSelectorUi,
    LobbyRoomUi,
  ],
  template: `
    <div style="padding-top: 4rem">
      <div class="container-fluid">
        <div class="page-title">Lobby Session : {{lobbyFeaturesServices.getRoom()}}</div>
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
  styleUrls: ['./lobby.features.scss']
})
export class LobbyFeatures {

  readonly lobbyFeaturesServices :LobbyFeaturesServices = inject(LobbyFeaturesServices)

}
