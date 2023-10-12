import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import {provideClientHydration} from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from './app.router';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideClientHydration(),
    provideAnimations(),
  ],
};
