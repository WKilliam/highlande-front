import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PlayerInGameModel, PlayersLobbyModels, PlayersModel} from "../../models/players.model";
import {GameModels} from "../../models/parties.models";
import {GameKeySession} from "../../models/sessions";

@Component({
  selector: 'ui-lobby-room',
  standalone: true,
  imports: [CommonModule],
  template: `
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
  `,
  styleUrls: ['./lobby-room.ui.scss']
})
export class LobbyRoomUi implements OnInit {

  players: Array<PlayersLobbyModels> = []
  grayCircles: any[] = new Array(8);
  gameKeySession: GameKeySession = JSON.parse(localStorage.getItem('gameKeySession') || '{}');
  game: GameModels = JSON.parse(localStorage.getItem('game') || '{}');

  ngOnInit(): void {
    if (this.gameKeySession?.key && this.game) {
      this.players = this.game?.lobby;

      // Initialisation des pastilles grises
      this.grayCircles = new Array(7);

      // Remplissage des pastilles avec les avatars des joueurs
      for (let i = 0; i < this.game?.lobby.length; i++) {
        this.grayCircles.push(this.players[i].avatar);
      }
    }
  }
}
