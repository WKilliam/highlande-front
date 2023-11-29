import {DiceUiComponent} from "../../ui/dice/dice.ui.component";
import {Component, inject} from "@angular/core";
import {MapUiComponent} from "../../ui/map/map.ui.component";
import {CardsFightUi} from "../../ui/cards-fight/cards-fight.ui";
import {LifeBarUi} from "../../ui/life-bar/life-bar.ui";
import {NgIf} from "@angular/common";
import {GameSessionServices} from "./game-session-services";


@Component({
  selector: 'app-game.session',
  standalone: true,
  imports: [
    DiceUiComponent,
    MapUiComponent,
    CardsFightUi,
    LifeBarUi,
    NgIf
  ],
  template: `
    <div class="page-container">
      <div class="container-fluid">
        <div class="row">
          <div class="col-3">
            <div class="position-content">
              <ui-cards-fight
                class="card-center"
                [link]="gameSessionServices.getimgSrcCardOne()"
                [rarity]="gameSessionServices.getrarityCardOne()"
              ></ui-cards-fight>
              <div class="life-bar-position">
              </div>
            </div>
          </div>
          <div class="col-6">
            <div class="row">
              <div class="col-12">
                <div class="timeOutPrint">
                  <p class="text">
                    Turn : {{gameSessionServices.localStore.getSessionStatusGame().turnCount}} -
                    Timer : {{gameSessionServices.getTimerValue()}} -
                    Status : {{gameSessionServices.getTurnStatus()}}
                  </p>
                  <p class="text" style="color: red;">Entity :
                    {{gameSessionServices.localStore.getCurrentTurn().pseudo}}
                  </p>
                  <p class="text" style="color: red;">Entity :
                    {{gameSessionServices.getMessageByAction()}}
                  </p>
                </div>
              </div>
            </div>
            <ui-map
              [canMovePosition]="gameSessionServices.getallCanMovePosition()"
            ></ui-map>
            <div *ngIf="gameSessionServices.getHiddenDice()">
              <ui-dice (click)="gameSessionServices.roollingDice()"></ui-dice>
              <div style="font-family: irish-grover; font-size: 3rem;color: #FFFFFF">{{gameSessionServices.getDiceResult()}}</div>
            </div>
            <div>
<!--              <p>{{gameSessionServices.localStore.getCurrentTurn().turnEntity.pseudo}}</p>-->
            </div>
          </div>
          <div class="col-3">
            <div class="position-content">
              <ui-cards-fight
                [link]="gameSessionServices.getimgSrcCardTwo()"
                [rarity]="gameSessionServices.getrarityCardTwo()"
                class="card-center"></ui-cards-fight>
              <div class="life-bar-position">
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

  readonly gameSessionServices:GameSessionServices = inject(GameSessionServices);
}
