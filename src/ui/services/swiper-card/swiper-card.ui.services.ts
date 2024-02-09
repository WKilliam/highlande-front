import {inject, Injectable} from "@angular/core";
import {CardByEntityPlaying, CardEntitySimplify} from "../../../models/cards.models";
import {StorageManagerApp} from "../../../services/storageManagerApp/storageManagerApp";
import {DispatcherSocket} from "../../../services/dispatchers/dispatcher-socket/dispatcher-socket";


@Injectable({
  providedIn: `root`
})
export class SwiperCardUiServices {

  readonly cardsList: Array<CardEntitySimplify> = []
  readonly #storeManagerApp = inject(StorageManagerApp);
  readonly #dispatchersocket = inject(DispatcherSocket);
  isActive: boolean = false
  teamTag = -1
  cardTag = -1


  constructor() {
    this.cardsList = this.#storeManagerApp.getUser().cards
  }

  getCardPlayer() {
    return this.cardsList
  }

  selectecCard(cardIndex: number) {
    // console.log('card selected', cardIndex)
    // console.log('card for team', this.teamTag)
    // console.log('card for card', this.cardTag)
    this.#dispatchersocket.selectCard(cardIndex, this.teamTag, this.cardTag)
  }

}
