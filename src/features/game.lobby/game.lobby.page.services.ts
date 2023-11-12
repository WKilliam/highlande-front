import {effect, inject, Injectable} from "@angular/core";
import {AppServices} from "../../app/app.services";
import {LocalstorageServices} from "../../services/localsotrage/localstorage.services";

@Injectable({
  providedIn: 'root'
})
export class GameLobbyPageServices {

  readonly openSelectorCard: boolean = false;
  readonly title: string = 'Lobby Session : ';



}
