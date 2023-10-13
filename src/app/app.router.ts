import { Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {GameSessionComponent} from "../features/game.session/game.session.component";
import {GameLobbyPage} from "../features/game.lobby/game.lobby.page";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'lobby',
    pathMatch: 'full'
  },
  {
    path: 'game',
    component: GameSessionComponent
  },
  {
    path: 'lobby',
    component: GameLobbyPage
  }
];
