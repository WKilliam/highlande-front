import {Component, inject, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PlayersLobbyModels} from "../../models/players.model";
import {GameKeySession} from "../../models/sessions";
import {GameModels} from "../../models/game.models";
import {InfoGame} from "../../models/info.game.models";
import {SwiperCardUi} from "../swiper-card/swiper-card.ui";
import {CardsModel} from "../../models/cards.model";
import {LocalstorageServices} from "../../services/localsotrage/localstorage.services";

@Component({
  selector: 'ui-lobby-room',
  standalone: true,
  imports: [CommonModule, SwiperCardUi],
  template: `
    <div>
      <div class="card text-center card-header">
        <div class="circles-container card-header">
          <div *ngFor="let circle of grayCircles; let i = index" class="circle">
            <img [src]="circle" alt="Gray Circle" *ngIf="circle">
          </div>
        </div>
        <div class="image-content">
        </div>
        <div class="card-footer text-muted">
          <button>Start Game</button>
        </div>
      </div>
      <ui-swiper-card *ngIf="isActiveSelectorCard" class="card-selector"></ui-swiper-card>
    </div>
  `,
  styleUrls: ['./lobby-room.ui.scss']
})
export class LobbyRoomUi implements OnInit {

  players: Array<PlayersLobbyModels> = []
  grayCircles: any[] = new Array(8);
  private eventInfoGame = inject(LocalstorageServices).getInfoGame()
  isActiveSelectorCard: boolean = false;
  infoGame: InfoGame | null = this.eventInfoGame()?.toString() !== '{}' ? JSON.parse(this.eventInfoGame()?.toString() ?? '{}') : null;

  ngOnInit(): void {
    if (this.infoGame !== null) {
      this.players = this.infoGame?.lobby;
      // Initialisation des pastilles grises
      this.grayCircles = new Array(7);

      // Remplissage des pastilles avec les avatars des joueurs
      for (let i = 0; i < this.infoGame?.lobby.length; i++) {
        this.grayCircles.push(this.players[i].avatar);
      }
    }
  }
}
