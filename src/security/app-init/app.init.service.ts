import {inject, Injectable} from "@angular/core";
import {DispatcherSocket} from "../../services/dispatchers/dispatcher-socket/dispatcher-socket";

@Injectable({
  providedIn: 'root',
})
export class AppInitService {

  private dispatcherSocket: DispatcherSocket = inject(DispatcherSocket)

  init() {
    // Logique de connexion à la WebSocket
    return new Promise<void>((resolve, reject) => {
      try {
        this.dispatcherSocket.connect();
        // this.dispatcherSocket.listenAllSocket()
        resolve(); // Résoudre la promesse si la connexion est réussie
      } catch (error) {
        reject(error); // Rejeter la promesse en cas d'erreur
      }
    });

  }
}
