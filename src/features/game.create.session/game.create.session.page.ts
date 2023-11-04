import {Component, effect, inject, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CreateSessionUi} from "../../ui/create-session/create-session.ui";
import {StoreServicesApi} from "../../services/store-Api/store.services.api";
import {LocalstorageServices} from "../../services/localsotrage/localstorage.services";
import {Router} from "@angular/router";
import {FormatModel} from "../../models/format.model";
import {StoreServicesSocket} from "../../services/store-Socket/store.services.socket";
import {SessionCheckUser} from "../../models/sessions";
import {PartiesModelsJson} from "../../models/parties.models";
import {UserModels} from "../../models/user.models";
import {register} from "swiper/swiper-element";
import {SocketJoinSession} from "../../models/socket.models";
import {InfoGame} from "../../models/info.game.models";
import {MapModels} from "../../models/maps.models";
import {GameModels} from "../../models/game.models";

@Component({
  selector: 'app-game.create.session',
  standalone: true,
  imports: [CommonModule, CreateSessionUi],
  template: `
    <div class="container-fluid">
      <div class="row" style="padding: 2rem">
        <div class="col-3">
        </div>
        <div class="col-6">
          <!--          <ui-create-session (onInitSession)="initCreateSession()"></ui-create-session>-->
          <ui-create-session (onInitSession)="createSession()"></ui-create-session>
        </div>
        <div class="col-3">
        </div>
      </div>
    </div>`,
  styleUrls: ['./game.create.session.page.scss']
})
export class GameCreateSessionPage implements OnDestroy, OnInit {

  private effectRef: any
  readonly eventUser = inject(LocalstorageServices).eventUserSignal
  readonly eventInfoGame = inject(LocalstorageServices).eventInfoGameSignal

  private userModel: UserModels | null = null
  private infoGame: InfoGame | null = null
  sessionCheckUser: SessionCheckUser | null = null

  private readonly router = inject(Router)
  private storeApi = inject(StoreServicesApi)
  private storeSocket = inject(StoreServicesSocket)

  constructor() {

    this.effectRef = effect(() => {
      if (this.eventUser() !== null) {
        this.userModel = JSON.parse(this.eventUser() ?? '{}')
      }
      if (this.eventInfoGame() !== null) {
        this.infoGame = JSON.parse(this.eventInfoGame() ?? '{}')
      }
    })
  }

  ngOnInit(): void {

    this.userModel = JSON.parse(this.eventUser()?.toString() ?? '{}')

    if (this.userModel) {
      this.sessionCheckUser = {
        avatar: this.userModel.avatar,
        pseudo: this.userModel.pseudo,
      }
      this.checkUser()
    } else {
      this.router.navigateByUrl(`/testeurio`);
    }
  }


  ngOnDestroy(): void {
    this.effectRef.destroy()
  }

  checkUser() {
    if (this.sessionCheckUser !== null) {
      this.storeApi.checkIfUserInsideSession(this.sessionCheckUser).subscribe((received: FormatModel) => {
        console.log(received)
        if ((received.data.code >= 200 && received.data.code <= 299)) {
          if (received.data.isValid) {
            // user is inside session
            this.joinSession(received.data.sessionKey)
          } else {
            // user isn't inside session

          }
        } else {
          this.router.navigateByUrl(`/testeurio`);
        }
      })
    } else {
      console.log('sessionCheckUser is null')
      this.router.navigateByUrl(`/testeurio`);
    }
  }

  createSession() {

  }

  joinSession(room: string) {
    if (room !== null && this.sessionCheckUser?.avatar !== null && this.sessionCheckUser?.pseudo !== null) {
      let socketData: SocketJoinSession = {
        room: room,
        avatar: this.sessionCheckUser?.avatar ?? '',
        pseudo: this.sessionCheckUser?.pseudo ?? '',
      }
      this.storeSocket.joinAnotherRoom(socketData)
      // if(this.infoGame !== null) {
      //   this.router.navigateByUrl(`/lobby/${this.infoGame.gameKeySession.key}`);
      // }else{
      //   this.router.navigateByUrl(`/testeurio`);
      // }
    }
  }

}
