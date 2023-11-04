import {Component, effect, inject, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SocketService} from "../../services/socket/socket.service";
import {StoreServicesApi} from "../../services/store-Api/store.services.api";
import {SwiperCardUi} from "../../ui/swiper-card/swiper-card.ui";
import {LocalstorageServices} from "../../services/localsotrage/localstorage.services";
import {UserModels} from "../../models/user.models";
import {Router} from "@angular/router";

@Component({
  selector: 'app-testeur-io',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SwiperCardUi],
  template: `
    <div style="padding: 3rem">
      <div>
        <label for="roomSelect">Choisir user :</label>
        <select id="roomSelect" [(ngModel)]="userSwitch" (change)="joinRoom(switchRoom)">
          <option value="User1">User1</option>
          <option value="User2">User2</option>
        </select>
        <button (click)="connectUser()">Login</button>
      </div>
      <div>
        <p style="font-size: 16px;color: #FFFFFF">User : {{this.eventUser}}</p>
        <p>{{this.userModel | json}}</p>
      </div>
    </div>
  `,
  styleUrls: ['./testeur-io.component.scss']
})
export class TesteurIOComponent implements OnInit {

  currentRoom: string = 'default';
  switchRoom: string = 'default';
  userSwitch: string = 'User1';
  message: string = '';
  alerte: string = '';
  socket = inject(SocketService)
  storeApi = inject(StoreServicesApi)
  local = inject(LocalstorageServices)
  private readonly router = inject(Router)

  readonly eventUser = inject(LocalstorageServices).eventUserSignal
  private eventInfoGame = inject(LocalstorageServices).eventInfoGameSignal()
  private eventGame = inject(LocalstorageServices).eventGameSignal()
  private eventMap = inject(LocalstorageServices).eventMapSignal()
  private effectRef: any
  userModel: UserModels | null = null

  constructor() {
    this.effectRef = effect(() => {
      if(this.eventUser() !== null) {
        let user = this.eventUser()
        this.userModel = JSON.parse(user?.toString() ?? '{}')
        console.log(this.userModel)
      }
    })
  }

  ngOnInit(): void {
  }

  joinRoom(room: string) {
    this.currentRoom = room;
  }

  connectUser() {
    if (this.userSwitch === 'User1') {
      this.storeApi.login('john.doe@example.com', 'motdepasse').subscribe(received => {
        if (received) {
          this.local.setUser(received.data)
          if (this.local.getUser() !== null) {
            console.log(this.local.getUser())
            this.router.navigateByUrl(`/session`);
          }
        }
      })
    } else {
      this.storeApi.login('john2.doe@example.com', 'motdepasse').subscribe(received => {
        if (received) {
          this.local.setUser(received.data)
          if (this.local.getUser() !== null) {
            console.log(this.local.getUser())
            this.router.navigateByUrl(`/session`);
          }
        }
      })
    }
  }


}
