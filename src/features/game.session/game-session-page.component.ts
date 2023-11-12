import {DiceUiComponent} from "../../ui/dice/dice.ui.component";
import {Component} from "@angular/core";
import {MapUiComponent} from "../../ui/map/map.ui.component";
import {CardsFightUi} from "../../ui/cards-fight/cards-fight.ui";
import {LifeBarUi} from "../../ui/life-bar/life-bar.ui";


@Component({
  selector: 'app-game.session',
  standalone: true,
  imports: [
    DiceUiComponent,
    MapUiComponent,
    CardsFightUi,
    LifeBarUi
  ],
  template: `
    <div class="page-container">
      <div class="container-fluid">
        <div class="row">
          <div class="col-3">
            <div class="position-content">
              <ui-cards-fight class="card-center"></ui-cards-fight>
              <div class="life-bar-position">
              </div>
            </div>
          </div>
          <div class="col-6">
            <ui-map></ui-map>
          </div>
          <div class="col-3">
            <div class="position-content">
              <ui-cards-fight class="card-center"></ui-cards-fight>
              <div class="life-bar-position">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./game-session-page.component.scss']
})
export class GameSessionPage {

}
