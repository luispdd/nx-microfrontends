import { Routes } from '@angular/router';

export const showcaseRoutes: Routes = [
  { path: '', loadComponent: () => import('./showcase-home.component').then(m => m.PrimeNgShowcaseHomeComponent), pathMatch: 'full' },
  { path: 'checkbox', loadComponent: () => import('./checkbox/checkbox.component').then(m => m.CheckboxShowcaseComponent) },
  { path: 'datepicker', loadComponent: () => import('./datepicker/datepicker.component').then(m => m.DatepickerShowcaseComponent) },
  { path: 'dropdown', loadComponent: () => import('./dropdown/dropdown.component').then(m => m.DropdownShowcaseComponent) },
  { path: 'input-text', loadComponent: () => import('./input-text/input-text.component').then(m => m.InputTextShowcaseComponent) },
  { path: 'radio', loadComponent: () => import('./radio/radio.component').then(m => m.RadioShowcaseComponent) },
  { path: 'slider', loadComponent: () => import('./slider/slider.component').then(m => m.SliderShowcaseComponent) },
  { path: 'toggle-switch', loadComponent: () => import('./toggle-switch/toggle-switch.component').then(m => m.ToggleSwitchShowcaseComponent) },
  { path: 'table', loadComponent: () => import('./table/table.component').then(m => m.TableShowcaseComponent) },
  { path: 'paginator', loadComponent: () => import('./paginator/paginator.component').then(m => m.PaginatorShowcaseComponent) },
  { path: 'accordion', loadComponent: () => import('./accordion/accordion.component').then(m => m.AccordionShowcaseComponent) },
  { path: 'card', loadComponent: () => import('./card/card.component').then(m => m.CardShowcaseComponent) },
  { path: 'divider', loadComponent: () => import('./divider/divider.component').then(m => m.DividerShowcaseComponent) },
  { path: 'stepper', loadComponent: () => import('./stepper/stepper.component').then(m => m.StepperShowcaseComponent) },
  { path: 'tab-view', loadComponent: () => import('./tab-view/tab-view.component').then(m => m.TabViewShowcaseComponent) },
  { path: 'toolbar', loadComponent: () => import('./toolbar/toolbar.component').then(m => m.ToolbarShowcaseComponent) },
  { path: 'dialog', loadComponent: () => import('./dialog/dialog.component').then(m => m.DialogShowcaseComponent) },
  { path: 'tooltip', loadComponent: () => import('./tooltip/tooltip.component').then(m => m.TooltipShowcaseComponent) },
  { path: 'menu', loadComponent: () => import('./menu/menu.component').then(m => m.MenuShowcaseComponent) },
  { path: 'badge', loadComponent: () => import('./badge/badge.component').then(m => m.BadgeShowcaseComponent) },
  { path: 'progress-bar', loadComponent: () => import('./progress-bar/progress-bar.component').then(m => m.ProgressBarShowcaseComponent) },
  { path: 'progress-spinner', loadComponent: () => import('./progress-spinner/progress-spinner.component').then(m => m.ProgressSpinnerShowcaseComponent) },

  // Cross-MFE Parity Aliases
  { path: 'select', redirectTo: 'dropdown', pathMatch: 'full' },
  { path: 'range-slider', redirectTo: 'slider', pathMatch: 'full' },
  { path: 'text-input', redirectTo: 'input-text', pathMatch: 'full' },
  { path: 'input', redirectTo: 'input-text', pathMatch: 'full' },
  { path: 'tabs', redirectTo: 'tab-view', pathMatch: 'full' },
  { path: 'expansion-panel', redirectTo: 'accordion', pathMatch: 'full' },
  { path: 'slide-toggle', redirectTo: 'toggle-switch', pathMatch: 'full' },
  { path: 'pagination', redirectTo: 'paginator', pathMatch: 'full' },
  { path: 'progress', redirectTo: 'progress-bar', pathMatch: 'full' },
  { path: 'spinner', redirectTo: 'progress-spinner', pathMatch: 'full' },
  { path: 'dropdown-menu', redirectTo: 'menu', pathMatch: 'full' },

  // Fallback to showcase home
  { path: '**', redirectTo: '' },
];
