import {inject, Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, of, switchMap} from "rxjs";
import {UserFrontData, UsersLogin, UserSocketConnect} from "../../models/users.models";
import {FormatRestApi} from "../../models/formatRestApi";
import {StorageManagerApp} from "../storageManagerApp/storageManagerApp";
import {SessionCreated} from "../../models/session.models";
import {CardEntitySimplify} from "../../models/cards.models";
// import {FormatRestApiModels} from "../../models/formatRestApi.models";
// import {UsersLogin} from "../../../src/models/users.models";


@Injectable({
  providedIn: 'root',
})
export class ApiServices {
  readonly apiURL: string = 'http://localhost:3000';
  readonly apiURLProd: string =
    // this.apiURL
    'http://195.154.114.37:3000';
  readonly apiURLSession: string = `${this.apiURLProd}/sessions`;
  readonly apiURLCards: string = `${this.apiURLProd}/cards`;
  readonly apiURLMaps: string = `${this.apiURLProd}/maps`;
  readonly apiURLEffects: string = `${this.apiURLProd}/effects`;
  readonly apiURLDeck: string = `${this.apiURLProd}/decks`;
  readonly apiURLUser: string = `${this.apiURLProd}/user`;
  readonly apiURLEvent: string = `${this.apiURLProd}/events`;
  readonly apiURLJson: string = `${this.apiURLProd}/json`;
  readonly apiURLSocket: string = `${this.apiURLProd}/socket`;

  readonly httpClient: HttpClient = inject(HttpClient);
  readonly #storeManagerApp = inject(StorageManagerApp);

  /**
   * User
   */
  login(user: UsersLogin):Observable<FormatRestApi> {
    // return this.httpClient.post<FormatRestApi>(`${this.apiURLProd}/user/login`, user)
    return this.httpClient.post<FormatRestApi>(`${this.apiURLUser}/login`, user)
  }

  /*
   * Session
   */

  getSessions(room: string): Observable<FormatRestApi> {
    let params = new HttpParams().set('room', room);
    return this.httpClient.get<any>(`${this.apiURLSession}`, {params})
  }

  createSession(session: SessionCreated): Observable<FormatRestApi> {
    return this.httpClient.post<any>(`${this.apiURLSession}/new`, session)
  }

  getMaps(): Observable<FormatRestApi> {
    return this.httpClient.get<FormatRestApi>(`${this.apiURLMaps}/allMaps`)
  }

  test() {
    return this.httpClient.get<any>(`${this.apiURLProd}/user/test`)
  }
}
