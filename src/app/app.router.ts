import {Routes} from '@angular/router';
import {TesteurIOComponent} from "../features/testeur-io/testeur-io.component";
import {CreateSessionUi} from "../ui/component/create-session/create-session.ui";
import {LobbyFeatures} from "../features/lobby/lobby.features";
import {GameSessionPage} from "../features/game.session/game-session-page.component";


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'testeurio',
    pathMatch: 'full'
  },
  {
    path: 'testeurio',
    component: TesteurIOComponent,
  },
  {
    path: 'lobby/:room',
    component: LobbyFeatures,
  },
  {
    path: 'game/:room',
    component: GameSessionPage,
  },
  {
    path: 'create_session',
    component: CreateSessionUi,
  },
];
