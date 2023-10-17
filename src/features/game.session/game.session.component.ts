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
<!--                <ui-life-bar ></ui-life-bar>-->
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
<!--                <ui-life-bar ></ui-life-bar>-->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./game.session.component.scss']
})
export class GameSessionComponent {
  circles = [
    { text: '25%', active: true },
    { text: '50%', active: false },
    { text: '75%', active: false },
    { text: '100%', active: false }
  ];
  progressWidth: string | undefined;

  ngOnInit() {
    this.update(2); // Mettez le numéro de l'étape initiale ici
  }

  update(currentActive: number) {
    this.circles.forEach((circle, i) => {
      circle.active = i < currentActive;
    });

    const activeCircles = this.circles.filter(circle => circle.active);
    this.progressWidth = ((activeCircles.length - 1) / (this.circles.length - 1)) * 100 + '%';
  }
}
