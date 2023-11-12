import {inject, Injectable} from "@angular/core";
import {LocalstorageServices} from "../../services/localsotrage/localstorage.services";

@Injectable({
  providedIn: 'root'
})
export class MapUiServices{

  readonly localStorage = inject(LocalstorageServices)

  constructor() {

  }


}
