import {Component, inject, OnInit} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {SocketIoModule} from "ngx-socket-io";
import {SocketService} from "../services/socket/socket.service";
import {GameKeySession} from "../models/sessions";
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

  socket = inject(SocketService)
  gameKeySession : GameKeySession = JSON.parse(localStorage.getItem('gameKeySession') || '{}');

  ngOnInit(): void {
    if(JSON.stringify(this.gameKeySession) !== '{}'){
      this.socket.joinRoom(this.gameKeySession?.key, 'default');
    }else{
      this.socket.initSocket();
    }
  }

}
