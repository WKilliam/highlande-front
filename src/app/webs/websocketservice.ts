import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  // private socket = io('ws://localhost:3000');
  //
  // public sendMessage(message: string): void {
  //   this.socket.emit('message', message);
  // }
  //
  // public getMessage(): Observable<any> {
  //   return new Observable((observer) => {
  //     this.socket.on('message', (data: any) => {
  //       observer.next(data);
  //     });
  //   });
  // }
}
