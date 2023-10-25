import {inject, Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {CellulesModels} from "../../models/cellules.models";
import {MapsModels} from "../../models/maps.models";
import {SessionModelRequest} from "../../models/sessions";
import {PartiesModelsJson} from "../../models/parties.models";


@Injectable({
  providedIn: 'root',
})
export class ApiServices {
  readonly apiURL: string = 'http://localhost:3000';
  readonly httpClient: HttpClient = inject(HttpClient);

  getAllCells(session: string) {
    let params = new HttpParams().set('session', session);
    return this.httpClient.get<Array<CellulesModels>>(`${this.apiURL}/json/getMapCells`, {params})
  }

  getAllMaps() {
    return this.httpClient.get<Array<MapsModels>>(`${this.apiURL}/maps/infos`)
  }

  postCreateSession(body: SessionModelRequest) {
    return this.httpClient.post<PartiesModelsJson>(`${this.apiURL}/sessions/new`,body)
  }

  login(email:string, password:string){
    return this.httpClient.post(`${this.apiURL}/user/login`, {email, password})
  }
}
