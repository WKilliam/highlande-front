import {inject, Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {CellulesModels} from "../../models/cellules.models";
import {MapsModels} from "../../models/maps.models";


@Injectable({
  providedIn: 'root',
})
export class ApiServices{
  readonly apiURL = 'http://localhost:3000';
  readonly httpClient: HttpClient = inject(HttpClient);

  getAllCells(session:string){
    let params = new HttpParams().set('session', session);
    return this.httpClient.get<Array<CellulesModels>>(`${this.apiURL}/maps`, {params})
  }

  getAllMaps(){
    return this.httpClient.get<Array<MapsModels>>(`${this.apiURL}/maps/infos`)
  }
}
