import {inject, Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {FormatRestApiModels} from "../../models/formatRestApi.models";
import {UsersLogin} from "../../models/users.models";


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

  readonly httpClient: HttpClient = inject(HttpClient);

  /**
   * User
   */
  login(user: UsersLogin): Observable<FormatRestApiModels> {
    return this.httpClient.post<FormatRestApiModels>(`${this.apiURLUser}/login`, {email: user.email, password: user.password})
  }

  /*
   * Session
   */

  getSessions(room: string): Observable<FormatRestApiModels> {
    let params = new HttpParams().set('room', room);
    return this.httpClient.get<FormatRestApiModels>(`${this.apiURLSession}`, {params})
  }

  createSession(session: any): Observable<FormatRestApiModels> {
    return this.httpClient.post<FormatRestApiModels>(`${this.apiURLSession}/new`, session)
  }

  getMaps(): Observable<FormatRestApiModels> {
    return this.httpClient.get<FormatRestApiModels>(`${this.apiURLMaps}/allMaps`)
  }

  getIfUserInsideRoom(token: string) {
    return this.httpClient.post<FormatRestApiModels>(`${this.apiURLSession}/activeForPlayer`,{token: token})
  }
}
