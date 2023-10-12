import { Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {NotFound} from "./pages/not-found/not.found.component";
import {LandingComponent} from "./pages/landing/landing.component";
import {GameComponent} from "./pages/game/game.component";
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full'
  },
  {
    path: 'landing',
    component: LandingComponent
  },
  {
    path: 'game',
    component: GameComponent
  },
  {
    path: '**',
    component: NotFound
  }
];
