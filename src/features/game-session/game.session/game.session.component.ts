
import {DiceUiComponent} from "../../../ui/dice/dice.ui.component";
import {Component} from "@angular/core";


@Component({
  selector: 'app-game.session',
  standalone: true,
  imports: [
    DiceUiComponent
  ],
  template: `
    <div>
      <!--  <ui-map></ui-map>-->

      <ui-dice></ui-dice>
    </div>`,
  styleUrls: ['./game.session.component.scss']
})
export class GameSessionComponent {

}
