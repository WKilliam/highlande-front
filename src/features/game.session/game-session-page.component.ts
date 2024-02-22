import {Component, inject} from "@angular/core";
import {NgIf} from "@angular/common";
import {GameSessionServices} from "./game-session-services";
import {MapUiComponent} from "../../ui/component/map/map.ui.component";
import {CardsFightUi} from "../../ui/component/cards-fight/cards-fight.ui";
import {DicesixComponent} from "../../ui/component/dicetest/dicesix.component";
import {LifebarComponent} from "../../ui/component/lifebar/lifebar.component";


@Component({
  selector: 'app-game.session',
  standalone: true,
  imports: [
    MapUiComponent,
    CardsFightUi,
    NgIf,
    DicesixComponent,
    LifebarComponent
  ],
  template: `
    <div class="page-container">
      <div class="container-fluid">
        <div class="row">
          <div class="col-3">
            <div class="position-content">
              <div class="row">
                <div class="col-10">
                  <ui-cards-fight
                    class="card-center"
                    [link]="gameSessionServices.getImgCardByValue(0)"
                    [rarity]="gameSessionServices.getRarityCardByValue(0)"
                  ></ui-cards-fight>
                </div>
                <div class="col-2">
                  <app-lifebar [progress]="gameSessionServices.getCommonHP()"></app-lifebar>
                </div>
              </div>
              <div class="life-bar-position">
              </div>
            </div>
          </div>
          <div class="col-6">
            <div class="timeOutPrint">
              <p class="text">
                Turn : {{ gameSessionServices.getCountTurn() }} -
                Timer : {{ gameSessionServices.getTimerValue() }} -
                Status : {{ gameSessionServices.getStatusCurrentEntity().evolving.currentCan }}
              </p>
              <div class="row">
                <div class="col-2" style="margin-bottom:5px;">
                  Entity :
                </div>
                <div class="col-8" style="margin-bottom:5px;">
                  {{ gameSessionServices.getCurrentEntityPlaying() }}
                  <!--                  - {{ gameSessionServices }}-->
                </div>
              </div>
              <div class="row">
                <div class="col-2" style=" margin-bottom:5px;">
                  Action :
                </div>
                <div class="col-8" style="margin-bottom:5px;">
                  {{ gameSessionServices.getMessageByAction() }}
                </div>
              </div>
              <div class="row">
                <div class="col-2" style=" margin-bottom:5px;">
                  Dice Value :
                </div>
                <div class="col-8" style="margin-bottom:5px;">
                  {{ gameSessionServices.getValueDice() }}
                </div>
              </div>
            </div>
            <ui-map></ui-map>
            <div class="row" *ngIf="gameSessionServices.itYourTurnPleasePrintDice()">
              <div class="col-12" style="margin-top:2rem;">
                <app-dicesix></app-dicesix>
              </div>
            </div>
          </div>
          <div class="col-3">
            <div class="position-content">
              <div class="row">
                <div class="col-2">
                  <app-lifebar [progress]="gameSessionServices.getCommonHP()"></app-lifebar>
                </div>
                <div class="col-10">
                  <ui-cards-fight
                    class="card-center"
                    [link]="gameSessionServices.getImgCardByValue(1)"
                    [rarity]="gameSessionServices.getRarityCardByValue(1)"
                  ></ui-cards-fight>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./game.session.scss']
})
export class GameSessionPage {

  readonly gameSessionServices: GameSessionServices = inject(GameSessionServices);

}
