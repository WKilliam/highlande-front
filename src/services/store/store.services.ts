import {inject, Injectable} from "@angular/core";
import {ApiServices} from "../api/api.services";

@Injectable({
  providedIn: 'root',
})
export class StoreServices{

  readonly api: ApiServices = inject(ApiServices);

  getAllCellsBySession(sessionKey:string){
    return this.api.getAllCells(sessionKey)
  }

  getAllMaps(){
    return this.api.getAllMaps();
  }

  createSession(body:any){
    return this.api.postCreateSession(body);
  }

}
