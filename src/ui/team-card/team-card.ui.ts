import {Component, inject, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SocketService} from "../../services/socket/socket.service";
import {TeamBodyModels, TeamsModels} from "../../models/teams";

@Component({
  selector: 'ui-team-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card  bg-transparent card-effect" style="margin: 1rem">
      <div class="card-header text-center team-text">
        {{teams?.teamName}}
      </div>
      <div class="card-body text-center">
        <div class="row">
          <div class="col-6">
            <div class="row">
              <div class="col">
                <div class="rectangle">
                  <img
                    [src]="teams?.cardOne?.image !== '' ? teams?.cardOne?.image : 'https://via.placeholder.com/120x224'"
                    alt="Image"
                    [ngClass]="teams?.cardOne?.rarity"
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
                <div class="rectangle" #rectangle>
                  <img
                    [src]="teams?.cardTwo?.image"
                    alt="Image"
                    [ngClass]="teams?.cardTwo?.rarity"
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
            <div class="circle">{{this.teams?.commonAttack}}</div>
          </div>
          <div class="d-flex align-items-center">
            <div class="text-after-circle">Def :</div>
            <div class="circle">{{this.teams?.commonDefense}}</div>
          </div>
          <div class="d-flex align-items-center">
            <div class="text-after-circle">Spd :</div>
            <div class="circle">{{this.teams?.commonSpeed}}</div>
          </div>
          <div class="d-flex align-items-center">
            <div class="text-after-circle">Luk :</div>
            <div class="circle">{{this.teams?.commonLuck}}</div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./team-card.ui.scss']
})
export class TeamCardUi implements OnInit {

  @Input() teams: TeamBodyModels | undefined;
  socket = inject(SocketService)


  JoinPlayer1() {

  }

  JoinPlayer2() {

  }

  ngOnInit(): void {
  }


}
