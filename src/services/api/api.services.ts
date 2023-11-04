import {inject, Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {CellulesModels} from "../../models/cellules.models";
import {MapsModels} from "../../models/maps.models";
import {SessionCheckUser,SessionModelRequest} from "../../models/sessions";
import {PartiesModelsJson} from "../../models/parties.models";
import {FormatModel} from "../../models/format.model";
import {UserModels} from "../../models/user.models";
import {Observable} from "rxjs";


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

  getAllCells(session: string): Observable<FormatModel> {
    let params = new HttpParams().set('session', 'IF38p');
    return this.httpClient.get<FormatModel>(`${this.apiURLJson}/getMapCells`, {params})
  }

  getAllMaps(): Observable<FormatModel> {
    return this.httpClient.get<FormatModel>(`${this.apiURLMaps}/infos`)
  }

  login(email:string, password:string): Observable<FormatModel>{
    return this.httpClient.post<FormatModel>(`${this.apiURLUser}/login`, {email, password})
  }

  /**
   * Session
   */
  postCreateSession(body: SessionModelRequest): Observable<FormatModel> {
    return this.httpClient.post<FormatModel>(`${this.apiURLSession}/new`,body)
  }

  checkIfUserInsideSession(user:SessionCheckUser): Observable<FormatModel> {
    return this.httpClient.post<FormatModel>(`${this.apiURLJson}/checkIfUserInsideSession`,user)
  }
  /**
   * ##############################
   **/
}
