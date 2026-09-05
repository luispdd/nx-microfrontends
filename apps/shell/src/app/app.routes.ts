import { loadRemoteModule } from '@angular-architects/native-federation';
import { Route } from '@angular/router';
import { RemoteFallbackComponent } from './layout/remote-fallback.component';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./perf-dashboard/perf-dashboard').then((m) => m.PerfDashboardComponent),
  },
  {
    path: 'material',
    loadChildren: () =>
      loadRemoteModule('mfe-material', './Routes')
        .then((m) => m.remoteRoutes || m.appRoutes)
        .catch((err) => {
          console.warn('Could not load remote mfe-material:', err);
          return [
            {
              path: '**',
              component: RemoteFallbackComponent,
              data: { remoteName: 'mfe-material' },
            },
          ];
        }),
  },
  {
    path: 'primeng',
    loadChildren: () =>
      loadRemoteModule('mfe-primeng', './Routes')
        .then((m) => m.remoteRoutes || m.appRoutes)
        .catch((err) => {
          console.warn('Could not load remote mfe-primeng:', err);
          return [
            {
              path: '**',
              component: RemoteFallbackComponent,
              data: { remoteName: 'mfe-primeng' },
            },
          ];
        }),
  },
  {
    path: 'native',
    loadChildren: () =>
      loadRemoteModule('mfe-native', './Routes')
        .then((m) => m.remoteRoutes || m.appRoutes)
        .catch((err) => {
          console.warn('Could not load remote mfe-native:', err);
          return [
            {
              path: '**',
              component: RemoteFallbackComponent,
              data: { remoteName: 'mfe-native' },
            },
          ];
        }),
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
