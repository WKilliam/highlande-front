import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CardsFightUi} from "../../../../refonte/ui/cards-fight/cards-fight.ui";
import {LittleCardSelectorUi} from "../little-card-selector/little-card-selector.ui";
import {SwiperCardUiServices} from "./swiper-card.ui.services";
import {CardByEntityPlaying} from "../../../models/cards.models";

@Component({
  selector: 'ui-swiper-card',
  standalone: true,
  imports: [CommonModule, CardsFightUi, LittleCardSelectorUi],
  template: `
    <div class="content-carousel">
      <div class="container">
        <div class="cards-container" *ngFor="let item of cardsList">
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
export class SwiperCardUi{
  readonly swiperCardUiServices = inject(SwiperCardUiServices);
  protected cardsList: Array<CardByEntityPlaying> = []

  constructor() {
    this.cardsList = this.swiperCardUiServices.cardsList
  }

}
