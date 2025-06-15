import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { NgxCaptchaModule } from 'ngx-captcha'; // <-- 1. Import the module

import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(), // Ensures HttpClient is available for your services
    importProvidersFrom(NgxCaptchaModule), // <-- 2. Import all providers from the module here
  ],
};
