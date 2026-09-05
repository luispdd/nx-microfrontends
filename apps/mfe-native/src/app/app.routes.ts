import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./showcase/list-page').then(m => m.ListPageComponent)
  },
  {
    path: 'text-input',
    loadComponent: () => import('./showcase/text-input').then(m => m.TextInputComponent)
  },
  {
    path: 'checkbox',
    loadComponent: () => import('./showcase/checkbox').then(m => m.CheckboxComponent)
  },
  {
    path: 'radio',
    loadComponent: () => import('./showcase/radio').then(m => m.RadioComponent)
  },
  {
    path: 'select',
    loadComponent: () => import('./showcase/select').then(m => m.SelectComponent)
  },
  {
    path: 'datepicker',
    loadComponent: () => import('./showcase/datepicker').then(m => m.DatepickerComponent)
  },
  {
    path: 'range-slider',
    loadComponent: () => import('./showcase/range-slider').then(m => m.RangeSliderComponent)
  },
  {
    path: 'toggle-switch',
    loadComponent: () => import('./showcase/toggle-switch').then(m => m.ToggleSwitchComponent)
  },
  {
    path: 'table',
    loadComponent: () => import('./showcase/table').then(m => m.TableComponent)
  },
  {
    path: 'badge',
    loadComponent: () => import('./showcase/badge').then(m => m.BadgeComponent)
  },
  {
    path: 'card',
    loadComponent: () => import('./showcase/card').then(m => m.CardComponent)
  },
  {
    path: 'accordion',
    loadComponent: () => import('./showcase/accordion').then(m => m.AccordionComponent)
  },
  {
    path: 'tabs',
    loadComponent: () => import('./showcase/tabs').then(m => m.TabsComponent)
  },
  {
    path: 'divider',
    loadComponent: () => import('./showcase/divider').then(m => m.DividerComponent)
  },
  {
    path: 'stepper',
    loadComponent: () => import('./showcase/stepper').then(m => m.StepperComponent)
  },
  {
    path: 'progress',
    loadComponent: () => import('./showcase/progress').then(m => m.ProgressComponent)
  },
  {
    path: 'spinner',
    loadComponent: () => import('./showcase/spinner').then(m => m.SpinnerComponent)
  },
  {
    path: 'dialog',
    loadComponent: () => import('./showcase/dialog').then(m => m.DialogComponent)
  },
  {
    path: 'tooltip',
    loadComponent: () => import('./showcase/tooltip').then(m => m.TooltipComponent)
  },
  {
    path: 'pagination',
    loadComponent: () => import('./showcase/pagination').then(m => m.PaginationComponent)
  },
  {
    path: 'toolbar',
    loadComponent: () => import('./showcase/toolbar').then(m => m.ToolbarComponent)
  },
  {
    path: 'menu',
    loadComponent: () => import('./showcase/menu').then(m => m.MenuComponent)
  },

  // Cross-MFE Parity Aliases
  { path: 'dropdown', redirectTo: 'select', pathMatch: 'full' },
  { path: 'slider', redirectTo: 'range-slider', pathMatch: 'full' },
  { path: 'input', redirectTo: 'text-input', pathMatch: 'full' },
  { path: 'input-text', redirectTo: 'text-input', pathMatch: 'full' },
  { path: 'tab-view', redirectTo: 'tabs', pathMatch: 'full' },
  { path: 'expansion-panel', redirectTo: 'accordion', pathMatch: 'full' },
  { path: 'slide-toggle', redirectTo: 'toggle-switch', pathMatch: 'full' },
  { path: 'paginator', redirectTo: 'pagination', pathMatch: 'full' },
  { path: 'progress-bar', redirectTo: 'progress', pathMatch: 'full' },
  { path: 'progress-spinner', redirectTo: 'spinner', pathMatch: 'full' },
  { path: 'dropdown-menu', redirectTo: 'menu', pathMatch: 'full' },

  // Fallback to showcase home
  { path: '**', redirectTo: '' },
];
