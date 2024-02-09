import { provideHttpClient } from '@angular/common/http';
import {APP_INITIALIZER, ApplicationConfig} from '@angular/core';
import {provideClientHydration} from '@angular/platform-browser';
import {provideRouter, withComponentInputBinding} from '@angular/router';
import { routes } from './app.router';
import { provideAnimations } from '@angular/platform-browser/animations';
import {AppInitService} from "../security/app-init/app.init.service";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(),
    provideClientHydration(),
    provideAnimations(),
    {
      provide: APP_INITIALIZER,
      useFactory: (appInitService: AppInitService) => () => appInitService.init(),
      deps: [AppInitService],
      multi: true,
    }
],
};
