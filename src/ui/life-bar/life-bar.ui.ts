import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'ui-life-bar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="progress">
      <div class="bar"></div>
    </div>
<!--    <div class="progress">-->

<!--      <div class="rectangle-row">-->
<!--        <div class="diamond"-->
<!--             *ngFor="let i of rectangles">-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
  `,
  styleUrls: ['./life-bar.ui.scss']
})
export class LifeBarUi {
  @Input() progress: number = 0;

  // ...

  get rectangles(): number[] {
    return new Array(10);
  }
}
