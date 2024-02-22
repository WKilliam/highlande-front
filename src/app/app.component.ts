import {Component} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {SocketService} from "../services/socket/socket.service";

@Component({
  selector: 'app-root',
  template: `
    <div>
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    RouterOutlet,
  ],
})
export class AppComponent {

  // constructor(private socketService: SocketService) {
  //   this.socketService.socketCallReceived()
  // }
}
