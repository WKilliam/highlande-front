import {inject, Injectable} from "@angular/core";
import {SocketService} from "../services/socket/socket.service";
import {LocalstorageServices} from "../services/localsotrage/localstorage.services";
import {StoreServicesApi} from "../services/store-Api/store.services.api";
import {FormatRestApiModels} from "../models/formatRestApi.models";

@Injectable({
  providedIn: 'root',
})
export class SocketEndpoint {

  private readonly socketService = inject(SocketService)
  private readonly localStore = inject(LocalstorageServices)
  readonly storeApi: StoreServicesApi = inject(StoreServicesApi);

  instanceRoomConnect(nameCaller: string,roomJoin: string | null = null) {
    console.log('instanceRoomConnect',nameCaller,roomJoin)
    this.playerAlreadyInASession(roomJoin)
  }

  playerAlreadyInASession(roomJoin: string | null = null){
    if(this.localStore.getSessionStatusGame() === undefined && this.localStore.getGame() === undefined && this.localStore.getMap() === undefined){
      this.socketService.currentRoom('default')
    }else{
      if (roomJoin !== null){
        this.socketService.currentRoom(roomJoin)
      }else{
        if(this.localStore.getSessionStatusGame() !== null){
          this.storeApi.getSessions(this.localStore.getSessionStatusGame().room).subscribe((response:FormatRestApiModels) => {
            if(response.code >= 200 && response.code < 300) {
              let roomString: string = response.data.sessionStatusGame.room
              this.socketService.currentRoom(roomString)
            }else{
              this.socketService.currentRoom('default')
            }
          })
        }else{
          if(this.localStore.getSessionStatusGame() === null && this.localStore.getGame() === null && this.localStore.getMap() === null){
            if (this.localStore.getUser() !== null){
              const token = this.localStore.getUser().token
              this.storeApi.getIfUserInsideRoom(token).subscribe((response:FormatRestApiModels) => {
                console.log('getIfUserInsideRoom',response)
                if(response.code >= 200 && response.code < 300){
                  if (response.data !== null){
                    this.socketService.currentRoom(response.data.sessionStatusGame.room)
                  }else{
                    this.socketService.currentRoom('default')
                  }
                }else{
                  this.socketService.currentRoom('default')
                }
              })
            }else{
              this.socketService.currentRoom('default')
            }
          }else{
            this.socketService.currentRoom(this.localStore.getSessionStatusGame().room)
          }
        }
      }
    }
  }
}
