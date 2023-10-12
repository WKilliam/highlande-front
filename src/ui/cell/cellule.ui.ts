import {Component, Input} from '@angular/core'
import {Title} from '@angular/platform-browser'

@Component({
  selector: 'ui-cellule',
  standalone: true,
  template: `
    <div
      class="cube"
      [style.top]="top"
      [style.left]="left"
    >
      <p>{{cellId}}</p>
    </div>`,
  styleUrls: ['cellule.ui.scss'],
})
export class Cellule {
  @Input() top: string = '0'; // Position verticale par défaut
  @Input() left: string = '0'; // Position horizontale par défaut
  @Input() cellId: number = 0;

  constructor(private title: Title) {
    this.title.setTitle('exported project');
  }
}
