import {Component, inject, OnInit} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {StoreServicesSocket} from "../services/store-Socket/store.services.socket";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    RouterOutlet,
  ],
})
export class AppComponent implements OnInit{

  storeServicesSocket: StoreServicesSocket = inject(StoreServicesSocket);

  ngOnInit(): void {
    this.storeServicesSocket.joinSessionDefaultEvent()
  }

}
