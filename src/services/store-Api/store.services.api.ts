import {inject, Injectable} from "@angular/core";
import {ApiServices} from "../api/api.services";
import {Observable} from "rxjs";
import {FormatRestApiModels} from "../../models/formatRestApi.models";
import {UsersLogin} from "../../models/users.models";
import {TextConstante} from "../../app/text.constante";

@Injectable({
  providedIn: 'root',
})
export class StoreServicesApi {

  readonly api: ApiServices = inject(ApiServices);
  readonly text = inject(TextConstante)


  /***
    * Session
    */
  getSessions(room: string): Observable<FormatRestApiModels> {
    return this.api.getSessions(room);
  }

  getIfUserInsideRoom(token: string): Observable<FormatRestApiModels> {
    return this.api.getIfUserInsideRoom(token);
  }

  createSession(session: any): Observable<FormatRestApiModels> {
    return this.api.createSession(session);
  }

  getMaps(): Observable<FormatRestApiModels> {
    return this.api.getMaps();
  }

  /***
    * User
    */
  login(userLogin:UsersLogin): Observable<FormatRestApiModels> {
    return this.api.login(userLogin);
  }
}
