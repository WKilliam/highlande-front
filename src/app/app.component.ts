import {Component, effect, EffectRef, inject, OnDestroy, OnInit, signal, untracked} from '@angular/core';
import {Router, RouterOutlet} from "@angular/router";
import {StoreServicesSocket} from "../services/store-Socket/store.services.socket";
import {LocalstorageServices} from "../services/localsotrage/localstorage.services";
import {InfoGame} from "../models/info.game.models";
import {UserModels} from "../models/user.models";
import {SocketJoinSession} from "../models/socket.models";

@Component({
  selector: 'app-root',
  template: `
    <div>
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    RouterOutlet,
  ],
})
export class AppComponent implements OnDestroy {


  private readonly storeSocket: StoreServicesSocket = inject(StoreServicesSocket);
  private effectRef: any;
  private readonly router = inject(Router)
  private readonly eventUser = inject(LocalstorageServices).getUser()
  private readonly eventInfoGame = inject(LocalstorageServices).getInfoGame()

  constructor() {
    this.effectRef = effect(() => {
      untracked(() => {
        if (this.eventUser() !== null) {
          this.storeSocket.joinDefaultRoom();
          this.router.navigateByUrl(`/testeurio`);
        } else {
          if (this.eventInfoGame() !== null) {
            let infoGame: InfoGame = JSON.parse(this.eventInfoGame()?.toString() ?? '{}')
            let user: UserModels = JSON.parse(this.eventUser()?.toString() ?? '{}')
            let socketJoin: SocketJoinSession = {
              room: infoGame.gameKeySession.key,
              pseudo: user.pseudo,
              avatar: user.avatar
            };
            this.storeSocket.joinAnotherRoom(socketJoin);
            this.router.navigateByUrl(`/lobby/${infoGame.gameKeySession.key}`);
          } else {
            this.storeSocket.joinDefaultRoom();
            this.router.navigateByUrl(`/testeurio`);
          }
        }
      })
    })
  }

  ngOnDestroy(): void {
    this.effectRef.destroy()
  }

}
