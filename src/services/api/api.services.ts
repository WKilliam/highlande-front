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
  readonly apiURLSession: string = 'http://localhost:3000/sessions';
  readonly apiURLCards: string = 'http://localhost:3000/cards';
  readonly apiURLMaps: string = 'http://localhost:3000/maps';
  readonly apiURLEffects: string = 'http://localhost:3000/effects';
  readonly apiURLDeck: string = 'http://localhost:3000/decks';
  readonly apiURLUser: string = 'http://localhost:3000/user';
  readonly apiURLEvent: string = 'http://localhost:3000/events';
  readonly apiURLJson: string = 'http://localhost:3000/json';
  readonly apiURLSocket: string = 'http://localhost:3000/socket';

  readonly httpClient: HttpClient = inject(HttpClient);
  readonly #storeManagerApp = inject(StorageManagerApp);

  /**
   * User
   */
  login(user: UsersLogin):Observable<FormatRestApi> {
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

}
