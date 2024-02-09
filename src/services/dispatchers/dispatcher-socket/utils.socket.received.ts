import {inject, Injectable} from "@angular/core";
import {StorageManagerApp} from "../../storageManagerApp/storageManagerApp";
import {Router} from "@angular/router";
import {FormatRestApi} from "../../../models/formatRestApi";
import {Utils} from "../../utils";

@Injectable({
  providedIn: 'root',
})
export class UtilsSocketReceived {


  static routingDirection(route: string, query?: any) {
    console.log('routingMoveByContext')
  }

  static receivedJoinStep(data: FormatRestApi, storageManagerApp: StorageManagerApp, router: Router) {
    console.log('if join storageManagerApp.getSession().sessionStatusGame.room', storageManagerApp.getSession().sessionStatusGame.room)
    console.log('if join data.data.game.sessionStatusGame.room', data.data.game.sessionStatusGame.room)
    const isNotValid = Utils.codeErrorChecking(data.code)
    if (isNotValid) { // error
      storageManagerApp.setAlerte(data)
      router.navigate(['/testeurio'])
    } else {
      const neewRoom = data.data.game.sessionStatusGame.room
      if (neewRoom !== 'default') {
        storageManagerApp.setSessionAndLinkStorage(data.data.game)
        router.navigate([`/lobby/${data.data.game.sessionStatusGame.room}`])
      }
    }
  }

  static receivedJoin(data: FormatRestApi, storageManagerApp: StorageManagerApp, router: Router) {

    const isNotValid = Utils.codeErrorChecking(data.code)
    if (isNotValid) { // error
      storageManagerApp.setAlerte(data)
      router.navigate(['/testeurio'])
    } else { // valid

      if (storageManagerApp.getSession().sessionStatusGame.room !== 'default') {
        console.log('join not default', data)
        storageManagerApp.setSessionAndLinkStorage(data.data.game)
        router.navigate([`/lobby/${data.data.game.sessionStatusGame.room}`])
      }else{
        console.log('join default', data)
        storageManagerApp.setSessionAndLinkStorage(data.data.game)
        router.navigate(['/testeurio'])
      }
    }
  }

  static receivedJoinTeam(data: FormatRestApi, storageManagerApp: StorageManagerApp, router: Router) {
    const isNotValid = Utils.codeErrorChecking(data.code)
    if (isNotValid) { // error
      storageManagerApp.setAlerte(data)
      router.navigate(['/testeurio'])
    } else { // valid
      console.log('join-team', data)
      storageManagerApp.setSessionAndLinkStorage(data.data.game)
    }
  }


}
