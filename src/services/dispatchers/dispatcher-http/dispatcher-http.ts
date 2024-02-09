import {effect, inject, Injectable} from "@angular/core";
import {UsersLogin} from "../../../models/users.models";
import {ApiServices} from "../../api/api.services";
import {FormatRestApi} from "../../../models/formatRestApi";
import {StorageManagerApp} from "../../storageManagerApp/storageManagerApp";
import {Utils} from "../../utils";
import {TextDefaultSession} from "../../../models/text.models";
import {DispatcherSocket} from "../dispatcher-socket/dispatcher-socket";
import {SessionCreated} from "../../../models/session.models";

@Injectable({
  providedIn: 'root',
})
export class DispatcherHttp {

  readonly #apiServices = inject(ApiServices);
  readonly #storageManagerApp = inject(StorageManagerApp);


  constructor() {
  }

  login(userLogin: UsersLogin) {
    return this.#apiServices.login(userLogin).subscribe((res:FormatRestApi) => {
      if(Utils.codeErrorChecking(res.code)){
        this.setAlerte(res)
      }else{
        this.#storageManagerApp.setUser(res.data)
      }
    })
  }

  setAlerte(res: FormatRestApi) {
    this.#storageManagerApp.setAlerte(res)
  }

  getUser() {
    return this.#storageManagerApp.getUser()
  }

  getMaps() {
    return this.#apiServices.getMaps()
  }

  createSession(sessionBody: SessionCreated) {
    this.#apiServices.createSession(sessionBody).subscribe((res:FormatRestApi) => {
      if(Utils.codeErrorChecking(res.code)){
        this.setAlerte(res)
      }else{
        this.#storageManagerApp.setSessionAndLinkStorage(res.data.game)
      }
    })
  }
}
