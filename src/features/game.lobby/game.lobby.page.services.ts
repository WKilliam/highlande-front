import {inject, Injectable} from "@angular/core";
import {AppComponentServices} from "../../app/app.component.services";

@Injectable({
  providedIn: 'root'
})
export class GameLobbyPageServices {

  readonly openSelectorCard: boolean = false;
  readonly title: string = 'Lobby Session : ';
  readonly appComponentServices = inject(AppComponentServices);
  constructor() {
    this.appComponentServices.httpGetIfUserInsideRoom()
  }

}
