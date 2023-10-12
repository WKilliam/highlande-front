import {inject, Injectable} from "@angular/core";
import {ApiService} from "../connect/api.service";

@Injectable({
  providedIn: 'root',
})
export class Store{
  readonly #api: ApiService = inject(ApiService);

  getData(){
    this.#api.testData().subscribe((data) => {
      console.log(data)
    })
  }
}
