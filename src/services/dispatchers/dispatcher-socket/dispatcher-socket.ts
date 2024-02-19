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

  joinRoom() {
    this.apiSocketService.joinRoom()
  }

  joinSession(room: string) {
    const userSocketConnect: UserSocketConnect = {
      room: room,
      token: this.#storeManagerApp.getUser().token,
      pseudo: this.#storeManagerApp.getUser().pseudo,
    }
    this.apiSocketService.joinSession(userSocketConnect)
  }

  joinTeam(teamTag: number, cardPosition: number) {
    const positionInsideLobby = this.#storeManagerApp.getLobby().findIndex((player) => player.pseudo === this.#storeManagerApp.getUser().pseudo)
    const userIdentitiesGame: UserIdentitiesGame = {
      room: this.#storeManagerApp.getRoom(),
      positionPlayerInLobby: positionInsideLobby,
      teamSelected: teamTag,
      cardPositionInTeam: cardPosition
    }
    this.apiSocketService.joinTeam(userIdentitiesGame)
  }

  selectCard(cardIndex: number, teamTag: number, cardTag: number) {
    const userIdentitiesGame: UserIdentitiesGame = {
      room: this.#storeManagerApp.getRoom(),
      positionPlayerInLobby: this.#storeManagerApp.getLobby().findIndex((player) => player.pseudo === this.#storeManagerApp.getUser().pseudo),
      teamSelected: teamTag,
      cardPositionInTeam: cardTag,
      cardSelected: cardIndex
    }
    console.log('userIdentitiesGame', userIdentitiesGame)
    this.apiSocketService.selectCard(userIdentitiesGame)
  }


  startGame() {
    this.apiSocketService.startGame()
  }
}
