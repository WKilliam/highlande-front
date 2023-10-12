import {inject, Injectable} from "@angular/core";
import {ReplaySubject, takeUntil} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  readonly #baseUrl: string = 'http://localhost:3000';
  readonly #httpClient: HttpClient = inject(HttpClient);
  destroyed$ = new ReplaySubject<void>(1);


  testData(){
    return this.#httpClient.get<any>(`${this.#baseUrl}/cards/allcards`);
  }


}
