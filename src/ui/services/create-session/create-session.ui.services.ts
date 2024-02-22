import {effect, inject, Injectable, signal} from '@angular/core';
import {TextDefaultSession, TextModels} from "../../../models/text.models";
import {Maps, MapsModels, MapsSimplify} from "../../../models/maps.models";
import {DispatcherHttp} from "../../../services/dispatchers/dispatcher-http/dispatcher-http";
import {Utils} from "../../../services/utils";
import {FormatRestApi} from "../../../models/formatRestApi";
import {DispatcherSocket} from "../../../services/dispatchers/dispatcher-socket/dispatcher-socket";
import {SessionCreated, SessionGame} from "../../../models/session.models";
import {StorageManagerApp} from "../../../services/storageManagerApp/storageManagerApp";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class CreateSessionUiServices {

  readonly #dispatcherHttp = inject(DispatcherHttp)
  readonly #dispatcherSocket = inject(DispatcherSocket)
  readonly #storageManagerApp = inject(StorageManagerApp)

  readonly #textContentForm = signal(TextModels.initTextCreateSession())
  readonly #textContentFormContent = signal(TextModels.initTextDefaultSession())
  readonly #getMaps = signal<Array<Maps>>([])

  readonly eventTextContentForm = this.#textContentForm.asReadonly()
  readonly eventTextContentFormContent = this.#textContentFormContent.asReadonly()
  readonly eventGetMaps = this.#getMaps.asReadonly()
  isCall = false



  constructor(route:Router) {
    this.#storageManagerApp.setCurrentActiveRoute(route.url)
    this.#dispatcherHttp.getMaps().subscribe((res:FormatRestApi) => {
      if(Utils.codeErrorChecking(res.code)) {
        this.#dispatcherHttp.setAlerte(res)
      }else {
        this.#getMaps.set(res.data)
      }
    })
    // effect(() => {
    //   if (this.#storageManagerApp.getSession() && !this.isCall){
    //     this.isCall = true
    //     // this.#dispatcherSocket.joinRoom()
    //   }
    // });
  }

  // Methods

  createSession(sessionBody:TextDefaultSession) {
    const session:SessionCreated = {
      name: sessionBody.name,
      password: sessionBody.password,
      mapId: sessionBody.mapId,
      teamNames: [sessionBody.teamOneName, sessionBody.teamTwoName, sessionBody.teamThreeName, sessionBody.teamFourName],
      createdAt: new Date().toDateString(),
      token: this.#storageManagerApp.getUser().token
    }
    this.isCall = false
    this.#dispatcherHttp.createSession(session)
    setTimeout(() => {
      this.#dispatcherSocket.joinRoom()
    },2000)
  }

  // Getters

  getEventTextContentForm() {
    return this.eventTextContentForm()
  }

  getEventTextContentFormContent() {
    return this.eventTextContentFormContent()
  }


  getMaps():Array<Maps> {
    return this.eventGetMaps() ?? []
  }

}
