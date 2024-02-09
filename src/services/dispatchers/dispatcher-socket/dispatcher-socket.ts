import {effect, inject, Injectable} from "@angular/core";
import {SocketService} from "../../socket/socket.service";
import {StorageManagerApp} from "../../storageManagerApp/storageManagerApp";
import {UserIdentitiesGame, UserSocketConnect} from "../../../models/users.models";

@Injectable({
  providedIn: 'root',
})
export class DispatcherSocket {

  readonly apiSocketService = inject(SocketService)
  readonly #storeManagerApp = inject(StorageManagerApp);

  connect() {
    this.apiSocketService.connect()
  }

  joinSession(room: string) {
    const userSocketConnect : UserSocketConnect = {
      room: room,
      token: this.#storeManagerApp.getUser().token,
      pseudo: this.#storeManagerApp.getUser().pseudo,
      avatar: this.#storeManagerApp.getUser().avatar,
      cards: this.#storeManagerApp.getUser().cards,
    }
    this.apiSocketService.joinSession(userSocketConnect)
  }

  joinTeam(teamTag: number, cardPosition: number){
    const positionInsideLobby = this.#storeManagerApp.getLobby().findIndex((player) => player.pseudo === this.#storeManagerApp.getUser().pseudo)
    const userIdentitiesGame = {
      room: this.#storeManagerApp.getRoom(),
      positionPlayerInLobby: positionInsideLobby,
      teamSelectedPerPlayer: teamTag,
      cardPositionInsideTeamCards: cardPosition
    }
    this.apiSocketService.joinTeam(userIdentitiesGame)
  }
}
