import {Component, inject, OnInit} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {SocketIoModule} from "ngx-socket-io";
import {SocketService} from "../services/socket/socket.service";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    RouterOutlet
  ],
})
export class AppComponent implements OnInit{

  socketService = inject(SocketService)

  ngOnInit(): void {
    // this.socketService.initSocket();
  }

  socket = inject(SocketService)


  // title = 'highlande-front';
  // newMessage: string ='';
  // messageList: string[] = [];
  // readonly #chatService: ChatService = inject(ChatService);
  //
  // ngOnInit() {
  //   this.#chatService.getNewMessage().subscribe((message: string) => {
  //     this.messageList.push(message);
  //   })
  // }
  //
  // sendMessage() {
  //   this.#chatService.sendMessage(this.newMessage);
  //   this.newMessage = '';
  // }

  // message: string = '';
  // socket = io('http://localhost:3000',{ transports : ['websocket'] });
  // serverMessages: string[] = [];
  //
  // // Fonction pour envoyer un message au serveur
  // sendMessageToServer() {
  //   // Écoutez les messages du serveur
  //   this.socket.on('messageFromServer', (data) => {
  //     console.log('Message from server:', data);
  //     // Ajoutez le message au tableau des messages du serveur
  //     this.serverMessages.push(data);
  //   });
  //   this.socket.emit('messageFromClient', this.message);
  //   this.message = ''; // Effacez le champ de saisie après l'envoi
  // }


}
