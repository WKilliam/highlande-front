import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PlayersModel} from "../../models/players.model";

@Component({
  selector: 'ui-lobby-room',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card text-center card-header">
      <!-- Créer les 8 pastilles circulaires grises -->
      <div class="circles-container card-header">
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
      </div>
      <div class="image-content">

      </div>
      <div class="card-footer text-muted">
        2 days ago
      </div>
    </div>
  `,
  styleUrls: ['./lobby-room.ui.scss']
})
export class LobbyRoomUi {

  @Input() players : Array<PlayersModel> = []
}
