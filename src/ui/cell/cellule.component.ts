import {Component, Input} from '@angular/core'
import {Title} from '@angular/platform-browser'

@Component({
  selector: 'ui-cellule',
  template: `
    <div
      class="cube"
      [style.top]="top"
      [style.left]="left"
    >
    </div>`,
  styleUrls: ['cellule.component.scss'],
})
export class Cellule {
  @Input() backgroundColor: string = 'rgba(255, 255, 255, 0.50)'; // Couleur de fond par défaut
  @Input() top: string = '0'; // Position verticale par défaut
  @Input() left: string = '0'; // Position horizontale par défaut

  constructor(private title: Title) {
    this.title.setTitle('exported project');
  }
}
