import {Injectable} from "@angular/core";
import {io} from "socket.io-client";

@Injectable({
  providedIn: 'root',
})
export class SocketServices {
  readonly #socket = io(
    'http://localhost:3000',
    { transports : ['websocket'] }
  );



}
