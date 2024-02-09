import {
  Component, effect, inject, Injector, Input, OnInit, runInInjectionContext,
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TeamCardUiServices} from "../../services/team-card/team-card.ui.services";
import {DispatcherSocket} from "../../../services/dispatchers/dispatcher-socket/dispatcher-socket";
import {StorageManagerApp} from 'src/services/storageManagerApp/storageManagerApp';

@Component({
  selector: 'ui-team-card',
  standalone: true,
  imports: [
    CommonModule,
    // SwiperCardUi,
    // LittleCardSelectorUi
  ],
  template: `
    <div class="card  bg-transparent card-effect" style="margin: 1rem">
      <div class="card-header text-center team-text">
        <p>{{ teamName }}</p>
        <p>
          {{ teamCardUiServices.getPlayerOneName() }}- {{ teamCardUiServices.getPlayerTwoName() }}
        </p>
      </div>
      <div class="card-body text-center">
        <div class="row">
          <div class="col-6">
            <div class="row">
              <div class="col">
                <div class="rectangle">
                  <img
                    alt="Image"
                    [ngClass]="teamRarityCardOne"
                    [src]="teamImageOne"
                    width="120"
                    height="224"
                    loading="lazy"
                  />
                </div>
              </div>
              <div class="col">
                <button
                  type="button"
                  class="join-btn"
                  *ngIf="playerPositionOne === 'Player #'"
                  (click)="teamCardUiServices.joinTeam(teamTag,0)"
                >Join
                </button>
                <div style="color: #FFFFFF">
                  Player :
                  <p>{{ playerPositionOne }}</p>
                </div>
                <!--                <button-->
                <!--                  type="button"-->
                <!--                  class="join-btn"-->
                <!--                  *ngIf="teamCardUiServices.selectTeamCardPosition(teamTag,0)"-->
                <!--                  (click)="teamCardUiServices.openSelectorCard()"-->
                <!--                >Select card-->
                <!--                </button>-->
              </div>
            </div>
          </div>
          <div class="col-6">
            <div class="row">
              <div class="col">
                <div class="rectangle">
                  <img
                    [src]="teamImageTwo"
                    alt="Image"
                    [ngClass]="teamRarityCardTwo"
                    width="120"
                    height="224"
                  />
                </div>
              </div>
              <div class="col">
                <button
                  type="button"
                  class="join-btn"
                  *ngIf="playerPositionTwo === 'Player #'"
                  (click)="teamCardUiServices.joinTeam(teamTag,1)"
                >Join
                </button>
                <div style="color: #FFFFFF">
                  Player :
                  <p>{{ playerPositionTwo }}</p>
                </div>
                <!--                <button-->
                <!--                  type="button"-->
                <!--                  class="join-btn"-->
                <!--                  *ngIf="teamCardUiServices.selectCardBtnIfPlayer(teamTag,1)"-->
                <!--                  (click)="teamCardUiServices.openSelectorCard()"-->
                <!--                >Select card-->
                <!--                </button>-->
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
            >{{ teamAtk }}
            </div>
          </div>
          <div class="d-flex align-items-center">
            <div class="text-after-circle">Def :</div>
            <div
              class="circle"
            >{{ teamDef }}
            </div>
          </div>
          <div class="d-flex align-items-center">
            <div class="text-after-circle">Spd :</div>
            <div
              class="circle"
            >{{ teamSpd }}
            </div>
          </div>
          <div class="d-flex align-items-center">
            <div class="text-after-circle">Luk :</div>
            <div class="circle"
            >{{ teamLuck }}
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./team-card.ui.scss']
})
export class TeamCardUi implements OnInit {

  @Input() teamTag: number = -1
  readonly teamCardUiServices: TeamCardUiServices = inject(TeamCardUiServices);
  readonly dispatcherSocket = inject(DispatcherSocket)
  readonly #storeManagerApp = inject(StorageManagerApp);
  teamName: string = 'teamName'
  teamAtk: number = 0
  teamDef: number = 0
  teamSpd: number = 0
  teamLuck: number = 0
  teamImageOne: string = 'https://cdn.discordapp.com/attachments/1060501071056879618/1168479278174830602/kyrasw_the_frame_of_a_back_tarot_card_game_rpg_in_png_format_or_379c9eb1-9bea-4ea4-bd56-c5629407e849.png?ex=65d31d21&is=65c0a821&hm=283eec15deb0af4cde30532cce3bb56ec6f43acc88e8903b21bc2cac941502b8&'
  teamImageTwo: string = 'https://cdn.discordapp.com/attachments/1060501071056879618/1168479278174830602/kyrasw_the_frame_of_a_back_tarot_card_game_rpg_in_png_format_or_379c9eb1-9bea-4ea4-bd56-c5629407e849.png?ex=65d31d21&is=65c0a821&hm=283eec15deb0af4cde30532cce3bb56ec6f43acc88e8903b21bc2cac941502b8&'
  teamRarityCardOne: string = 'common'
  teamRarityCardTwo: string = 'common'
  playerPositionOne: string = 'Player #'
  playerPositionTwo: string = 'Player #'

  constructor() {

  }

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

}
