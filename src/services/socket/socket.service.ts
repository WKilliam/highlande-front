import {Injectable, OnInit} from "@angular/core";
import {io} from "socket.io-client";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  socketEndPoints = 'highlander-socket';
  socket: any;
  private messageSubject = new BehaviorSubject<string>('');
  message$: Observable<string> = this.messageSubject.asObservable();

  constructor() {
    this.socket = io('http://localhost:3000', { transports: ['websocket'] });
  }

  joinRoom(room: string) {
    this.socket.emit('join-room', room);
  }
  sendMessageOnRoom(message: string,room:string) {
    this.socket.emit(`send-message-by-room`, {
      room: room,
      message: message
    });
  }
  leaveRoom(room: string) {
    this.socket.emit('leave-room', room);
  }

  receiveMessageOnRoom(room:string) {
    return this.socket.on(`receive-${this.socketEndPoints}-${room}`, (data: any) => {
      console.log('Message from server:', data);
      this.messageSubject.next(data);
    });
  }
}
