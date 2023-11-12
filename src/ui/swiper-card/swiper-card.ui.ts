import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CardsFightUi} from "../cards-fight/cards-fight.ui";
import {LittleCardSelectorUi} from "../little-card-selector/little-card-selector.ui";
import {SwiperCardUiServices} from "./swiper-card.ui.services";

@Component({
  selector: 'ui-swiper-card',
  standalone: true,
  imports: [CommonModule, CardsFightUi, LittleCardSelectorUi],
  template: `
    <div class="content-carousel">
      <div class="container">
        <div class="cards-container" *ngFor="let item of swiperCardUiServices.cardsList">
          <ui-little-card-selector
            [imageSrc]="item.imageSrc"
            [raritySrc]="item.rarity"
            (click)="swiperCardUiServices.selectedCard(item)"
          ></ui-little-card-selector>
        </div>
      </div>
    </div>

  `,
  styleUrls: ['./swiper-card.ui.scss']
})
export class SwiperCardUi
  // implements OnInit
{
  readonly swiperCardUiServices = inject(SwiperCardUiServices);

}
