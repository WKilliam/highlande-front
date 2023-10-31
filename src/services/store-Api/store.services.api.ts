import {inject, Injectable} from "@angular/core";
import {ApiServices} from "../api/api.services";
import {SessionGamePlace, SessionModelRequest} from "../../models/sessions";

@Injectable({
  providedIn: 'root',
})
export class StoreServicesApi {

  readonly api: ApiServices = inject(ApiServices);

  getAllCellsBySession(sessionKey:string){
    return this.api.getAllCells(sessionKey)
  }

  getAllMaps(){
    return this.api.getAllMaps();
  }



  login(email:string, password:string){
    return this.api.login(email, password);
  }

  /**
   * Session
   */
  postCreateSession(body:SessionModelRequest) {
    return this.api.postCreateSession(body);
  }

  postSessionFreeplace(gameKey:SessionGamePlace) {
    return this.api.sessionFreeplace(gameKey);
  }
}
