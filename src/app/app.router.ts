import { Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {GameSessionComponent} from "../features/game-session/game.session/game.session.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'game',
    pathMatch: 'full'
  },
  {
    path: 'game',
    component: GameSessionComponent
  }
];
