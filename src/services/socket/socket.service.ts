import {inject, Injectable, OnInit} from "@angular/core";
import {io} from "socket.io-client";
import {BehaviorSubject, Observable} from "rxjs";
import {SocketFormatModel, SocketJoinSession, SocketJoinTeamCard} from "../../models/socket.models";
import {InfoGame} from "../../models/info.game.models";
import {PartiesModelsJson} from "../../models/parties.models";
import {GameModels} from "../../models/game.models";
import {MapModels} from "../../models/maps.models";
import {LocalstorageServices} from "../localsotrage/localstorage.services";

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  socketEndPoints = 'highlander-socket';
  socket = io('http://localhost:3000', {transports: ['websocket']});
  local = inject(LocalstorageServices)

  joinDefaultRoom() {
    return this.socket.emit('join-default');
  }

  appConnectedEvent(gameKey: string) {
    if (gameKey === 'default') {
      return this.socket.on('app-connected', (message: SocketFormatModel) => {
        if (message.code >= 200 && message.code < 300) {
          console.log(message)
        } else {
          console.log(message.error)
        }
      });
    } else {
      return this.socket.on(`app-connected-${gameKey}`, (message: SocketFormatModel) => {
        if (message.code >= 200 && message.code < 300) {
          let value: PartiesModelsJson = message.data
          console.log(value)
          let infoGame: InfoGame = value.infoGame
          let game: GameModels = value.game
          let map: MapModels = value.map
          this.local.setStorageGame(game)
          this.local.setStorageMap(map)
          this.local.setStorageInfoGame(infoGame)
        } else {
          console.log(message.error)
        }
      });
    }
  }

  joinRoom(socketJoinSession: SocketJoinSession) {
    return this.socket.emit('join-session', socketJoinSession);
  }

  joinTeamCard(socketJoinTeamCard: SocketJoinTeamCard) {
    return this.socket.emit('join-team-card', socketJoinTeamCard);
  }

}
