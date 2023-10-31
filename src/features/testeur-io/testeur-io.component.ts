import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SocketService} from "../../services/socket/socket.service";
import {StoreServicesApi} from "../../services/store-Api/store.services.api";
import {Router} from "@angular/router";
import {SwiperCardUi} from "../../ui/swiper-card/swiper-card.ui";
import {LocalstorageServices} from "../../services/localsotrage/localstorage.services";

@Component({
  selector: 'app-testeur-io',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SwiperCardUi],
  template: `
    <div>
      <ui-swiper-card></ui-swiper-card>
      <h1>Chat en direct</h1>
      <p>{{alerte}}</p>
      <div>
        <label for="roomSelect">Choisir une salle :</label>
        <select id="roomSelect"
                [(ngModel)]="switchRoom"
                (change)="joinRoom(switchRoom)"
        >
          <option value="default">Default</option>
          <option value="room1">Salle 1</option>
          <option value="room2">Salle 2</option>
        </select>
      </div>

      <div>
        <input type="text" [(ngModel)]="message" placeholder="Entrez votre message">
        <button (click)="sendMessageToRoom()">Envoyer</button>
      </div>
      <div style="background-color: #FFFFFF">
        {{message}}
      </div>
      <div>
        <label for="roomSelect">Choisir user :</label>
        <select id="roomSelect"
                [(ngModel)]="userSwitch"
                (change)="joinRoom(switchRoom)"
        >
          <option value="User1">User1</option>
          <option value="User2">User2</option>
        </select>
        <button (click)="connectUser()">Login</button>
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
  router = inject(Router)

  ngOnInit(): void {
    // this.socket.initSocket();
    // this.socket.getEventMessage(this.currentRoom)
    // this.socket.getAlterServer().subscribe((message: string) => {
    //   this.alerte = message;
    // })
    // this.socket.getEventMessageSend()
    // this.socket.getMessage().subscribe((message: string) => {
    //   this.message = message;
    // })
    // this.message = '';
  }

  joinRoom(room: string) {
    // this.socket.joinRoom(room, this.currentRoom);
    this.currentRoom = room;
  }

  //
  sendMessageToRoom() {
    // this.socket.sendMessageToRoom(this.message, this.currentRoom);
    // this.message = '';
  }

  connectUser() {
    if(this.userSwitch === 'User1') {
      this.storeApi.login('john.doe@example.com','motdepasse').subscribe(received=>{
        if(received){
          this.local.createStorageByKey('user',received)
          this.router.navigateByUrl(`/lobby`);
        }
      })
    } else {
      this.storeApi.login('john2.doe@example.com','motdepasse').subscribe(received=>{
        console.log(received)
        if(received){
          this.local.createStorageByKey('user',received)
          this.router.navigateByUrl(`/lobby`);
        }
      })
    }
  }
}
