import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'ui-little-card-selector',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card">
      <img
        [src]="link"
        alt="Image"
        [ngClass]="rarity"
        class="card-center"
      />
    </div>
  `,
  styleUrls: ['./little-card-selector.ui.scss']
})
export class LittleCardSelectorUi {
  @Input() points: number = 0;
  link: string =
    'https://cdn.discordapp.com/attachments/1060501071056879618/1161721549565460610/kyrasw_black_knight_of_judgment_with_demonic_armor_and_displayi_ffda906d-8d5f-449c-855f-65ec0583dfe9.png?ex=65395481&is=6526df81&hm=8c2bd9609a9a9643d87068432e70f961b95fd3c58f1bf36f0424f7f804e28171&"'

  rarity: string = 'super-rare'
}
