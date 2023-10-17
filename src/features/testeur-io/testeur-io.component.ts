import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SocketService} from "../../services/socket/socket.service";

@Component({
  selector: 'app-testeur-io',
  standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template:`
    <div>
      <h1>Chat en direct</h1>
      <div>
        <label for="roomSelect">Choisir une salle :</label>
        <select id="roomSelect" [(ngModel)]="currentRoom" (change)="joinRoom(currentRoom)">
          <option value="room1">Salle 1</option>
          <option value="room2">Salle 2</option>
          <!-- Ajoutez autant d'options de salle que nécessaire -->
        </select>
      </div>

      <div>
        <input type="text" [(ngModel)]="message" placeholder="Entrez votre message">
        <button (click)="sendMessage()">Envoyer</button>
      </div>
    </div>
  `,
  styleUrls: ['./testeur-io.component.scss']
})
export class TesteurIOComponent implements OnInit {

  currentRoom: string = 'default'; // Définissez la salle par défaut
  message: string = '';
  socketService = inject(SocketService)

  ngOnInit(): void {
    this.socketService.joinRoom(this.currentRoom)
    this.socketService.receiveMessageOnRoom(this.currentRoom)
    this.socketService.message$.subscribe((data: string) => {
      console.log('Message from server:', data)
      this.message = data
      this.message = ''
    });
  }

  joinRoom(room: string) {
    this.leaveRoom(this.currentRoom);
    this.currentRoom = room;
    this.socketService.joinRoom(room);
    this.socketService.receiveMessageOnRoom(room)
  }

  sendMessage() {
    this.socketService.sendMessageOnRoom(this.message, this.currentRoom);
    this.message = ''; // Réinitialisez le champ de message après l'envoi
  }

  leaveRoom(room: string) {
    this.socketService.leaveRoom(room);
    this.currentRoom = '';
  }

}
