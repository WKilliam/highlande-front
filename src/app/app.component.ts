import {Component, inject, OnInit} from '@angular/core';
import { RouterOutlet} from "@angular/router";
import {AppServices} from "./app.services";
import {StoreServicesSocket} from "../services/store-Socket/store.services.socket";

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
}
