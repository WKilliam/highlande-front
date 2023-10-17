import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PlayerInGameModel, PlayersModel} from "../../models/players.model";

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
        <!-- Affichez ici d'autres contenus si nécessaire -->
      </div>
      <div class="card-footer text-muted">
        <button>Start Game</button>
      </div>
    </div>
  `,
  styleUrls: ['./lobby-room.ui.scss']
})
export class LobbyRoomUi implements OnInit {

  players: Array<PlayerInGameModel> = []
  grayCircles: any[] = new Array(8);

  ngOnInit(): void {
    const session = JSON.parse(localStorage.getItem('session') || '{}');
    if (session) {
      this.players = session.sessions.currentUserIngame;
      const playerCount = this.players.length;

      // Initialisation des pastilles grises
      this.grayCircles = new Array(8 - playerCount);

      // Remplissage des pastilles avec les avatars des joueurs
      for (let i = 0; i < playerCount; i++) {
        this.grayCircles.push(this.players[i].avatar);
      }
    }
  }

}
