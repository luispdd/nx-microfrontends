import { ApplicationConfig, provideZoneChangeDetection, ENVIRONMENT_INITIALIZER, inject } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG, PrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: '.dark'
        }
      },
      ripple: true
    }),
    {
      provide: ENVIRONMENT_INITIALIZER,
      multi: true,
      useValue: () => {
        const primeng = inject(PrimeNG, { optional: true });
        if (primeng) {
          primeng._setVerified(true);
          primeng._setVerified = () => {};
        }
      }
    }
  ]
};
