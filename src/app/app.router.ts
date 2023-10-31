import {Routes} from '@angular/router';
import {GameLobbyPage} from "../features/game.lobby/game.lobby.page";
import {TesteurIOComponent} from "../features/testeur-io/testeur-io.component";

export const routes: Routes = [
  {path: '', redirectTo: 'testeurio', pathMatch: 'full'},
  {
    path: 'lobby',
    component: GameLobbyPage,
  },
  {
    path: 'lobby/:sessionKey',
    component: GameLobbyPage,
  },
  {
    path: 'testeurio',
    component: TesteurIOComponent,
  },
];
