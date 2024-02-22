import {Component, Input, SimpleChanges} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-lifebar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="progress-container">
      <div class="progress-bar" [style.height.%]="progress" [style.backgroundColor]="getProgressBarColor()"></div>
    </div>
  `,
  styleUrls: ['./lifebar.component.scss']
})
export class LifebarComponent {
  @Input() progress: number = 0;

  ngOnChanges(changes: SimpleChanges): void {
    // La logique de changement de couleur peut être gérée directement dans le template ou ici
  }

  getProgressBarColor(): string {
    if (this.progress > 60) return '#4CAF50'; // Vert
    if (this.progress >= 45 && this.progress <= 59) return '#FFA500'; // Orange
    return '#FF0000'; // Rouge
  }
}
