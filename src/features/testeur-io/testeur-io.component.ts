import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SocketService} from "../../services/socket/socket.service";

@Component({
  selector: 'app-testeur-io',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div>
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
    </div>
  `,
  styleUrls: ['./testeur-io.component.scss']
})
export class TesteurIOComponent implements OnInit {

  currentRoom: string = 'default';
  switchRoom: string = 'default';
  message: string = '';
  alerte: string = '';
  socket = inject(SocketService)

  ngOnInit(): void {
    this.socket.initSocket();
    this.socket.getEventMessage(this.currentRoom)
    this.socket.getAlterServer().subscribe((message: string) => {
      this.alerte = message;
    })
    this.socket.getEventMessageSend()
    this.socket.getMessage().subscribe((message: string) => {
      this.message = message;
    })
    this.message = '';
  }

  joinRoom(room: string) {
    this.socket.joinRoom(room, this.currentRoom);
    this.currentRoom = room;
  }

  //
  sendMessageToRoom() {
    this.socket.sendMessageToRoom(this.message, this.currentRoom);
    this.message = '';
  }
}
