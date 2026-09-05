import * as fs from 'fs';
import * as path from 'path';

const basePath = path.resolve('apps/mfe-primeng/src/app/showcase');

interface PrimeShowcaseDef {
  className: string;
  title: string;
  desc: string;
  imports: string[];
  providers?: string[];
  componentCode: string;
  template: string;
}

const showcases: Record<string, PrimeShowcaseDef> = {
  'autocomplete': {
    className: 'AutocompleteShowcaseComponent',
    title: 'AutoComplete',
    desc: 'PrimeNG AutoComplete with filtered suggestions, dropdown trigger, and reactive state.',
    imports: [
      "import { AutoComplete, AutoCompleteCompleteEvent } from 'primeng/autocomplete';",
      "import { FormsModule } from '@angular/forms';",
      "import { MOCK_COUNTRIES } from '@nx-microfrontends/shared-models';"
    ],
    componentCode: `
  selectedCountry = signal<string>('');
  filteredCountries = signal<string[]>([]);
  countries = MOCK_COUNTRIES.map(c => c.name);

  filterCountries(event: AutoCompleteCompleteEvent) {
    const query = event.query.toLowerCase();
    this.filteredCountries.set(
      this.countries.filter(c => c.toLowerCase().includes(query))
    );
  }
`,
    template: `
      <div class="space-y-4 max-w-md">
        <label for="country-ac" class="block text-sm font-semibold text-slate-200">Select Country</label>
        <p-autocomplete
          inputId="country-ac"
          [ngModel]="selectedCountry()"
          (ngModelChange)="selectedCountry.set($event)"
          [suggestions]="filteredCountries()"
          (completeMethod)="filterCountries($event)"
          [dropdown]="true"
          placeholder="Search country..."
          class="w-full"
        />
        <p class="text-xs text-slate-400">Selected: <strong class="text-amber-400">{{ selectedCountry() || '(none)' }}</strong></p>
      </div>
`
  },

  'checkbox': {
    className: 'CheckboxShowcaseComponent',
    title: 'Checkbox',
    desc: 'Binary and multi-option checkboxes with PrimeNG theming.',
    imports: [
      "import { Checkbox } from 'primeng/checkbox';",
      "import { FormsModule } from '@angular/forms';"
    ],
    componentCode: `
  checked = signal(true);
  selectedCategories = signal<string[]>(['Perf', 'A11y']);
`,
    template: `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="space-y-3">
          <h3 class="font-semibold text-slate-100 text-sm">Binary Checkbox</h3>
          <div class="flex items-center gap-2">
            <p-checkbox
              inputId="binary-cb"
              [binary]="true"
              [ngModel]="checked()"
              (ngModelChange)="checked.set($event)"
            />
            <label for="binary-cb" class="text-sm text-slate-200 cursor-pointer">Enable Performance Profiling</label>
          </div>
          <p class="text-xs text-slate-400">State: <strong class="text-amber-400">{{ checked() ? 'Active' : 'Disabled' }}</strong></p>
        </div>

        <div class="space-y-3">
          <h3 class="font-semibold text-slate-100 text-sm">Multiple Categories</h3>
          <div class="space-y-2">
            @for (cat of ['Perf', 'A11y', 'Bundle', 'Hydration']; track cat) {
              <div class="flex items-center gap-2">
                <p-checkbox
                  [inputId]="'cat-' + cat"
                  [value]="cat"
                  [ngModel]="selectedCategories()"
                  (ngModelChange)="selectedCategories.set($event)"
                />
                <label [for]="'cat-' + cat" class="text-sm text-slate-200 cursor-pointer">{{ cat }} Metrics</label>
              </div>
            }
          </div>
          <p class="text-xs text-slate-400">Selected: <strong class="text-amber-400">{{ selectedCategories().join(', ') }}</strong></p>
        </div>
      </div>
`
  },

  'chips': {
    className: 'ChipsShowcaseComponent',
    title: 'Chips / InputTags',
    desc: 'PrimeNG InputTags for tag entry and Chip elements for standalone badges.',
    imports: [
      "import { InputTags } from 'primeng/inputtags';",
      "import { Chip } from 'primeng/chip';",
      "import { FormsModule } from '@angular/forms';"
    ],
    componentCode: `
  values = signal<string[]>(['Angular', 'PrimeNG', 'Tailwind', 'Microfrontends']);
`,
    template: `
      <div class="space-y-6 max-w-lg">
        <div class="space-y-2">
          <label for="tags-input" class="block text-sm font-semibold text-slate-200">Enter Tags (Press Enter)</label>
          <p-inputtags
            inputId="tags-input"
            [ngModel]="values()"
            (ngModelChange)="values.set($event)"
            placeholder="Add new tag..."
            class="w-full"
          />
        </div>

        <div class="space-y-2">
          <h4 class="text-sm font-semibold text-slate-200">Standalone Chip Badges</h4>
          <div class="flex flex-wrap gap-2">
            <p-chip label="Aura Theme" icon="pi pi-palette" />
            <p-chip label="Removable" [removable]="true" />
            <p-chip label="Enterprise" icon="pi pi-star" />
          </div>
        </div>
      </div>
`
  },

  'color-picker': {
    className: 'ColorPickerShowcaseComponent',
    title: 'ColorPicker',
    desc: 'PrimeNG ColorPicker in inline and popup modes with live preview.',
    imports: [
      "import { ColorPicker } from 'primeng/colorpicker';",
      "import { FormsModule } from '@angular/forms';"
    ],
    componentCode: `
  color = signal('#f59e0b');
`,
    template: `
      <div class="space-y-6 max-w-md">
        <div class="flex items-center gap-4">
          <p-colorpicker
            [ngModel]="color()"
            (ngModelChange)="color.set($event)"
          />
          <div>
            <span class="block text-sm font-semibold text-slate-200">Selected Hex</span>
            <span class="font-mono font-bold text-lg text-white">{{ color() }}</span>
          </div>
        </div>
        <div [style.background-color]="color()" class="p-4 rounded-xl text-white font-semibold text-center shadow">
          Preview Box
        </div>
      </div>
`
  },

  'datepicker': {
    className: 'DatepickerShowcaseComponent',
    title: 'DatePicker',
    desc: 'PrimeNG DatePicker supporting date selection, time picker, and inline calendar.',
    imports: [
      "import { DatePicker } from 'primeng/datepicker';",
      "import { FormsModule } from '@angular/forms';"
    ],
    componentCode: `
  date = signal<Date | null>(new Date());
  rangeDates = signal<Date[] | null>(null);
`,
    template: `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="space-y-2">
          <label for="dp-single" class="block text-sm font-semibold text-slate-200">Single Date</label>
          <p-datepicker
            inputId="dp-single"
            [ngModel]="date()"
            (ngModelChange)="date.set($event)"
            [showIcon]="true"
            class="w-full"
          />
          <p class="text-xs text-slate-400">Selected: <strong class="text-amber-400">{{ date() ? date()!.toLocaleDateString() : 'None' }}</strong></p>
        </div>

        <div class="space-y-2">
          <label for="dp-range" class="block text-sm font-semibold text-slate-200">Date Range Selection</label>
          <p-datepicker
            inputId="dp-range"
            [ngModel]="rangeDates()"
            (ngModelChange)="rangeDates.set($event)"
            selectionMode="range"
            [showIcon]="true"
            placeholder="Select date range"
            class="w-full"
          />
        </div>
      </div>
`
  },

  'dropdown': {
    className: 'DropdownShowcaseComponent',
    title: 'Select / Dropdown',
    desc: 'PrimeNG Select component with search filter, clear button, and template options.',
    imports: [
      "import { Select } from 'primeng/select';",
      "import { FormsModule } from '@angular/forms';",
      "import { MOCK_COUNTRIES } from '@nx-microfrontends/shared-models';"
    ],
    componentCode: `
  selectedCountry = signal<string>('US');
  countries = MOCK_COUNTRIES;
`,
    template: `
      <div class="space-y-3 max-w-sm">
        <label for="country-select" class="block text-sm font-semibold text-slate-200">Select Country</label>
        <p-select
          inputId="country-select"
          [options]="countries"
          [ngModel]="selectedCountry()"
          (ngModelChange)="selectedCountry.set($event)"
          optionLabel="name"
          optionValue="code"
          [filter]="true"
          filterBy="name"
          [showClear]="true"
          placeholder="Select a Country"
          class="w-full"
        />
        <p class="text-xs text-slate-400">Selected Code: <strong class="text-amber-400">{{ selectedCountry() || '(none)' }}</strong></p>
      </div>
`
  },

  'input-text': {
    className: 'InputTextShowcaseComponent',
    title: 'InputText',
    desc: 'PrimeNG InputText with sizes, icons, and disabled states.',
    imports: [
      "import { InputText } from 'primeng/inputtext';",
      "import { FormsModule } from '@angular/forms';"
    ],
    componentCode: `
  textVal = signal('PrimeNG Aura Theme');
`,
    template: `
      <div class="space-y-4 max-w-md">
        <div class="space-y-1">
          <label for="inp-sm" class="block text-xs font-semibold text-slate-300">Small Input</label>
          <input id="inp-sm" type="text" pInputText size="small" [ngModel]="textVal()" (ngModelChange)="textVal.set($event)" class="w-full" />
        </div>
        <div class="space-y-1">
          <label for="inp-norm" class="block text-xs font-semibold text-slate-300">Standard Input</label>
          <input id="inp-norm" type="text" pInputText [ngModel]="textVal()" (ngModelChange)="textVal.set($event)" class="w-full" />
        </div>
        <div class="space-y-1">
          <label for="inp-dis" class="block text-xs font-semibold text-slate-400">Disabled Input</label>
          <input id="inp-dis" type="text" pInputText value="Read-only ID: #4202" [disabled]="true" class="w-full" />
        </div>
      </div>
`
  },

  'input-number': {
    className: 'InputNumberShowcaseComponent',
    title: 'InputNumber',
    desc: 'PrimeNG InputNumber formatted with currency, step buttons, and limits.',
    imports: [
      "import { InputNumber } from 'primeng/inputnumber';",
      "import { FormsModule } from '@angular/forms';"
    ],
    componentCode: `
  price = signal(49.99);
  quantity = signal(5);
`,
    template: `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="space-y-2">
          <label for="inp-price" class="block text-sm font-semibold text-slate-200">Currency (USD)</label>
          <p-inputnumber
            inputId="inp-price"
            [ngModel]="price()"
            (ngModelChange)="price.set($event)"
            mode="currency"
            currency="USD"
            locale="en-US"
            class="w-full"
          />
        </div>

        <div class="space-y-2">
          <label for="inp-qty" class="block text-sm font-semibold text-slate-200">Quantity with Stepper</label>
          <p-inputnumber
            inputId="inp-qty"
            [ngModel]="quantity()"
            (ngModelChange)="quantity.set($event)"
            [showButtons]="true"
            buttonLayout="horizontal"
            [min]="1"
            [max]="100"
            class="w-full"
          />
        </div>
      </div>
`
  },

  'input-mask': {
    className: 'InputMaskShowcaseComponent',
    title: 'InputMask',
    desc: 'PrimeNG InputMask enforcing formatted input patterns.',
    imports: [
      "import { InputMask } from 'primeng/inputmask';",
      "import { FormsModule } from '@angular/forms';"
    ],
    componentCode: `
  phone = signal('');
  serial = signal('');
`,
    template: `
      <div class="space-y-4 max-w-md">
        <div class="space-y-1">
          <label for="mask-phone" class="block text-sm font-semibold text-slate-200">Phone Number</label>
          <p-inputmask
            inputId="mask-phone"
            mask="(999) 999-9999"
            [ngModel]="phone()"
            (ngModelChange)="phone.set($event)"
            placeholder="(555) 123-4567"
            class="w-full"
          />
        </div>

        <div class="space-y-1">
          <label for="mask-serial" class="block text-sm font-semibold text-slate-200">Product Serial Key</label>
          <p-inputmask
            inputId="mask-serial"
            mask="a*-999-a999"
            [ngModel]="serial()"
            (ngModelChange)="serial.set($event)"
            placeholder="AB-123-C456"
            class="w-full"
          />
        </div>
      </div>
`
  },

  'textarea': {
    className: 'TextareaShowcaseComponent',
    title: 'Textarea',
    desc: 'PrimeNG Textarea with auto-resize and styled borders.',
    imports: [
      "import { Textarea } from 'primeng/textarea';",
      "import { FormsModule } from '@angular/forms';"
    ],
    componentCode: `
  value = signal('PrimeNG provides over 80 rich UI components with comprehensive theming.');
`,
    template: `
      <div class="space-y-2 max-w-xl">
        <label for="prime-textarea" class="block text-sm font-semibold text-slate-200">Auto-resizing Textarea</label>
        <textarea
          id="prime-textarea"
          pTextarea
          [autoResize]="true"
          rows="4"
          [ngModel]="value()"
          (ngModelChange)="value.set($event)"
          class="w-full"
        ></textarea>
        <p class="text-xs text-slate-400">Character count: <strong class="text-amber-400">{{ value().length }}</strong></p>
      </div>
`
  },

  'knob': {
    className: 'KnobShowcaseComponent',
    title: 'Knob',
    desc: 'PrimeNG Knob circular dial gauge with step and custom colors.',
    imports: [
      "import { Knob } from 'primeng/knob';",
      "import { FormsModule } from '@angular/forms';"
    ],
    componentCode: `
  value = signal(60);
`,
    template: `
      <div class="flex items-center gap-8">
        <div class="text-center space-y-2">
          <p-knob
            [ngModel]="value()"
            (ngModelChange)="value.set($event)"
            [min]="0"
            [max]="100"
            [step]="5"
            valueColor="#f59e0b"
            rangeColor="#e5e7eb"
          />
          <span class="text-xs font-semibold text-slate-300 block">Performance Index</span>
        </div>
      </div>
`
  },

  'listbox': {
    className: 'ListboxShowcaseComponent',
    title: 'Listbox',
    desc: 'PrimeNG Listbox with multiple selection and search filtering.',
    imports: [
      "import { Listbox } from 'primeng/listbox';",
      "import { FormsModule } from '@angular/forms';"
    ],
    componentCode: `
  selectedCities = signal<string[]>(['PAR', 'NY']);
  cities = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Paris', code: 'PAR' },
    { name: 'Tokyo', code: 'TYO' },
    { name: 'Berlin', code: 'BER' }
  ];
`,
    template: `
      <div class="space-y-3 max-w-sm">
        <span class="block text-sm font-semibold text-slate-200">Filterable Multi-Listbox</span>
        <p-listbox
          [options]="cities"
          [ngModel]="selectedCities()"
          (ngModelChange)="selectedCities.set($event)"
          [multiple]="true"
          [filter]="true"
          optionLabel="name"
          optionValue="code"
          [listStyle]="{'max-height': '200px'}"
          class="w-full"
        />
        <p class="text-xs text-slate-400">Selected: <strong class="text-amber-400">{{ selectedCities().join(', ') }}</strong></p>
      </div>
`
  },

  'multiselect': {
    className: 'MultiselectShowcaseComponent',
    title: 'MultiSelect',
    desc: 'PrimeNG MultiSelect dropdown with chip display and selection limits.',
    imports: [
      "import { MultiSelect } from 'primeng/multiselect';",
      "import { FormsModule } from '@angular/forms';",
      "import { MOCK_COUNTRIES } from '@nx-microfrontends/shared-models';"
    ],
    componentCode: `
  selectedCountries = signal<string[]>(['US', 'DE', 'JP']);
  countries = MOCK_COUNTRIES;
`,
    template: `
      <div class="space-y-3 max-w-md">
        <label for="ms-countries" class="block text-sm font-semibold text-slate-200">Select Countries</label>
        <p-multiselect
          inputId="ms-countries"
          [options]="countries"
          [ngModel]="selectedCountries()"
          (ngModelChange)="selectedCountries.set($event)"
          optionLabel="name"
          optionValue="code"
          display="chip"
          placeholder="Choose countries"
          class="w-full"
        />
        <p class="text-xs text-slate-400">Selected Count: <strong class="text-amber-400">{{ selectedCountries().length }}</strong></p>
      </div>
`
  },

  'password': {
    className: 'PasswordShowcaseComponent',
    title: 'Password',
    desc: 'PrimeNG Password with toggle mask and strength meter.',
    imports: [
      "import { Password } from 'primeng/password';",
      "import { FormsModule } from '@angular/forms';"
    ],
    componentCode: `
  pwd = signal('');
`,
    template: `
      <div class="space-y-2 max-w-sm">
        <label for="pwd-input" class="block text-sm font-semibold text-slate-200">Enter Secure Password</label>
        <p-password
          inputId="pwd-input"
          [ngModel]="pwd()"
          (ngModelChange)="pwd.set($event)"
          [toggleMask]="true"
          [feedback]="true"
          class="w-full"
        />
      </div>
`
  },

  'radio': {
    className: 'RadioShowcaseComponent',
    title: 'RadioButton',
    desc: 'PrimeNG RadioButton groups with custom labels.',
    imports: [
      "import { RadioButton } from 'primeng/radiobutton';",
      "import { FormsModule } from '@angular/forms';"
    ],
    componentCode: `
  selectedCategory = signal('Performance');
`,
    template: `
      <div class="space-y-3">
        <span class="block text-sm font-semibold text-slate-200">Benchmark Mode</span>
        <div class="flex flex-col gap-2">
          @for (cat of ['Performance', 'Accessibility', 'Bundle Size']; track cat) {
            <div class="flex items-center gap-2">
              <p-radiobutton
                [inputId]="'rb-' + cat"
                name="category"
                [value]="cat"
                [ngModel]="selectedCategory()"
                (ngModelChange)="selectedCategory.set($event)"
              />
              <label [for]="'rb-' + cat" class="text-sm text-slate-200 cursor-pointer">{{ cat }}</label>
            </div>
          }
        </div>
        <p class="text-xs text-slate-400">Active mode: <strong class="text-amber-400">{{ selectedCategory() }}</strong></p>
      </div>
`
  },

  'rating': {
    className: 'RatingShowcaseComponent',
    title: 'Rating',
    desc: 'PrimeNG Rating component with 5 stars and interactive score.',
    imports: [
      "import { Rating } from 'primeng/rating';",
      "import { FormsModule } from '@angular/forms';"
    ],
    componentCode: `
  val = signal(4);
`,
    template: `
      <div class="space-y-3">
        <span class="block text-sm font-semibold text-slate-200">Component Ergonomics Rating</span>
        <p-rating
          [ngModel]="val()"
          (ngModelChange)="val.set($event)"
        />
        <p class="text-xs text-slate-400">Score: <strong class="text-amber-400">{{ val() }} / 5 stars</strong></p>
      </div>
`
  },

  'select-button': {
    className: 'SelectButtonShowcaseComponent',
    title: 'SelectButton',
    desc: 'PrimeNG SelectButton segmented controls.',
    imports: [
      "import { SelectButton } from 'primeng/selectbutton';",
      "import { FormsModule } from '@angular/forms';"
    ],
    componentCode: `
  timeframe = signal('W');
  options = [
    { label: 'Day', value: 'D' },
    { label: 'Week', value: 'W' },
    { label: 'Month', value: 'M' },
    { label: 'Year', value: 'Y' }
  ];
`,
    template: `
      <div class="space-y-3">
        <span class="block text-sm font-semibold text-slate-200">Metrics Timeframe</span>
        <p-selectbutton
          [options]="options"
          [ngModel]="timeframe()"
          (ngModelChange)="timeframe.set($event)"
          optionLabel="label"
          optionValue="value"
        />
        <p class="text-xs text-slate-400">Selected interval: <strong class="text-amber-400">{{ timeframe() }}</strong></p>
      </div>
`
  },

  'slider': {
    className: 'SliderShowcaseComponent',
    title: 'Slider',
    desc: 'PrimeNG Slider in single and dual-handle range modes.',
    imports: [
      "import { Slider } from 'primeng/slider';",
      "import { FormsModule } from '@angular/forms';"
    ],
    componentCode: `
  val = signal(45);
  rangeValues = signal<number[]>([20, 80]);
`,
    template: `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl">
        <div class="space-y-4">
          <div class="flex justify-between text-sm font-semibold text-slate-200">
            <span>Single Value Slider</span>
            <span class="text-amber-400">{{ val() }}%</span>
          </div>
          <p-slider
            [ngModel]="val()"
            (ngModelChange)="val.set($event)"
            [min]="0"
            [max]="100"
            class="w-full"
          />
        </div>

        <div class="space-y-4">
          <div class="flex justify-between text-sm font-semibold text-slate-200">
            <span>Range Slider</span>
            <span class="text-amber-400">{{ rangeValues()[0] }} - {{ rangeValues()[1] }}</span>
          </div>
          <p-slider
            [ngModel]="rangeValues()"
            (ngModelChange)="rangeValues.set($event)"
            [range]="true"
            class="w-full"
          />
        </div>
      </div>
`
  },

  'toggle-switch': {
    className: 'ToggleSwitchShowcaseComponent',
    title: 'ToggleSwitch',
    desc: 'PrimeNG ToggleSwitch for boolean settings.',
    imports: [
      "import { ToggleSwitch } from 'primeng/toggleswitch';",
      "import { FormsModule } from '@angular/forms';"
    ],
    componentCode: `
  active = signal(true);
`,
    template: `
      <div class="flex items-center gap-3">
        <p-toggleswitch
          inputId="ts-active"
          [ngModel]="active()"
          (ngModelChange)="active.set($event)"
        />
        <label for="ts-active" class="text-sm font-semibold text-slate-200 cursor-pointer">
          Live Profiling Stream: <span class="text-amber-400">{{ active() ? 'ON' : 'OFF' }}</span>
        </label>
      </div>
`
  },

  'data-view': {
    className: 'DataViewShowcaseComponent',
    title: 'DataView',
    desc: 'PrimeNG DataView displaying products with custom item layouts.',
    imports: [
      "import { DataView } from 'primeng/dataview';",
      "import { Tag } from 'primeng/tag';",
      "import { Button } from 'primeng/button';",
      "import { MOCK_PRODUCTS } from '@nx-microfrontends/shared-models';"
    ],
    componentCode: `
  products = signal(MOCK_PRODUCTS);
`,
    template: `
      <div class="space-y-4">
        <p-dataview [value]="products()">
          <ng-template #list let-items>
            <div class="divide-y divide-slate-700">
              @for (item of items; track item.id) {
                <div class="p-4 flex items-center justify-between">
                  <div>
                    <span class="font-bold text-white block">{{ item.name }}</span>
                    <span class="text-xs text-slate-400">{{ item.category }} · USD {{ item.price }}</span>
                  </div>
                  <div class="flex items-center gap-4">
                    <p-tag [value]="item.inventoryStatus" severity="success" />
                    <p-button label="Inspect" size="small" />
                  </div>
                </div>
              }
            </div>
          </ng-template>
        </p-dataview>
      </div>
`
  },

  'order-list': {
    className: 'OrderListShowcaseComponent',
    title: 'OrderList',
    desc: 'PrimeNG OrderList with drag/click reordering.',
    imports: [
      "import { OrderList } from 'primeng/orderlist';"
    ],
    componentCode: `
  cities = signal([
    { name: 'Native HTML5 Baseline', id: '1' },
    { name: 'PrimeNG 22 Aura', id: '2' },
    { name: 'Angular Material M3', id: '3' },
    { name: 'Dynamic Shell Host', id: '4' }
  ]);
`,
    template: `
      <div class="max-w-md">
        <p-orderlist [value]="cities()" header="Reorder Benchmark Priority">
          <ng-template #item let-item>
            <div class="p-2 font-medium text-sm">{{ item.name }}</div>
          </ng-template>
        </p-orderlist>
      </div>
`
  },

  'pick-list': {
    className: 'PickListShowcaseComponent',
    title: 'PickList',
    desc: 'PrimeNG PickList transferring items between available and selected lists.',
    imports: [
      "import { PickList } from 'primeng/picklist';"
    ],
    componentCode: `
  source = signal([
    { name: 'Largest Contentful Paint', code: 'LCP' },
    { name: 'Interaction to Next Paint', code: 'INP' }
  ]);
  target = signal([
    { name: 'Cumulative Layout Shift', code: 'CLS' },
    { name: 'Time to First Byte', code: 'TTFB' }
  ]);
`,
    template: `
      <div class="max-w-3xl">
        <p-picklist
          [source]="source()"
          [target]="target()"
          sourceHeader="Available Metrics"
          targetHeader="Active Profilers"
          [responsive]="true"
          [sourceStyle]="{ height: '14rem' }"
          [targetStyle]="{ height: '14rem' }"
        >
          <ng-template #item let-item>
            <div class="text-sm font-semibold">{{ item.name }} ({{ item.code }})</div>
          </ng-template>
        </p-picklist>
      </div>
`
  },

  'tree': {
    className: 'TreeShowcaseComponent',
    title: 'Tree',
    desc: 'PrimeNG Tree with expandable folder hierarchy and selection.',
    imports: [
      "import { Tree } from 'primeng/tree';",
      "import { TreeNode } from 'primeng/api';",
      "import { MOCK_TREE_NODES } from '@nx-microfrontends/shared-models';"
    ],
    componentCode: `
  files = signal<TreeNode[]>(MOCK_TREE_NODES as unknown as TreeNode[]);
`,
    template: `
      <div class="max-w-md">
        <p-tree [value]="files()" class="w-full" />
      </div>
`
  },

  'tree-table': {
    className: 'TreeTableShowcaseComponent',
    title: 'TreeTable',
    desc: 'PrimeNG TreeTable with hierarchical tabular columns.',
    imports: [
      "import { TreeTableModule, TreeTableToggler } from 'primeng/treetable';",
      "import { TreeNode } from 'primeng/api';"
    ],
    componentCode: `
  files = signal<TreeNode[]>([
    {
      data: { name: 'Applications', size: '1.2 MB', type: 'Folder' },
      children: [
        { data: { name: 'shell', size: '380 KB', type: 'Host App' } },
        { data: { name: 'mfe-primeng', size: '587 KB', type: 'Remote App' } }
      ]
    },
    {
      data: { name: 'Libraries', size: '120 KB', type: 'Folder' },
      children: [
        { data: { name: 'shared-perf', size: '45 KB', type: 'Service' } }
      ]
    }
  ]);
`,
    template: `
      <div class="max-w-3xl">
        <p-treetable [value]="files()">
          <ng-template #header>
            <tr>
              <th>Name</th>
              <th>Bundle Size</th>
              <th>Type</th>
            </tr>
          </ng-template>
          <ng-template #body let-rowNode let-rowData="rowData">
            <tr [ttRow]="rowNode">
              <td>
                <p-treetable-toggler [rowNode]="rowNode" />
                {{ rowData.name }}
              </td>
              <td>{{ rowData.size }}</td>
              <td>{{ rowData.type }}</td>
            </tr>
          </ng-template>
        </p-treetable>
      </div>
`
  },

  'tree-select': {
    className: 'TreeSelectShowcaseComponent',
    title: 'TreeSelect',
    desc: 'PrimeNG TreeSelect dropdown selecting nodes from a tree hierarchy.',
    imports: [
      "import { TreeSelect } from 'primeng/treeselect';",
      "import { TreeNode } from 'primeng/api';",
      "import { FormsModule } from '@angular/forms';"
    ],
    componentCode: `
  selectedNode = signal<TreeNode | null>(null);
  nodes = signal<TreeNode[]>([
    {
      label: 'Performance Tests',
      children: [
        { label: 'Lighthouse Audit' },
        { label: 'Playwright Benchmarks' }
      ]
    },
    {
      label: 'Microfrontends',
      children: [
        { label: 'Shell' },
        { label: 'PrimeNG' }
      ]
    }
  ]);
`,
    template: `
      <div class="space-y-2 max-w-sm">
        <label for="ts-nodes" class="block text-sm font-semibold text-slate-200">Select Test Node</label>
        <p-treeselect
          inputId="ts-nodes"
          [options]="nodes()"
          [ngModel]="selectedNode()"
          (ngModelChange)="selectedNode.set($event)"
          placeholder="Select a category"
          class="w-full"
        />
      </div>
`
  },

  'paginator': {
    className: 'PaginatorShowcaseComponent',
    title: 'Paginator',
    desc: 'PrimeNG standalone Paginator with page links and rows per page selector.',
    imports: [
      "import { Paginator, PaginatorState } from 'primeng/paginator';"
    ],
    componentCode: `
  first = signal(0);
  rows = signal(10);

  onPageChange(event: PaginatorState) {
    this.first.set(event.first ?? 0);
    this.rows.set(event.rows ?? 10);
  }
`,
    template: `
      <div class="space-y-4 max-w-2xl bg-white border p-6 rounded-xl shadow-sm">
        <p-paginator
          [first]="first()"
          [rows]="rows()"
          [totalRecords]="120"
          [rowsPerPageOptions]="[10, 20, 30]"
          (onPageChange)="onPageChange($event)"
        />
        <p class="text-xs text-slate-400 text-center">Displaying records <strong class="text-amber-400">{{ first() + 1 }} - {{ first() + rows() }}</strong> of 120</p>
      </div>
`
  },

  'virtual-scroller': {
    className: 'VirtualScrollerShowcaseComponent',
    title: 'Virtual Scroller',
    desc: 'PrimeNG Scroller rendering large lists with DOM recycling.',
    imports: [
      "import { Scroller } from 'primeng/scroller';"
    ],
    componentCode: `
  items = Array.from({ length: 1000 }).map((_, i) => ({
    id: i + 1,
    name: 'Benchmark Record #' + (i + 1),
    latency: (Math.random() * 40 + 10).toFixed(1) + ' ms'
  }));
`,
    template: `
      <div class="max-w-md bg-white border rounded-xl overflow-hidden shadow-sm">
        <p-scroller
          [items]="items"
          [itemSize]="48"
          scrollHeight="300px"
          class="w-full"
        >
          <ng-template #item let-item let-options="options">
            <div class="p-3 border-b flex justify-between items-center" [class.bg-slate-900]="options.odd">
              <span class="font-medium text-sm text-slate-100">{{ item.name }}</span>
              <span class="text-xs font-mono text-amber-400 font-bold">{{ item.latency }}</span>
            </div>
          </ng-template>
        </p-scroller>
      </div>
`
  },

  'timeline': {
    className: 'TimelineShowcaseComponent',
    title: 'Timeline',
    desc: 'PrimeNG Timeline displaying chronological pipeline milestones.',
    imports: [
      "import { Timeline } from 'primeng/timeline';",
      "import { Card } from 'primeng/card';",
      "import { MOCK_TIMELINE_EVENTS } from '@nx-microfrontends/shared-models';"
    ],
    componentCode: `
  events = MOCK_TIMELINE_EVENTS;
`,
    template: `
      <div class="max-w-2xl">
        <p-timeline [value]="events" align="alternate">
          <ng-template #content let-event>
            <p-card [header]="event.status" [subheader]="event.date">
              <p class="text-xs text-slate-400">{{ event.description }}</p>
            </p-card>
          </ng-template>
        </p-timeline>
      </div>
`
  },

  'accordion': {
    className: 'AccordionShowcaseComponent',
    title: 'Accordion',
    desc: 'PrimeNG Accordion panels with animated disclosure.',
    imports: [
      "import { AccordionModule } from 'primeng/accordion';"
    ],
    componentCode: ``,
    template: `
      <div class="max-w-2xl">
        <p-accordion value="0">
          <p-accordion-panel value="0">
            <p-accordion-header>What is PrimeNG Aura Preset?</p-accordion-header>
            <p-accordion-content>
              <p class="text-sm text-slate-300">Aura is the next-generation default design system preset for PrimeNG 18+ featuring seamless CSS layer integration.</p>
            </p-accordion-content>
          </p-accordion-panel>
          <p-accordion-panel value="1">
            <p-accordion-header>How does Tailwind CSS layer with PrimeNG?</p-accordion-header>
            <p-accordion-content>
              <p class="text-sm text-slate-300">Via <code>order: 'tailwind-base, primeng, tailwind-utilities'</code> which prevents Tailwind overrides from clashing.</p>
            </p-accordion-content>
          </p-accordion-panel>
        </p-accordion>
      </div>
`
  },

  'card': {
    className: 'CardShowcaseComponent',
    title: 'Card',
    desc: 'PrimeNG Card container with header, body, and action footer.',
    imports: [
      "import { Card } from 'primeng/card';",
      "import { Button } from 'primeng/button';"
    ],
    componentCode: ``,
    template: `
      <div class="max-w-md">
        <p-card header="PrimeNG Microfrontend" subheader="Port 4202 • Aura Theme">
          <p class="text-sm text-slate-300 mb-4">
            Showcasing over 60 high-performance enterprise UI components running in an isolated Native Federation bundle.
          </p>
          <ng-template #footer>
            <div class="flex gap-2 justify-end">
              <p-button label="Benchmark" size="small" />
              <p-button label="Inspect" severity="secondary" size="small" />
            </div>
          </ng-template>
        </p-card>
      </div>
`
  },

  'divider': {
    className: 'DividerShowcaseComponent',
    title: 'Divider',
    desc: 'PrimeNG Divider in horizontal, vertical, and centered badge configurations.',
    imports: [
      "import { Divider } from 'primeng/divider';"
    ],
    componentCode: ``,
    template: `
      <div class="space-y-6 max-w-xl">
        <div>
          <span class="text-sm text-slate-400">Section A</span>
          <p-divider />
          <span class="text-sm text-slate-400">Section B</span>
        </div>

        <p-divider align="center">
          <span class="text-xs font-bold px-3 py-1 bg-amber-50 text-amber-800 border rounded-full">OR</span>
        </p-divider>
      </div>
`
  },

  'fieldset': {
    className: 'FieldsetShowcaseComponent',
    title: 'Fieldset',
    desc: 'PrimeNG collapsible Fieldset container.',
    imports: [
      "import { Fieldset } from 'primeng/fieldset';"
    ],
    componentCode: ``,
    template: `
      <div class="max-w-xl">
        <p-fieldset legend="Federation Config" [toggleable]="true">
          <p class="text-sm text-slate-300">
            Remotes expose <code>./Routes</code> and <code>./Component</code> using <code>@angular-architects/native-federation</code>.
          </p>
        </p-fieldset>
      </div>
`
  },

  'panel': {
    className: 'PanelShowcaseComponent',
    title: 'Panel',
    desc: 'PrimeNG Panel with collapsible toggle and header actions.',
    imports: [
      "import { Panel } from 'primeng/panel';"
    ],
    componentCode: ``,
    template: `
      <div class="max-w-xl">
        <p-panel header="Performance Metrics Collector" [toggleable]="true">
          <p class="text-sm text-slate-300">
            Captures Web Vitals (LCP, CLS, FID/INP) and broadcasts across microfrontends using standard BroadcastChannel APIs.
          </p>
        </p-panel>
      </div>
`
  },

  'scroll-panel': {
    className: 'ScrollPanelShowcaseComponent',
    title: 'ScrollPanel',
    desc: 'PrimeNG ScrollPanel with customized smooth scrollbars.',
    imports: [
      "import { ScrollPanel } from 'primeng/scrollpanel';"
    ],
    componentCode: ``,
    template: `
      <div class="max-w-md bg-white border rounded-xl overflow-hidden shadow-sm">
        <p-scrollpanel [style]="{ width: '100%', height: '200px' }">
          <div class="p-4 space-y-3 text-sm text-slate-300">
            <h4 class="font-bold text-white">Scrollable Metrics Log</h4>
            @for (idx of [1, 2, 3, 4, 5, 6, 7, 8]; track idx) {
              <p>Log entry #{{ idx }}: Render duration measured at {{ 12 + idx }}ms. Memory allocation normal.</p>
            }
          </div>
        </p-scrollpanel>
      </div>
`
  },

  'splitter': {
    className: 'SplitterShowcaseComponent',
    title: 'Splitter',
    desc: 'PrimeNG Splitter with resizable panels.',
    imports: [
      "import { Splitter } from 'primeng/splitter';"
    ],
    componentCode: ``,
    template: `
      <div class="max-w-2xl border rounded-xl overflow-hidden shadow-sm">
        <p-splitter [style]="{ height: '200px' }">
          <ng-template #panel>
            <div class="p-6 flex items-center justify-center font-bold text-slate-200 bg-slate-900 h-full">
              Left Pane (50%)
            </div>
          </ng-template>
          <ng-template #panel>
            <div class="p-6 flex items-center justify-center font-bold text-amber-400 bg-white h-full">
              Right Pane (50%)
            </div>
          </ng-template>
        </p-splitter>
      </div>
`
  },

  'stepper': {
    className: 'StepperShowcaseComponent',
    title: 'Stepper',
    desc: 'PrimeNG Stepper wizard workflow.',
    imports: [
      "import { StepperModule } from 'primeng/stepper';",
      "import { Button } from 'primeng/button';"
    ],
    componentCode: ``,
    template: `
      <div class="max-w-xl bg-white border p-6 rounded-xl shadow-sm">
        <p-stepper [value]="1">
          <p-step-list>
            <p-step [value]="1">Target</p-step>
            <p-step [value]="2">Parameters</p-step>
            <p-step [value]="3">Results</p-step>
          </p-step-list>
          <p-step-panels>
            <p-step-panel [value]="1">
              <ng-template #content let-activateCallback="activateCallback">
                <div class="py-4 text-sm text-slate-300">Step 1: Select Microfrontend Target</div>
                <p-button label="Next" (onClick)="activateCallback(2)" size="small" />
              </ng-template>
            </p-step-panel>
            <p-step-panel [value]="2">
              <ng-template #content let-activateCallback="activateCallback">
                <div class="py-4 text-sm text-slate-300">Step 2: Configure Concurrency & Iterations</div>
                <div class="flex gap-2">
                  <p-button label="Back" (onClick)="activateCallback(1)" severity="secondary" size="small" />
                  <p-button label="Next" (onClick)="activateCallback(3)" size="small" />
                </div>
              </ng-template>
            </p-step-panel>
            <p-step-panel [value]="3">
              <ng-template #content let-activateCallback="activateCallback">
                <div class="py-4 text-sm text-slate-300">Step 3: Ready to Run Benchmark</div>
                <p-button label="Execute" severity="success" size="small" />
              </ng-template>
            </p-step-panel>
          </p-step-panels>
        </p-stepper>
      </div>
`
  },

  'tab-view': {
    className: 'TabViewShowcaseComponent',
    title: 'Tabs (TabView)',
    desc: 'PrimeNG modern Tabs component with responsive panels.',
    imports: [
      "import { TabsModule } from 'primeng/tabs';"
    ],
    componentCode: ``,
    template: `
      <div class="max-w-2xl bg-white border rounded-xl p-4 shadow-sm">
        <p-tabs value="0">
          <p-tablist>
            <p-tab value="0">Overview</p-tab>
            <p-tab value="1">Lighthouse</p-tab>
            <p-tab value="2">Playwright</p-tab>
          </p-tablist>
          <p-tabpanels>
            <p-tabpanel value="0">
              <p class="text-sm text-slate-300 py-2">PrimeNG provides enterprise UI controls styled with Aura theme tokens.</p>
            </p-tabpanel>
            <p-tabpanel value="1">
              <p class="text-sm text-slate-300 py-2">Lighthouse budget threshold: &gt; 90 Performance score.</p>
            </p-tabpanel>
            <p-tabpanel value="2">
              <p class="text-sm text-slate-300 py-2">Automated latency and JS heap memory inspection specs.</p>
            </p-tabpanel>
          </p-tabpanels>
        </p-tabs>
      </div>
`
  },

  'toolbar': {
    className: 'ToolbarShowcaseComponent',
    title: 'Toolbar',
    desc: 'PrimeNG Toolbar grouping actions and inputs.',
    imports: [
      "import { Toolbar } from 'primeng/toolbar';",
      "import { Button } from 'primeng/button';",
      "import { InputText } from 'primeng/inputtext';"
    ],
    componentCode: ``,
    template: `
      <div class="max-w-3xl">
        <p-toolbar>
          <ng-template #start>
            <div class="flex gap-2">
              <p-button icon="pi pi-plus" label="New Run" size="small" />
              <p-button icon="pi pi-trash" severity="danger" size="small" />
            </div>
          </ng-template>
          <ng-template #end>
            <div class="flex items-center gap-2">
              <input type="text" pInputText placeholder="Search..." size="small" />
              <p-button icon="pi pi-search" severity="secondary" size="small" />
            </div>
          </ng-template>
        </p-toolbar>
      </div>
`
  },

  'confirm-dialog': {
    className: 'ConfirmDialogShowcaseComponent',
    title: 'ConfirmDialog',
    desc: 'PrimeNG ConfirmDialog triggered programmatically with ConfirmationService.',
    imports: [
      "import { ConfirmDialog } from 'primeng/confirmdialog';",
      "import { Button } from 'primeng/button';",
      "import { ConfirmationService } from 'primeng/api';"
    ],
    providers: ['ConfirmationService'],
    componentCode: `
  private confirmationService = inject(ConfirmationService);

  confirm() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to trigger an automated MFE restart?',
      header: 'Confirm Restart',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // Confirmation accepted
      }
    });
  }
`,
    template: `
      <div class="space-y-4">
        <p-confirmdialog />
        <p-button (onClick)="confirm()" label="Trigger Confirmation" severity="warn" />
      </div>
`
  },

  'dialog': {
    className: 'DialogShowcaseComponent',
    title: 'Dialog',
    desc: 'PrimeNG modal Dialog with custom header, body, and action buttons.',
    imports: [
      "import { Dialog } from 'primeng/dialog';",
      "import { Button } from 'primeng/button';"
    ],
    componentCode: `
  visible = signal(false);

  open() { this.visible.set(true); }
  close() { this.visible.set(false); }
`,
    template: `
      <div class="space-y-4">
        <p-button (onClick)="open()" label="Open PrimeNG Modal" />

        <p-dialog
          header="Benchmark Parameters"
          [visible]="visible()"
          (visibleChange)="visible.set($event)"
          [modal]="true"
          [style]="{ width: '25rem' }"
        >
          <p class="text-sm text-slate-300 mb-4">
            Configuring automated headless browser test run with 5 sample iterations.
          </p>
          <ng-template #footer>
            <p-button label="Cancel" severity="secondary" (onClick)="close()" size="small" />
            <p-button label="Proceed" (onClick)="close()" size="small" />
          </ng-template>
        </p-dialog>
      </div>
`
  },

  'popover': {
    className: 'PopoverShowcaseComponent',
    title: 'Popover',
    desc: 'PrimeNG Popover contextual overlay anchored to buttons.',
    imports: [
      "import { Popover } from 'primeng/popover';",
      "import { Button } from 'primeng/button';"
    ],
    componentCode: ``,
    template: `
      <div class="space-y-4">
        <p-button (onClick)="op.toggle($event)" label="Toggle Details Popover" />

        <p-popover #op>
          <div class="p-3 max-w-xs text-sm space-y-2">
            <h4 class="font-bold text-white">Live MFE Diagnostics</h4>
            <p class="text-xs text-slate-300">Port 4202 responding with status 200 OK. Native Federation modules loaded.</p>
          </div>
        </p-popover>
      </div>
`
  },

  'sidebar': {
    className: 'SidebarShowcaseComponent',
    title: 'Drawer / Sidebar',
    desc: 'PrimeNG Drawer slide-out panel from the edge.',
    imports: [
      "import { Drawer } from 'primeng/drawer';",
      "import { Button } from 'primeng/button';"
    ],
    componentCode: `
  visible = signal(false);

  toggle() { this.visible.set(!this.visible()); }
`,
    template: `
      <div class="space-y-4">
        <p-button (onClick)="toggle()" label="Open Drawer Panel" />

        <p-drawer [visible]="visible()" (visibleChange)="visible.set($event)" header="MFE Navigation Drawer">
          <p class="text-sm text-slate-300">
            Drawer sliding overlay displaying quick actions, configuration, and diagnostics.
          </p>
        </p-drawer>
      </div>
`
  },

  'tooltip': {
    className: 'TooltipShowcaseComponent',
    title: 'Tooltip',
    desc: 'PrimeNG Tooltip directive supporting multiple placement positions.',
    imports: [
      "import { Tooltip } from 'primeng/tooltip';",
      "import { Button } from 'primeng/button';"
    ],
    componentCode: ``,
    template: `
      <div class="flex flex-wrap gap-4 items-center">
        <p-button pTooltip="Top Tooltip Content" tooltipPosition="top" label="Top" size="small" />
        <p-button pTooltip="Bottom Tooltip Content" tooltipPosition="bottom" label="Bottom" size="small" />
        <p-button pTooltip="Left Tooltip Content" tooltipPosition="left" label="Left" size="small" />
        <p-button pTooltip="Right Tooltip Content" tooltipPosition="right" label="Right" size="small" />
      </div>
`
  },

  'breadcrumb': {
    className: 'BreadcrumbShowcaseComponent',
    title: 'Breadcrumb',
    desc: 'PrimeNG Breadcrumb navigation.',
    imports: [
      "import { Breadcrumb } from 'primeng/breadcrumb';",
      "import { MenuItem } from 'primeng/api';"
    ],
    componentCode: `
  home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };
  items: MenuItem[] = [
    { label: 'PrimeNG' },
    { label: 'Component Showcase' },
    { label: 'Breadcrumb' }
  ];
`,
    template: `
      <div class="max-w-xl">
        <p-breadcrumb [home]="home" [model]="items" />
      </div>
`
  },

  'context-menu': {
    className: 'ContextMenuShowcaseComponent',
    title: 'ContextMenu',
    desc: 'PrimeNG ContextMenu attached to a target container.',
    imports: [
      "import { ContextMenu } from 'primeng/contextmenu';",
      "import { MenuItem } from 'primeng/api';"
    ],
    componentCode: `
  items: MenuItem[] = [
    { label: 'Run Benchmark', icon: 'pi pi-play' },
    { label: 'Copy JSON Data', icon: 'pi pi-copy' },
    { separator: true },
    { label: 'Clear Cache', icon: 'pi pi-trash' }
  ];
`,
    template: `
      <div class="max-w-md">
        <p-contextmenu [target]="targetBox" [model]="items" />
        <div #targetBox class="p-12 border-2 border-dashed border-amber-300 rounded-2xl bg-amber-50 text-center cursor-context-menu">
          <span class="font-bold text-amber-900 block">Right-click anywhere in this box</span>
          <span class="text-xs text-amber-400">Triggers PrimeNG ContextMenu</span>
        </div>
      </div>
`
  },

  'menu': {
    className: 'MenuShowcaseComponent',
    title: 'Menu',
    desc: 'PrimeNG Menu with items and submenus.',
    imports: [
      "import { Menu } from 'primeng/menu';",
      "import { MenuItem } from 'primeng/api';"
    ],
    componentCode: `
  items: MenuItem[] = [
    {
      label: 'Performance',
      items: [
        { label: 'Lighthouse Audit', icon: 'pi pi-chart-line' },
        { label: 'Web Vitals Stream', icon: 'pi pi-bolt' }
      ]
    },
    {
      label: 'Tools',
      items: [
        { label: 'Restart Server', icon: 'pi pi-refresh' }
      ]
    }
  ];
`,
    template: `
      <div class="flex gap-8 items-start">
        <div>
          <h4 class="text-sm font-semibold mb-2">Inline Menu</h4>
          <p-menu [model]="items" />
        </div>
      </div>
`
  },

  'menubar': {
    className: 'MenubarShowcaseComponent',
    title: 'Menubar',
    desc: 'PrimeNG top navigation Menubar with nested items.',
    imports: [
      "import { Menubar } from 'primeng/menubar';",
      "import { InputText } from 'primeng/inputtext';",
      "import { MenuItem } from 'primeng/api';"
    ],
    componentCode: `
  items: MenuItem[] = [
    { label: 'Dashboard', icon: 'pi pi-home' },
    {
      label: 'Showcases',
      icon: 'pi pi-box',
      items: [
        { label: 'Data Table' },
        { label: 'Dropdown' },
        { label: 'Slider' }
      ]
    },
    { label: 'Benchmarks', icon: 'pi pi-chart-bar' }
  ];
`,
    template: `
      <div class="max-w-3xl">
        <p-menubar [model]="items">
          <ng-template #end>
            <input type="text" pInputText placeholder="Search..." size="small" />
          </ng-template>
        </p-menubar>
      </div>
`
  },

  'mega-menu': {
    className: 'MegaMenuShowcaseComponent',
    title: 'MegaMenu',
    desc: 'PrimeNG multi-column MegaMenu.',
    imports: [
      "import { MegaMenu } from 'primeng/megamenu';",
      "import { MegaMenuItem } from 'primeng/api';"
    ],
    componentCode: `
  items: MegaMenuItem[] = [
    {
      label: 'Components',
      icon: 'pi pi-box',
      items: [
        [
          {
            label: 'Form Controls',
            items: [{ label: 'AutoComplete' }, { label: 'DatePicker' }, { label: 'Slider' }]
          }
        ],
        [
          {
            label: 'Data Display',
            items: [{ label: 'Table' }, { label: 'Tree' }, { label: 'Timeline' }]
          }
        ]
      ]
    }
  ];
`,
    template: `
      <div class="max-w-2xl">
        <p-megamenu [model]="items" />
      </div>
`
  },

  'tab-menu': {
    className: 'TabMenuShowcaseComponent',
    title: 'TabMenu / Navigation Tabs',
    desc: 'PrimeNG navigation tabs with icons and active states.',
    imports: [
      "import { TabsModule } from 'primeng/tabs';"
    ],
    componentCode: ``,
    template: `
      <div class="max-w-xl bg-white border rounded-xl p-4 shadow-sm">
        <p-tabs value="0">
          <p-tablist>
            <p-tab value="0"><i class="pi pi-home mr-2"></i>Home</p-tab>
            <p-tab value="1"><i class="pi pi-chart-line mr-2"></i>Performance</p-tab>
            <p-tab value="2"><i class="pi pi-cog mr-2"></i>Settings</p-tab>
          </p-tablist>
        </p-tabs>
      </div>
`
  },

  'speed-dial': {
    className: 'SpeedDialShowcaseComponent',
    title: 'SpeedDial',
    desc: 'PrimeNG SpeedDial floating action button with expandable menu actions.',
    imports: [
      "import { SpeedDial } from 'primeng/speeddial';",
      "import { MenuItem } from 'primeng/api';"
    ],
    componentCode: `
  items: MenuItem[] = [
    { icon: 'pi pi-pencil' },
    { icon: 'pi pi-refresh' },
    { icon: 'pi pi-trash' }
  ];
`,
    template: `
      <div class="relative h-48 max-w-sm border rounded-2xl p-6 bg-slate-900 flex items-end justify-end">
        <p-speeddial [model]="items" direction="up" [style]="{ position: 'relative' }" />
      </div>
`
  },

  'message': {
    className: 'MessageShowcaseComponent',
    title: 'Message',
    desc: 'PrimeNG inline Message banners for notification severities.',
    imports: [
      "import { Message } from 'primeng/message';"
    ],
    componentCode: ``,
    template: `
      <div class="space-y-3 max-w-xl">
        <p-message severity="info" text="Information: Native Federation loads ES modules on demand." />
        <p-message severity="success" text="Success: PrimeNG Aura theme loaded with CSS layer precedence." />
        <p-message severity="warn" text="Warning: Port 4202 is dedicated to this microfrontend." />
        <p-message severity="error" text="Error: High LCP latency threshold alert." />
      </div>
`
  },

  'toast': {
    className: 'ToastShowcaseComponent',
    title: 'Toast',
    desc: 'PrimeNG Toast popup notifications via MessageService.',
    imports: [
      "import { Toast } from 'primeng/toast';",
      "import { Button } from 'primeng/button';",
      "import { MessageService } from 'primeng/api';"
    ],
    providers: ['MessageService'],
    componentCode: `
  private messageService = inject(MessageService);

  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Benchmark Complete', detail: 'PrimeNG table rendered in 14ms' });
  }
  showInfo() {
    this.messageService.add({ severity: 'info', summary: 'Live Stream', detail: 'Connected to BroadcastChannel' });
  }
`,
    template: `
      <div class="space-y-4">
        <p-toast />
        <div class="flex gap-3">
          <p-button (onClick)="showSuccess()" label="Show Success Toast" severity="success" />
          <p-button (onClick)="showInfo()" label="Show Info Toast" severity="info" />
        </div>
      </div>
`
  },

  'badge': {
    className: 'BadgeShowcaseComponent',
    title: 'Badge',
    desc: 'PrimeNG Badge standalone and button overlay badges.',
    imports: [
      "import { Badge } from 'primeng/badge';",
      "import { Button } from 'primeng/button';"
    ],
    componentCode: ``,
    template: `
      <div class="space-y-6">
        <div class="flex items-center gap-3">
          <p-badge value="New" severity="success" />
          <p-badge value="5" severity="info" />
          <p-badge value="Alert" severity="danger" />
        </div>
        <div class="flex gap-4">
          <p-button label="Notifications" badge="8" severity="secondary" />
          <p-button label="Messages" badge="2" badgeSeverity="contrast" />
        </div>
      </div>
`
  },

  'progress-bar': {
    className: 'ProgressBarShowcaseComponent',
    title: 'ProgressBar',
    desc: 'PrimeNG ProgressBar in determinate and indeterminate states.',
    imports: [
      "import { ProgressBar } from 'primeng/progressbar';"
    ],
    componentCode: `
  val = signal(70);
`,
    template: `
      <div class="space-y-6 max-w-xl">
        <div class="space-y-2">
          <span class="text-sm font-semibold text-slate-200">Determinate ({{ val() }}%)</span>
          <p-progressbar [value]="val()" />
        </div>

        <div class="space-y-2">
          <span class="text-sm font-semibold text-slate-200">Indeterminate</span>
          <p-progressbar mode="indeterminate" [style]="{ height: '6px' }" />
        </div>
      </div>
`
  },

  'progress-spinner': {
    className: 'ProgressSpinnerShowcaseComponent',
    title: 'ProgressSpinner',
    desc: 'PrimeNG circular animated ProgressSpinner.',
    imports: [
      "import { ProgressSpinner } from 'primeng/progressspinner';"
    ],
    componentCode: ``,
    template: `
      <div class="flex items-center gap-6">
        <p-progress-spinner strokeWidth="4" [style]="{ width: '40px', height: '40px' }" />
        <p-progress-spinner strokeWidth="3" [style]="{ width: '60px', height: '60px' }" />
      </div>
`
  },

  'skeleton': {
    className: 'SkeletonShowcaseComponent',
    title: 'Skeleton',
    desc: 'PrimeNG Skeleton placeholders for cards, avatars, and text.',
    imports: [
      "import { Skeleton } from 'primeng/skeleton';"
    ],
    componentCode: ``,
    template: `
      <div class="max-w-sm bg-white border p-6 rounded-2xl shadow-sm space-y-4">
        <div class="flex items-center gap-3">
          <p-skeleton shape="circle" size="3rem" />
          <div class="space-y-2 flex-1">
            <p-skeleton width="70%" />
            <p-skeleton width="40%" />
          </div>
        </div>
        <p-skeleton width="100%" height="80px" />
      </div>
`
  },

  'tag': {
    className: 'TagShowcaseComponent',
    title: 'Tag',
    desc: 'PrimeNG status Tags with icons and severities.',
    imports: [
      "import { Tag } from 'primeng/tag';"
    ],
    componentCode: ``,
    template: `
      <div class="flex flex-wrap gap-2">
        <p-tag value="In Stock" severity="success" icon="pi pi-check" />
        <p-tag value="Low Stock" severity="warn" icon="pi pi-exclamation-triangle" />
        <p-tag value="Out of Stock" severity="danger" icon="pi pi-times" />
        <p-tag value="Processing" severity="info" icon="pi pi-refresh" />
      </div>
`
  },

  'avatar': {
    className: 'AvatarShowcaseComponent',
    title: 'Avatar',
    desc: 'PrimeNG Avatar with initials, icons, and AvatarGroup.',
    imports: [
      "import { Avatar } from 'primeng/avatar';",
      "import { AvatarGroup } from 'primeng/avatargroup';"
    ],
    componentCode: ``,
    template: `
      <div class="space-y-6">
        <div class="flex items-center gap-4">
          <p-avatar label="P" size="large" shape="circle" styleClass="bg-amber-500 text-white" />
          <p-avatar icon="pi pi-user" size="large" shape="circle" styleClass="bg-emerald-500 text-white" />
          <p-avatar label="NX" size="xlarge" shape="square" styleClass="bg-indigo-600 text-white" />
        </div>

        <div>
          <h4 class="text-sm font-semibold text-slate-200 mb-2">Avatar Group</h4>
          <p-avatargroup>
            <p-avatar label="A" shape="circle" styleClass="bg-blue-500 text-white" />
            <p-avatar label="B" shape="circle" styleClass="bg-purple-500 text-white" />
            <p-avatar label="+3" shape="circle" styleClass="bg-gray-200 text-slate-100" />
          </p-avatargroup>
        </div>
      </div>
`
  },

  'ripple': {
    className: 'RippleShowcaseComponent',
    title: 'Ripple',
    desc: 'PrimeNG Ripple animation effect on click.',
    imports: [
      "import { Ripple } from 'primeng/ripple';",
      "import { Button } from 'primeng/button';"
    ],
    componentCode: ``,
    template: `
      <div class="space-y-4">
        <p-button pRipple label="Click for Ripple Effect" />
        <div pRipple class="p-6 border rounded-xl bg-amber-50 text-amber-900 font-bold text-center cursor-pointer select-none">
          Card with PrimeNG Ripple Effect
        </div>
      </div>
`
  },

  'image': {
    className: 'ImageShowcaseComponent',
    title: 'Image',
    desc: 'PrimeNG Image with zoom and preview overlay modal.',
    imports: [
      "import { Image } from 'primeng/image';"
    ],
    componentCode: ``,
    template: `
      <div class="max-w-xs">
        <p-image
          src="https://primefaces.org/cdn/primeng/images/galleria/galleria10.jpg"
          alt="Showcase Image"
          width="250"
          [preview]="true"
        />
        <p class="text-xs text-slate-400 mt-2">Click image to open full-resolution preview</p>
      </div>
`
  },

  'galleria': {
    className: 'GalleriaShowcaseComponent',
    title: 'Galleria',
    desc: 'PrimeNG Galleria carousel with thumbnail preview.',
    imports: [
      "import { Galleria } from 'primeng/galleria';"
    ],
    componentCode: `
  images = [
    {
      itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria1.jpg',
      thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria1s.jpg',
      alt: 'Image 1'
    },
    {
      itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria2.jpg',
      thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria2s.jpg',
      alt: 'Image 2'
    }
  ];
`,
    template: `
      <div class="max-w-lg">
        <p-galleria
          [value]="images"
          [numVisible]="2"
          [circular]="true"
          [showItemNavigators]="true"
          [showThumbnails]="false"
        >
          <ng-template #item let-item>
            <img [src]="item.itemImageSrc" [alt]="item.alt" class="w-full rounded-xl" />
          </ng-template>
        </p-galleria>
      </div>
`
  }
};

