import {Routes} from '@angular/router';
import {TesteurIOComponent} from "../features/testeur-io/testeur-io.component";
import {CreateSessionUi} from "../ui/component/create-session/create-session.ui";
import {LobbyFeatures} from "../features/lobby/lobby.features";


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
    path: 'create_session',
    component: CreateSessionUi,
  },
];
