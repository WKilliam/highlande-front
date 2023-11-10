import {Component, inject, OnInit} from '@angular/core';
import { RouterOutlet} from "@angular/router";
import {AppComponentServices} from "./app.component.services";

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
export class AppComponent
  implements OnInit
{

  private readonly appComponentServices: AppComponentServices = inject(AppComponentServices);

  ngOnInit(): void {
  }



}
