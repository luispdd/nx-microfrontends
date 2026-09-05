import { Routes } from '@angular/router';
import { ENVIRONMENT_INITIALIZER, inject } from '@angular/core';
import { providePrimeNG, PrimeNG } from 'primeng/config';
import { Theme } from '@primeuix/styled';
import Aura from '@primeng/themes/aura';
import { showcaseRoutes } from '../showcase/showcase.routes';

// Synchronously configure theme preset so tokens exist before components load
Theme.setTheme({
  preset: Aura,
  options: {
    darkModeSelector: '.dark'
  }
});

export const remoteRoutes: Routes = [
  {
    path: '',
    providers: [
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
            primeng.setConfig({
              theme: {
                preset: Aura,
                options: {
                  darkModeSelector: '.dark'
                }
              },
              ripple: true
            });
          }
        }
      }
    ],
    children: showcaseRoutes
  }
];
