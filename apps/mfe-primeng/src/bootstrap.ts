import { bootstrapApplication } from '@angular/platform-browser';
import { Theme } from '@primeuix/styled';
import Aura from '@primeng/themes/aura';
import { appConfig } from './app/app.config';
import { App } from './app/app';

if (typeof document !== 'undefined' && !document.getElementById('p-license-host')) {
  const host = document.createElement('div');
  host.id = 'p-license-host';
  host.style.setProperty('display', 'none', 'important');
  document.documentElement.appendChild(host);
}

Theme.setTheme({
  preset: Aura,
  options: {
    darkModeSelector: '.dark'
  }
});

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
