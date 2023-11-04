import {effect, inject, Injectable, untracked} from "@angular/core";
import {SocketService} from "../socket/socket.service";
import {SocketJoinSession, SocketJoinTeamCard} from "../../models/socket.models";
import {LocalstorageServices} from "../localsotrage/localstorage.services";
import {Router} from "@angular/router";
import {PartiesModelsJson} from "../../models/parties.models";

@Injectable({
  providedIn: 'root',
})
export class StoreServicesSocket {


  private router = inject(Router)

  /****  Socket  ***/
  readonly socket: SocketService = inject(SocketService);
  private readonly socketEndPoints = 'highlander-socket';
  private readonly eventDefaultRoom = this.socket.getEventDefaultRoom()
  private readonly eventAnotherRoom = this.socket.getEventAnotherRoom()
  private effectRef: any;

  /****  LocalStorage  ***/
  private local = inject(LocalstorageServices)
  private user = this.local.getUser()
  private info = this.local.getInfoGame()
  private currentRoom = this.local.eventCurrentRoomSignal()
  private game = this.local.getGame()
  private map = this.local.getMap()


  constructor() {
    this.effectRef = effect(() => {
      if (this.eventDefaultRoom() !== null) {
        console.log(this.eventDefaultRoom())
      }
      if (this.eventAnotherRoom() !== null) {
        untracked(() => {
          console.log( `Change in eventAnotherRoom :
          ${JSON.stringify(this.eventAnotherRoom()?.data.infoGame)}`)
          this.local.setInfoGame(this.eventAnotherRoom()?.data.infoGame ?? null)
          this.local.setGame(this.eventAnotherRoom()?.data.game ?? null)
          this.local.setMap(this.eventAnotherRoom()?.data.map ?? null)
          this.router.navigate([`/lobby/${this.eventAnotherRoom()?.data.infoGame?.gameKeySession.key}`])
        })
      }
    })
  }

  joinDefaultRoom() {
    this.eventRoomDefault();
    this.local.setCurrentRoom(`${this.socketEndPoints}-default`);
  }

  eventRoomDefault() {
    if (this.eventDefaultRoom() !== null) {
      return this.eventDefaultRoom()
    } else {
      return null
    }
  }

  joinAnotherRoom(socketData: SocketJoinSession) {
    this.socket.joinRoom(socketData);
    this.eventRoomAnother(socketData.room)
    this.local.setCurrentRoom(`${this.socketEndPoints}-${socketData.room}`);
  }

  eventRoomAnother(room: string) {
    this.socket.anotherRoomEvent(room)
    if (this.eventAnotherRoom !== null) {
      return this.eventAnotherRoom
    } else {
      return null
    }
  }

  selectPlaceTeam(socketJoinTeamCard: SocketJoinTeamCard) {
    this.socket.selectPlaceTeam(socketJoinTeamCard);
  }

}
