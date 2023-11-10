import {
  Component, inject, Input,
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SwiperCardUi} from "../swiper-card/swiper-card.ui";
import {LittleCardSelectorUi} from "../little-card-selector/little-card-selector.ui";
import {TeamCardUiServices} from "./team-card.ui.services";

@Component({
  selector: 'ui-team-card',
  standalone: true,
  imports: [CommonModule, SwiperCardUi, LittleCardSelectorUi],
  template: `
    <div class="card  bg-transparent card-effect" style="margin: 1rem">
      <div class="card-header text-center team-text">
        <p>{{teamCardUiServices.teamByPositionName(teamTag)}}</p>
      </div>
      <div class="card-body text-center">
        <div class="row">
          <div class="col-6">
            <div class="row">
              <div class="col">
                <div class="rectangle">
                  <img
                    [src]="teamCardUiServices.teamByPositionImage(teamTag,0)"
                    alt="Image"
                    [ngClass]="teamCardUiServices.teamByPositionRarity(teamTag,0)"
                    width="120"
                    height="224"
                  />
                </div>
              </div>
              <div class="col">
                <button
                  type="button"
                  class="join-btn"
                  (click)="teamCardUiServices.joinCard(0)"
                >Join
                </button>
                <div style="color: #FFFFFF">
                  Player :
                  <p>{{teamCardUiServices.teamByPositionPlayer(teamTag,0)}}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-6">
            <div class="row">
              <div class="col">
                <div class="rectangle">
                  <img
                    [src]="teamCardUiServices.teamByPositionImage(teamTag,1)"
                    alt="Image"
                    [ngClass]="teamCardUiServices.teamByPositionRarity(teamTag,1)"
                    width="120"
                    height="224"
                  />
                </div>
              </div>
              <div class="col">
                <button
                  type="button"
                  class="join-btn"
                  (click)="teamCardUiServices.joinCard(1)"
                >Join
                </button>
                <div style="color: #FFFFFF">
                  Player :
                  <p>{{ teamCardUiServices.teamByPositionPlayer(teamTag,1) }}</p>
                </div>
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
            >{{teamCardUiServices.teamByPositionCommonAtk(teamTag)}}</div>
          </div>
          <div class="d-flex align-items-center">
            <div class="text-after-circle">Def :</div>
            <div
              class="circle"
            >{{teamCardUiServices.teamByPositionCommonDef(teamTag)}}</div>
          </div>
          <div class="d-flex align-items-center">
            <div class="text-after-circle">Spd :</div>
            <div
              class="circle"
            >{{ teamCardUiServices.teamByPositionCommonSpd(teamTag)}}</div>
          </div>
          <div class="d-flex align-items-center">
            <div class="text-after-circle">Luk :</div>
            <div class="circle"
            >{{teamCardUiServices.teamByPositionCommonLuk(teamTag)}}</div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./team-card.ui.scss']
})
export class TeamCardUi {

  @Input() teamTag: number = -1
  readonly teamCardUiServices = inject(TeamCardUiServices);


}
