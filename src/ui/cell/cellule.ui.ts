import {Component, Input} from '@angular/core'
import {Title} from '@angular/platform-browser'
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'ui-cellule',
  standalone: true,
  template: `
    <div>
      <div
        class="cube"
        [style.top]="top"
        [style.left]="left"
      >
        <p>{{cellId}}</p>
      </div>
      <div
        class="cube icon"
        [style.top]="top"
        [style.left]="left"
      >
        <mat-icon>get_app</mat-icon>
      </div>
    </div>
  `,
  styleUrls: ['cellule.ui.scss'],
  imports: [
    MatIconModule
  ]
})
export class Cellule {
  @Input() top: string = '0'; // Position verticale par défaut
  @Input() left: string = '0'; // Position horizontale par défaut
  @Input() cellId: number = 0;

  constructor(private title: Title) {
    this.title.setTitle('exported project');
  }
}
