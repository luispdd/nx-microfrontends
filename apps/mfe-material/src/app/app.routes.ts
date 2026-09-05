import { Route } from '@angular/router';
import { BadgeShowcase } from './showcase/badge/badge.component';
import { CardShowcase } from './showcase/card/card.component';
import { CheckboxShowcase } from './showcase/checkbox/checkbox.component';
import { DatepickerShowcase } from './showcase/datepicker/datepicker.component';
import { DialogShowcase } from './showcase/dialog/dialog.component';
import { DividerShowcase } from './showcase/divider/divider.component';
import { ExpansionPanelShowcase } from './showcase/expansion-panel/expansion-panel.component';
import { InputShowcase } from './showcase/input/input.component';
import { MenuShowcase } from './showcase/menu/menu.component';
import { PaginatorShowcase } from './showcase/paginator/paginator.component';
import { ProgressBarShowcase } from './showcase/progress-bar/progress-bar.component';
import { ProgressSpinnerShowcase } from './showcase/progress-spinner/progress-spinner.component';
import { RadioShowcase } from './showcase/radio/radio.component';
import { SelectShowcase } from './showcase/select/select.component';
import { SlideToggleShowcase } from './showcase/slide-toggle/slide-toggle.component';
import { SliderShowcase } from './showcase/slider/slider.component';
import { StepperShowcase } from './showcase/stepper/stepper.component';
import { TableShowcase } from './showcase/table/table.component';
import { TabsShowcase } from './showcase/tabs/tabs.component';
import { ToolbarShowcase } from './showcase/toolbar/toolbar.component';
import { TooltipShowcase } from './showcase/tooltip/tooltip.component';
import { ShowcaseHomeComponent } from './showcase-home.component';

export const appRoutes: Route[] = [
  { path: '', component: ShowcaseHomeComponent, pathMatch: 'full' },
  { path: 'checkbox', component: CheckboxShowcase },
  { path: 'datepicker', component: DatepickerShowcase },
  { path: 'input', component: InputShowcase },
  { path: 'radio', component: RadioShowcase },
  { path: 'select', component: SelectShowcase },
  { path: 'slider', component: SliderShowcase },
  { path: 'slide-toggle', component: SlideToggleShowcase },
  { path: 'menu', component: MenuShowcase },
  { path: 'toolbar', component: ToolbarShowcase },
  { path: 'card', component: CardShowcase },
  { path: 'divider', component: DividerShowcase },
  { path: 'expansion-panel', component: ExpansionPanelShowcase },
  { path: 'stepper', component: StepperShowcase },
  { path: 'tabs', component: TabsShowcase },
  { path: 'badge', component: BadgeShowcase },
  { path: 'progress-bar', component: ProgressBarShowcase },
  { path: 'progress-spinner', component: ProgressSpinnerShowcase },
  { path: 'dialog', component: DialogShowcase },
  { path: 'tooltip', component: TooltipShowcase },
  { path: 'table', component: TableShowcase },
  { path: 'paginator', component: PaginatorShowcase },

  // Cross-MFE Parity Aliases
  { path: 'dropdown', redirectTo: 'select', pathMatch: 'full' },
  { path: 'range-slider', redirectTo: 'slider', pathMatch: 'full' },
  { path: 'text-input', redirectTo: 'input', pathMatch: 'full' },
  { path: 'input-text', redirectTo: 'input', pathMatch: 'full' },
  { path: 'tab-view', redirectTo: 'tabs', pathMatch: 'full' },
  { path: 'accordion', redirectTo: 'expansion-panel', pathMatch: 'full' },
  { path: 'toggle-switch', redirectTo: 'slide-toggle', pathMatch: 'full' },
  { path: 'pagination', redirectTo: 'paginator', pathMatch: 'full' },
  { path: 'progress', redirectTo: 'progress-bar', pathMatch: 'full' },
  { path: 'spinner', redirectTo: 'progress-spinner', pathMatch: 'full' },
  { path: 'dropdown-menu', redirectTo: 'menu', pathMatch: 'full' },

  // Fallback to showcase home
  { path: '**', redirectTo: '' },
];