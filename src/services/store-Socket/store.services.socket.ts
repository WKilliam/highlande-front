import {inject, Injectable} from "@angular/core";
import {SocketService} from "../socket/socket.service";
import {Router} from "@angular/router";
import {
  CurrentTurnAction,
  JoinSessionSocket,
  JoinSessionTeam,
  JoinSessionTeamCard
} from "../../models/formatSocket.models";
import {LocalstorageServices} from "../localsotrage/localstorage.services";
import {Utils} from "../Utils";
import {CardByEntityPlaying, CardsRestApi} from "../../models/cards.models";
import {UserPosition} from "../../models/users.models";
import {Can} from "../../models/emus";
import {Cells} from "../../models/maps.models";
import {Session} from "../../models/room.content.models";

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
        let joinTeam: JoinSessionTeam = {
          room: this.localStore.getSessionStatusGame().room,
          lobbyPosition: lobbyPosition,
          teamPosition: teamTag,
          cardPosition: cardPosition
        }
        this.socket.joinTeam(joinTeam)
      } else {
        console.log('error room default')
      }
    }
  }

  joinCard(card: CardByEntityPlaying, userPosition: UserPosition) {
    let lobbyPosition = Utils.indexLobbyPosition(this.localStore.getSessionStatusGame().lobby, this.localStore.getUser().pseudo, this.localStore.getUser().avatar)
    if (lobbyPosition === -1) {
      console.log('error lobbyPosition undefined')
    } else {
      if (this.localStore.getSessionStatusGame().room !== 'default') {
        let indexCard = Utils.indexLobbyPositionCard(this.localStore.getSessionStatusGame().lobby, this.localStore.getUser().pseudo, this.localStore.getUser().avatar, card.name)
        let joinCard: JoinSessionTeamCard = {
          room: this.localStore.getSessionStatusGame().room,
          lobbyPosition: Utils.indexLobbyPosition(this.localStore.getSessionStatusGame().lobby, this.localStore.getUser().pseudo, this.localStore.getUser().avatar),
          teamPosition: userPosition.teamTag,
          cardPosition: userPosition.cardTag,
          cardByPlayer: indexCard,
        }
        this.socket.joinCard(joinCard)
      } else {
        console.log('error room default')
      }
    }
  }

  createTurnList() {
    this.socket.createTurnList()
  }

  botTurnSuccessSend() {
    return this.socket.botTurnSuccessSend()
  }

  humainTurnSuccessSend(action: CurrentTurnAction) {
    this.socket.humainTurnSuccessSend(action)
  }

  getMap() {
    return this.socket.getMap()
  }

  setMap(map:Map<string,Session>) {
    this.socket.setMap(map)
  }
}
