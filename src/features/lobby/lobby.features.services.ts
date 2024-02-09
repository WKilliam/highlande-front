import {inject, Injectable} from "@angular/core";
import {StorageManagerApp} from "../../services/storageManagerApp/storageManagerApp";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class LobbyFeaturesServices {

  readonly #storageManagerApp = inject(StorageManagerApp)

  constructor(router: Router) {
    this.#storageManagerApp.setCurrentActiveRoute(router.url)
  }

  getRoom() {
    return this.#storageManagerApp.getRoom()
  }

  getUserName() {
    return this.#storageManagerApp.getUser().pseudo;
  }
}
