import {inject, Injectable} from "@angular/core";
import {SocketService} from "../socket/socket.service";
import {Router} from "@angular/router";
import {
  CurrentTurnAction,
  JoinSessionSocket,
  JoinSessionTeam,
  JoinSessionTeamCard, SocketTurn
} from "../../models/formatSocket.models";
import {LocalstorageServices} from "../localsotrage/localstorage.services";
import {Utils} from "../Utils";
import {CardByEntityPlaying, CardsRestApi} from "../../models/cards.models";
import {UserPosition} from "../../models/users.models";

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

  whoIsTurn() {
    let room = this.localStore.getSessionStatusGame().room
    this.socket.whoIsTurn(room)
  }

  startTurn(data:SocketTurn) {
    this.socket.startTurn(data)
  }

  sendDice(data: SocketTurn) {
    this.socket.sendDice(data)
  }

  chooseMove(data: SocketTurn) {
    this.socket.chooseMove(data)
  }

  endMove(data: SocketTurn) {
    this.socket.endMove(data)
  }

  endTurn(data: SocketTurn) {
    this.socket.endTurn(data)
  }

}
