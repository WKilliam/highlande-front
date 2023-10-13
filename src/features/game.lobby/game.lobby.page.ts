import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TeamCardUi} from "../../ui/team-card/team-card.ui";
import {LobbyRoomUi} from "../../ui/lobby-room/lobby-room.ui";
import {MatDialog, MatDialogConfig, MatDialogModule} from "@angular/material/dialog";
import {CreateSessionUi} from "../../ui/create-session/create-session.ui";

@Component({
  selector: 'app-game.lobby',
  standalone: true,
  imports: [CommonModule, TeamCardUi, LobbyRoomUi, MatDialogModule, CreateSessionUi,],
  template: `
    <div style="padding-top: 4rem">
      <div class="container-fluid">
        <div class="page-title">{{title}}</div>
        <div class="row" *ngIf="initSession; else notInit">
          <div class="col">
            <div class="row">
              <ui-team-card></ui-team-card>
              <ui-team-card></ui-team-card>
            </div>
          </div>
          <div class="col d-flex justify-content-center align-items-center" style="height: 80vh;">
            <ui-lobby-room></ui-lobby-room>
          </div>
          <div class="col">
            <div class="row">
              <ui-team-card></ui-team-card>
              <ui-team-card></ui-team-card>
            </div>
          </div>
        </div>
        <ng-template #notInit>
          <div class="row" style="padding: 2rem">
            <div class="col-3">
            </div>
            <div class="col-6" >
              <ui-create-session></ui-create-session>
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
export class GameLobbyPage {

  initSession: boolean = false;
  title: string = this.initSession ? "Lobby" : "Create a new session";

  showPasswordField: boolean = false;

  togglePasswordField() {
    this.showPasswordField = (document.getElementById('selSessionType') as HTMLSelectElement).value === 'private';
  }

}
