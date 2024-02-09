import {inject, Injectable} from "@angular/core";
import {StorageManagerApp} from "../../storageManagerApp/storageManagerApp";
import {Router} from "@angular/router";
import {FormatRestApi} from "../../../models/formatRestApi";
import {Utils} from "../../utils";

@Injectable({
  providedIn: 'root',
})
export class UtilsSocketReceived {


  static routingDirection(route:string, query?:any) {
    console.log('routingMoveByContext')
  }

  static receivedCanJoin(data: FormatRestApi,storageManagerApp:StorageManagerApp,router:Router,currentUrl:string) {
    console.log('can-join')
    console.log('message',data)
    const isNotValid = Utils.codeErrorChecking(data.code)
    if(isNotValid) { // error
      console.log('can-join is Valid', data.code)
      storageManagerApp.setAlerte(data)
      router.navigate(['/testeurio'])
    } else { // valid
      // storageManagerApp.setSessionAndLinkStorage(data.data.game)
      if(data.data.game.sessionStatusGame.room !== ''){
        storageManagerApp.setSessionAndLinkStorage(data.data.game)
        router.navigate([`/lobby/${data.data.game.sessionStatusGame.room}`])
      }else{
        router.navigate([currentUrl])
      }
    }
  }

  static receivedJoin(data: FormatRestApi,storageManagerApp:StorageManagerApp,router:Router) {
    console.log('join')
    const isNotValid = Utils.codeErrorChecking(data.code)
    if(isNotValid) { // error
      storageManagerApp.setAlerte(data)
      router.navigate(['/testeurio'])
    } else { // valid
      storageManagerApp.setSessionAndLinkStorage(data.data.game)
      router.navigate([`/lobby/${data.data.game.sessionStatusGame.room}`])
    }
  }

  static receivedJoinTeam(data: FormatRestApi, storageManagerApp: StorageManagerApp, router: Router) {
    const isNotValid = Utils.codeErrorChecking(data.code)
    if(isNotValid) { // error
      storageManagerApp.setAlerte(data)
      router.navigate(['/testeurio'])
    } else { // valid
      console.log('join-team', data)
      storageManagerApp.setSessionAndLinkStorage(data.data.game)
    }
  }
}
