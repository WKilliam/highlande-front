import {Component} from '@angular/core';
import {NgSwitch, NgSwitchDefault, NgSwitchCase} from '@angular/common';
import {io} from 'socket.io-client';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [NgSwitch, NgSwitchDefault, NgSwitchCase, FormsModule]
})
export class AppComponent {
  title = 'highlande-front';
  message: string = '';
  socket = io('http://localhost:3000/',{ transports : ['websocket'] });
  serverMessages: string[] = [];

  constructor() {
    // Écoutez les messages du serveur
    this.socket.on('messageFromServer', (data) => {
      console.log('Message from server:', data);
      // Ajoutez le message au tableau des messages du serveur
      this.serverMessages.push(data);
    });
  }

  // Fonction pour envoyer un message au serveur
  sendMessageToServer() {
    this.socket.emit('messageFromClient', this.message);
    this.message = ''; // Effacez le champ de saisie après l'envoi
  }
}
