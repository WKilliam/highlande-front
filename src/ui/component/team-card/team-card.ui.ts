import {Component,inject, Input } from '@angular/core';
import {CommonModule} from '@angular/common';
import {TeamCardUiServices} from "../../services/team-card/team-card.ui.services";

@Component({
  selector: 'ui-team-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card  bg-transparent card-effect" style="margin: 1rem">
      <div class="card-header text-center team-text">
        <p>{{ teamCardUiServices.whatIsTeamName(teamTag) }}</p>
      </div>
      <div class="card-body text-center">
        <div class="row">
          <div class="col-6">
            <div class="row">
              <div class="col">
                <div class="rectangle">
                  <img
                    [src]="teamCardUiServices.whatIsImageSrcCard(teamTag,0)"
                    alt="Image"
                    [ngClass]="teamCardUiServices.whatIsRarityCard(teamTag,0)"
                    width="120"
                    height="224"
                  />
                </div>
              </div>
              <div class="col">
                <div *ngIf="teamCardUiServices.whatIsPlayerName(teamTag,0) === 'Player #1' else playerExist">
                  <button
                    type="button"
                    class="join-btn"

                    (click)="teamCardUiServices.joinTeam(teamTag,0)"
                  >Join
                  </button>
                </div>
                <ng-template #playerExist>
<!--                  {{ teamCardUiServices.getIfYouareInThisPosition(teamTag,0) }}-->
                  <button
                    *ngIf="teamCardUiServices.getIfYouareInThisPosition(teamTag,0)"
                    type="button"
                    class="join-btn"
                    (click)="teamCardUiServices.openSelectorCard(teamTag,0)"
                  >Select card
                  </button>
                  <div style="color: #FFFFFF">
                    Player :
                    <p>{{ teamCardUiServices.whatIsPlayerName(teamTag,0) }}</p>
                  </div>
                </ng-template>
              </div>
            </div>
          </div>
          <div class="col-6">
            <div class="row">
              <div class="col">
                <div class="rectangle">
                  <img
                    [src]="teamCardUiServices.whatIsImageSrcCard(teamTag,1)"
                    alt="Image"
                    [ngClass]="teamCardUiServices.whatIsRarityCard(teamTag,1)"
                    width="120"
                    height="224"
                  />
                </div>
              </div>
              <div class="col">
                <div *ngIf="teamCardUiServices.whatIsPlayerName(teamTag,1) === 'Player #2' else playerExist">
                  <button
                    type="button"
                    class="join-btn"
                    (click)="teamCardUiServices.joinTeam(teamTag,1)"
                  >Join
                  </button>
                </div>
                <ng-template #playerExist>
<!--                  {{ teamCardUiServices.getIfYouareInThisPosition(teamTag,1) }}-->
                  <button
                    type="button"
                    class="join-btn"
                    *ngIf="teamCardUiServices.getIfYouareInThisPosition(teamTag,0)"
                    (click)="teamCardUiServices.openSelectorCard(teamTag,1)"
                  >Select card
                  </button>
                  <div style="color: #FFFFFF">
                    Player :
                    <p>{{ teamCardUiServices.whatIsPlayerName(teamTag,1) }}</p>
                  </div>
                </ng-template>

              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer text-center">
        <div class="d-flex justify-content-between">
          <div class="d-flex align-items-center">
            <div class="text-after-circle">Atk :</div>
            <div
              class="circle"
            >{{ teamCardUiServices.whatIsAtk(teamTag) }}
            </div>
          </div>
          <div class="d-flex align-items-center">
            <div class="text-after-circle">Def :</div>
            <div
              class="circle"
            >{{ teamCardUiServices.whatIsDef(teamTag) }}
            </div>
          </div>
          <div class="d-flex align-items-center">
            <div class="text-after-circle">Spd :</div>
            <div
              class="circle"
            >{{ teamCardUiServices.whatIsSpd(teamTag) }}
            </div>
          </div>
          <div class="d-flex align-items-center">
            <div class="text-after-circle">Luk :</div>
            <div class="circle"
            >{{ teamCardUiServices.whatIsLuck(teamTag) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./team-card.ui.scss']
})
export class TeamCardUi {

  @Input() teamTag: number = -1
  readonly teamCardUiServices: TeamCardUiServices = inject(TeamCardUiServices);

}
