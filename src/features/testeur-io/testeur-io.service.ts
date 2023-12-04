import {effect, inject, Injectable} from "@angular/core";
import {LocalstorageServices} from "../../services/localsotrage/localstorage.services";
import {StoreServicesApi} from "../../services/store-Api/store.services.api";
import {Router} from "@angular/router";
import {UserFrontData, UsersLogin} from "../../models/users.models";
import {FormatRestApiModels} from "../../models/formatRestApi.models";
import {StoreServicesSocket} from "../../services/store-Socket/store.services.socket";
import {SocketEndpoint} from "../../app/socket.endpoint";

@Injectable({
  providedIn: 'root',
})
export class TesteurIoService {

  readonly #localStorage: LocalstorageServices = inject(LocalstorageServices)
  readonly #storeApi: StoreServicesApi = inject(StoreServicesApi);
  readonly #router = inject(Router);
  private readonly socketEndpoint= inject(SocketEndpoint)

  constructor() {
    this.#localStorage.resetNullAllStorage()
    this.socketEndpoint.instanceRoomConnect('TesteurIoService')
  }

  login(userLogin: UsersLogin) {
    this.#storeApi.login(userLogin).subscribe((response: FormatRestApiModels) => {
      if (response.code >= 200 && response.code < 300) {
        this.#localStorage.setUser(response.data)
      }
    })
  }

  getUser() {
    return this.#localStorage.getUser();
  }

  moveCreateSession() {
    this.#router.navigate(['/session']);
  }
}
