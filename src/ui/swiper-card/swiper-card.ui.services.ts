import {inject, Injectable} from "@angular/core";
import {CardByEntityPlaying, CardEntitySimplify, CardsRestApi} from "../../models/cards.models";
import {LocalstorageServices} from "../../services/localsotrage/localstorage.services";
import {Utils} from "../../services/Utils";
import {AppServices} from "../../app/app.services";
import {StoreServicesSocket} from "../../services/store-Socket/store.services.socket";


@Injectable({
  providedIn: `root`
})
export class SwiperCardUiServices {

  readonly cardsList: Array<CardByEntityPlaying> = []
  readonly localStore: LocalstorageServices = inject(LocalstorageServices)
  readonly appServices: AppServices = inject(AppServices);
  readonly storeSocket: StoreServicesSocket = inject(StoreServicesSocket);

  constructor() {
    if (this.localStore.getSessionStatusGame() !== null) {
      let indexLobby = Utils.indexLobbyPosition(
        this.localStore.getSessionStatusGame().lobby,
        this.localStore.getUser().pseudo,
        this.localStore.getUser().avatar
      )
      if (indexLobby !== -1) {
        let cards = this.localStore.getSessionStatusGame().lobby[indexLobby].cards
        for (let i = 0; i < cards.length; i++) {
          let card = {
            name: cards[i].name,
              description: cards[i].description,
            imageSrc: cards[i].image,
            rarity: cards[i].rarity,
            atk: cards[i].atk,
            def: cards[i].def,
            spd: cards[i].spd,
            luk: cards[i].luk,
            effects: cards[i].effects,
            capacities: cards[i].capacities,

          }
          this.cardsList.push(card)
        }
      }
    }
  }

  selectedCard(cardsRestApi: CardByEntityPlaying) {
    this.storeSocket.joinCard(cardsRestApi,this.localStore.getPlayerPosition())
    this.appServices.setOpenSelectorCard(false)
  }
}
