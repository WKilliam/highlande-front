import {Injectable, OnInit} from "@angular/core";
import {io} from "socket.io-client";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  socketEndPoints = 'highlander-socket';
  socket = io('http://localhost:3000', {transports: ['websocket']});
  // private messageSubject = new BehaviorSubject<string>('');
  // message$: Observable<string> = this.messageSubject.asObservable();
  // private alerteSubject = new BehaviorSubject<string>('');
  // alert$: Observable<string> = this.alerteSubject.asObservable();

  joinDefaultRoom() {
    return this.socket.emit('join-default');
  }

  appConnectedEvent(gameKey: string) {
    if(gameKey === 'default'){
      return this.socket.on('app-connected', (message: string) => {
        console.log(message)
      });
    }else{
      return this.socket.on(`app-connected-${gameKey}`, (message: string) => {
        console.log(message)
      });
    }
  }

  joinRoom(room: string) {
     return this.socket.emit('join-session', {roomjoin: room});
  }

  joinTeamCard(room: string) {

  }

}
