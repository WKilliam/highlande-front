import {inject, Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {CellulesModels} from "../../models/cellules.models";
import {MapsModels} from "../../models/maps.models";
import {SessionGamePlace, SessionModelRequest} from "../../models/sessions";
import {PartiesModelsJson} from "../../models/parties.models";
import {FormatModel} from "../../models/format.model";
import {UserModels} from "../../models/user.models";


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

  getAllCells(session: string) {
    let params = new HttpParams().set('session', session);
    return this.httpClient.get<Array<CellulesModels>>(`${this.apiURLJson}/getMapCells`, {params})
  }

  getAllMaps() {
    return this.httpClient.get<Array<MapsModels>>(`${this.apiURLMaps}/infos`)
  }

  login(email:string, password:string){
    return this.httpClient.post<UserModels>(`${this.apiURLUser}/login`, {email, password})
  }



  /**
   * Session
   */
  postCreateSession(body: SessionModelRequest) {
    return this.httpClient.post<PartiesModelsJson>(`${this.apiURLSession}/new`,body)
  }
  sessionFreeplace(gameKey:SessionGamePlace){
    return this.httpClient.post<FormatModel>(`${this.apiURLSession}/sessionGamePlace`, gameKey)
  }
  /**
   * ##############################
   **/
}
