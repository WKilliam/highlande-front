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

@Injectable({
  providedIn: 'root',
})
export class StoreServicesSocket {

  private router = inject(Router)
  private readonly socket: SocketService = inject(SocketService);
  private localStore = inject(LocalstorageServices)

  joinDefaultRoom() {
    this.socket.joinDefaultRoom()
  }

  joinRoom(join: JoinSessionSocket) {
    this.socket.joinRoom(join);
  }

  joinEvent(room: string) {
    this.socket.joinEvent(room)
  }

  joinTeam(cardPosition: number, teamTag: number) {
    let lobbyPosition = Utils.indexLobbyPosition(this.localStore.getSessionStatusGame().lobby, this.localStore.getUser().pseudo, this.localStore.getUser().avatar)
    if (lobbyPosition === -1) {
      console.log('error lobbyPosition undefined')
    } else {
      if (this.localStore.getCurrentRoom() !== 'default') {
        let joinTeam: JoinSessionTeam = {
          room: this.localStore.getCurrentRoom(),
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
      if (this.localStore.getCurrentRoom() !== 'default') {
        let indexCard = Utils.indexLobbyPositionCard(this.localStore.getSessionStatusGame().lobby, this.localStore.getUser().pseudo, this.localStore.getUser().avatar, card.name)
        let joinCard: JoinSessionTeamCard = {
          room: this.localStore.getCurrentRoom(),
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
    this.socket.createTurnList(this.localStore.getCurrentRoom())
  }

  whoIsTurn() {
    this.socket.whoIsTurn(this.localStore.getCurrentRoom())
  }

  sendDice(data: CurrentTurnAction) {
    this.socket.sendDice(data)
  }

  chooseMove(data: CurrentTurnAction) {
    this.socket.chooseMove(data)
  }

  endMove(data: CurrentTurnAction) {
    this.socket.endMove(data)
  }


}
