import {Injectable, OnInit} from "@angular/core";
import {io} from "socket.io-client";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  socketEndPoints = 'highlander-socket';
  socket = io('http://localhost:3000', {transports: ['websocket']});
  private messageSubject = new BehaviorSubject<string>('');
  message$: Observable<string> = this.messageSubject.asObservable();
  private alerteSubject = new BehaviorSubject<string>('');
  alert$: Observable<string> = this.alerteSubject.asObservable();

  initSocket() {
    this.socket.emit('join', {
      joinnedRoom: `${this.socketEndPoints}-default`
    });
  }

  joinRoom(room: string,oldRoom:string) {
    console.log(`connection to room: ${this.socketEndPoints}-${room} and left room: ${this.socketEndPoints}-${oldRoom}`)
    this.socket.emit('join', {
      joinnedRoom: `${this.socketEndPoints}-${room}`,
      oldRoom: `${this.socketEndPoints}-${oldRoom}`,
    });
  }

  getEventMessage(room: string) {
    this.socket.on(`send-alerte`, (message: string) => {
      this.alerteSubject.next(message);
    });
  }

  getAlterServer() {
    return this.alert$;
  }

  sendMessageToRoom(message: string, room: string) {
    this.socket.emit('messageFromClient', {
      message: message,
      room: `${this.socketEndPoints}-${room}`
    });
  }

  getEventMessageSend(){
    this.socket.on(`messageFromServer`, (message: string) => {
      this.messageSubject.next(message);
    });
  }

  getMessage(){
    return this.message$;
  }

}
