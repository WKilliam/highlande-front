import {CommonModule} from '@angular/common';
import {Component, Input} from '@angular/core';

@Component({
  selector: 'ui-character',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="character-content"
         [style.top]="top"
         [style.left]="left"
    >
      <img
        *ngIf="direction === 'idle'"
        src="./../../assets/character/idle.gif"
        alt="character-content"
        class="character-image"/>
      <img
        *ngIf="direction === 'left'"
        src="./../../assets/character/left.gif"
        alt="character-content"
        class="character-image"/>
      <img
        *ngIf="direction === 'right'"
        src="./../../assets/character/right.gif"
        alt="character-content"
        class="character-image"/>
      <img
        *ngIf="direction === 'top'"
        src="./../../assets/character/top.gif"
        alt="character-content"
        class="character-image"/>
      <img
        *ngIf="direction === 'bottom'"
        src="./../../assets/character/button.gif"
        alt="character-content"
        class="character-image"/>
    </div>`,
  styleUrls: ['./character.ui.component.scss']
})
export class CharacterUiComponent {
  @Input() direction = 'idle';
  @Input() top: string = '0'; // Position verticale par défaut
  @Input() left: string = '0'; // Position horizontale par défaut
  @Input() render: string = '';

}