for (const [slug, def] of Object.entries(showcases)) {
  const dirPath = path.join(basePath, slug);
  fs.mkdirSync(dirPath, { recursive: true });

  const coreImports = ['Component', 'ChangeDetectionStrategy'];
  if (def.componentCode.includes('signal')) coreImports.push('signal');
  if (def.componentCode.includes('inject(')) coreImports.push('inject');

  const importsList = [
    `import { ${coreImports.join(', ')} } from '@angular/core';`,
    "import { CommonModule } from '@angular/common';",
    "import { RouterLink } from '@angular/router';",
    ...def.imports
  ].join('\n');

  const componentImports = [
    'CommonModule',
    'RouterLink',
    ...def.imports.flatMap(imp => {
      const match = imp.match(/import\s+{([^}]+)}/);
      if (!match) return [];
      return match[1].split(',').map(s => s.trim().split(' as ')[0].split(' ')[0]).filter(s => !s.endsWith('Event') && !s.endsWith('Service') && !s.endsWith('Item') && !s.endsWith('State') && !s.endsWith('Node') && !s.startsWith('MOCK_'));
    })
  ];
  const uniqueComponentImports = Array.from(new Set(componentImports)).join(', ');

  const providersDecl = def.providers && def.providers.length > 0
    ? `  providers: [${def.providers.join(', ')}],`
    : '';

  const code = `${importsList}

@Component({
  selector: 'app-${slug}-showcase',
  standalone: true,
  imports: [${uniqueComponentImports}],
${providersDecl}
  template: \`
    <div class="p-6 max-w-5xl text-slate-100">
      <div class="mb-6">
        <a routerLink="/primeng" class="inline-flex items-center gap-2 text-sm font-semibold text-amber-400 hover:text-amber-300 mb-3 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors w-fit">
          <span>&larr;</span> Back to PrimeNG Showcases
        </a>
        <h2 class="text-2xl font-bold text-white mb-1">${def.title}</h2>
        <p class="text-sm text-slate-400">${def.desc}</p>
      </div>
      
      <div class="card bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-700 text-slate-100">
        ${def.template}
      </div>
    </div>
  \`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ${def.className} {
${def.componentCode}
}
`;

  fs.writeFileSync(path.join(dirPath, `${slug}.component.ts`), code, 'utf-8');
}

console.log('Successfully updated all 61 PrimeNG showcase components with full a11y and Angular 22 inject API!');
