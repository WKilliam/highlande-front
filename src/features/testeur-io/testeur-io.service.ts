import {effect, inject, Injectable} from "@angular/core";
import {Router} from "@angular/router";
import { UsersLogin} from "../../models/users.models";
import {DispatcherHttp} from "../../services/dispatchers/dispatcher-http/dispatcher-http";
import {DispatcherSocket} from "../../services/dispatchers/dispatcher-socket/dispatcher-socket";
import {StorageManagerApp} from "../../services/storageManagerApp/storageManagerApp";

@Injectable({
  providedIn: 'root',
})
export class TesteurIoService {


  readonly #router = inject(Router);
  readonly #dispatcherHttp = inject(DispatcherHttp);
  readonly #dispatcherSocket = inject(DispatcherSocket);
  readonly #storageManagerApp = inject(StorageManagerApp);

  constructor(route:Router) {
    this.#storageManagerApp.setCurrentActiveRoute(route.url)
  }

  login(userLogin: UsersLogin) {
    this.#dispatcherHttp.login(userLogin)
  }
  getUser() {
    return this.#dispatcherHttp.getUser()
  }

  moveCreateSession() {
    this.#router.navigate(['/create_session']);
  }
}
