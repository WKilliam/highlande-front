import {Router, Routes} from '@angular/router';
import {TesteurIOComponent} from "../features/testeur-io/testeur-io.component";
import {GameCreateSessionPage} from "../features/game.create.session/game.create.session.page";
import {GameLobbyPage} from "../features/game.lobby/game.lobby.page";
import {GameSessionPage} from "../features/game.session/game-session-page.component";
import {inject, Injectable} from "@angular/core";

export const routes: Routes = [
  {path: '', redirectTo: 'testeurio', pathMatch: 'full'},
  // {path: 'app', component: AppComponent,},
  {
    path: 'lobby/:sessionKey',
    component: GameLobbyPage,
  },
  {
    path: 'game',
    component: GameSessionPage,
  },
  {
    path: 'session',
    component: GameCreateSessionPage,
  },
  {
    path: 'testeurio',
    component: TesteurIOComponent,
  },
];
