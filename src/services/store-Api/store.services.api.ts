import {inject, Injectable} from "@angular/core";
import {ApiServices} from "../api/api.services";
import {SessionCheckUser, SessionModelRequest} from "../../models/sessions";
import {Observable} from "rxjs";
import {FormatModel} from "../../models/format.model";

@Injectable({
  providedIn: 'root',
})
export class StoreServicesApi {

  readonly api: ApiServices = inject(ApiServices);

  getAllCellsBySession(sessionKey:string):Observable<FormatModel>{
    return this.api.getAllCells(sessionKey)
  }

  getAllMaps() :Observable<FormatModel>{
    return this.api.getAllMaps();
  }

  login(email:string, password:string):Observable<FormatModel>{
    return this.api.login(email, password);
  }

  /**
   * Session
   */
  postCreateSession(body:SessionModelRequest):Observable<FormatModel> {
    return this.api.postCreateSession(body);
  }

  checkIfUserInsideSession(user:SessionCheckUser) : Observable<FormatModel> {
    return this.api.checkIfUserInsideSession(user);
  }
}
