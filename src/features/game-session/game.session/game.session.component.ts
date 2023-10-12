import {DiceUiComponent} from "../../../ui/dice/dice.ui.component";
import {Component} from "@angular/core";
import {MapUiComponent} from "../../../ui/map/map.ui.component";


@Component({
  selector: 'app-game.session',
  standalone: true,
  imports: [
    DiceUiComponent,
    MapUiComponent
  ],
  template: `
    <div class="container">
      <ui-map></ui-map>

<!--            <ui-dice></ui-dice>-->
    </div>`,
  styleUrls: ['./game.session.component.scss']
})
export class GameSessionComponent {

}
