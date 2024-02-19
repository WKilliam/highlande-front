// import {SwiperCardUi} from "../swiper-card/swiper-card.ui";
import {CommonModule} from "@angular/common";
import {Component, inject, Input} from "@angular/core";
import {LobbyRoomUiServices} from "../../services/lobby-room/lobby-room.ui.services";
import {SwiperCardUi} from "../swiper-card/swiper-card.ui";
import {SwiperCardUiServices} from "../../services/swiper-card/swiper-card.ui.services";
import {TextConstante} from "../../../app/text.constante";

@Component({
  selector: 'ui-lobby-room',
  standalone: true,
  imports: [CommonModule, SwiperCardUi],
  template: `
    <div>
      <div class="card text-center card-header">
        <p style="font-size: 3rem; font-family: irish-grover; color: red">
          {{ lobbyRoomUiServices.timer() }}
          {{lobbyRoomUiServices.getValid()}}
        </p>
        <div class="circles-container card-header">
          <div *ngFor="let circle of lobbyRoomUiServices.getEventGrayCircles(); let i = index" class="circle">
            <img [src]="circle" alt="Gray Circle" *ngIf="circle">
          </div>
        </div>
        <div class="tagName">
          Session De : {{ lobbyRoomUiServices.getName() }}
        </div>
        <div class="image-content">
        </div>
        <div class="card-footer text-muted">
          <button class="btn btn-lg btn-primary pull-xs-right"
                  (click)="lobbyRoomUiServices.startGame()"
                  *ngIf="lobbyRoomUiServices.getValid()"
          >
            {{ textConstante.textUi.get('Start') }}
          </button>
        </div>
      </div>
      <ui-swiper-card *ngIf="swiperCardUiService.isActive" class="card-selector"></ui-swiper-card>
    </div>
  `,
  styleUrls: ['./lobby-room.ui.scss']
})
export class LobbyRoomUi {

  readonly textConstante = inject(TextConstante);
  readonly lobbyRoomUiServices = inject(LobbyRoomUiServices);
  readonly swiperCardUiService = inject(SwiperCardUiServices);


}
