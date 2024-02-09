import {inject, Injectable} from "@angular/core";
import {SocketService} from "../../../src/services/socket/socket.service";
import {Router} from "@angular/router";
// import {
//   CurrentTurnAction,
//   JoinSessionSocket,
//   JoinSessionTeam,
//   JoinSessionTeamCard
// } from "../../models/formatSocket.models";
import {LocalstorageServices} from "../localsotrage/localstorage.services";
import {Utils} from "../Utils";
import {CardByEntityPlaying, CardsRestApi} from "../../../src/models/cards.models";
// import {UserPosition} from "../../../src/models/users.models";
// import {Session} from "../../../src/models/room.content.models";

@Injectable({
  providedIn: 'root',
})
export class StoreServicesSocket {

  private router = inject(Router)
  private readonly socket: SocketService = inject(SocketService);
  private localStore = inject(LocalstorageServices)

  joinTeam(cardPosition: number, teamTag: number) {
    let lobbyPosition = Utils.indexLobbyPosition(this.localStore.getSessionStatusGame().lobby, this.localStore.getUser().pseudo, this.localStore.getUser().avatar)
    if (lobbyPosition === -1) {
      console.log('error lobbyPosition undefined')
    } else {
      if (this.localStore.getSessionStatusGame().room !== 'default') {
        let joinTeam: any = {
          room: this.localStore.getSessionStatusGame().room,
          lobbyPosition: lobbyPosition,
          teamPosition: teamTag,
          cardPosition: cardPosition
        }
        // this.socket.joinTeam(joinTeam)
      } else {
        console.log('error room default')
      }
    }
  }

  joinCard(card: CardByEntityPlaying, userPosition: any) {
    let lobbyPosition = Utils.indexLobbyPosition(this.localStore.getSessionStatusGame().lobby, this.localStore.getUser().pseudo, this.localStore.getUser().avatar)
    if (lobbyPosition === -1) {
      console.log('error lobbyPosition undefined')
    } else {
      if (this.localStore.getSessionStatusGame().room !== 'default') {
        let indexCard = Utils.indexLobbyPositionCard(this.localStore.getSessionStatusGame().lobby, this.localStore.getUser().pseudo, this.localStore.getUser().avatar, card.name)
        let joinCard: any = {
          room: this.localStore.getSessionStatusGame().room,
          lobbyPosition: Utils.indexLobbyPosition(this.localStore.getSessionStatusGame().lobby, this.localStore.getUser().pseudo, this.localStore.getUser().avatar),
          teamPosition: userPosition.teamTag,
          cardPosition: userPosition.cardTag,
          cardByPlayer: indexCard,
        }
        // this.socket.joinCard(joinCard)
      } else {
        console.log('error room default')
      }
    }
  }

  createTurnList() {
    // this.socket.createTurnList()
  }

  botTurnSuccessSend(action: any) {
    // return this.socket.botTurnSuccessSend(action)
  }

  botLeaveQueue() {
    // this.socket.botLeaveQueue()
  }

  humainTurnSuccessSend(action: any) {
    // this.socket.humainTurnSuccessSend(action)
  }

  getMap() {
    // return this.socket.getMap()
  }

  setMap(map:Map<string,any>) {
    // this.socket.setMap(map)
  }

  startChrono(
    isTimerNextTurn:boolean,
    finishGame:boolean) {
    // this.socket.startChrono(isTimerNextTurn,finishGame)
  }

  reciveTimer() {
    // return this.socket.receiveTimer()
  }

  getChrono() {
    // return this.socket.getChrono()
  }
}
