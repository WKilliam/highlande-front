import {Component} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-dice',
  standalone: true,
  imports: [
    CommonModule
  ],
  template:`
    <div class="ui-dice-content">
      <ul class="d20">
        <li class="one">1</li>
        <li class="two">2</li>
        <li class="three">3</li>
        <li class="four">4</li>
        <li class="five">5</li>
        <li class="six">6</li>
        <li class="seven">7</li>
        <li class="eight">8</li>
        <li class="nine">9.</li>
        <li class="ten">10</li>
        <li class="eleven">11</li>
        <li class="twelve">12</li>
        <li class="thirteen">13</li>
        <li class="fourteen">14</li>
        <li class="fifteen">15</li>
        <li class="sixteen">16</li>
        <li class="seventeen">17</li>
        <li class="eighteen">18</li>
        <li class="nineteen">19</li>
        <li class="twenty">20</li>
      </ul>
    </div>
  `,
  styleUrls: ['./dice.ui.component.scss'],

})
export class DiceUiComponent {
  currentAngle = 0;
  state = 'in';

  constructor() { }

  ngOnInit(): void {
    this.rotateDice();
  }

  rotateDice(): void {
    this.currentAngle = Math.floor(Math.random() * 360);
    this.state = this.state === 'in' ? 'out' : 'in';
  }
}
