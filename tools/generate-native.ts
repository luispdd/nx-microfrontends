import * as fs from 'fs';
import * as path from 'path';

const basePath = path.resolve('apps/mfe-native/src/app/showcase');

const nativeShowcases: Record<string, { className: string; title: string; desc: string; template: string; componentCode: string }> = {
  'text-input': {
    className: 'TextInputComponent',
    title: 'Text Input',
    desc: 'Native HTML text input variants with Tailwind CSS styling, validation states, icons, and reactive signals.',
    componentCode: `
  textValue = signal('');
  username = signal('john_doe');
  searchQuery = signal('');
  hasError = signal(false);

  updateText(e: Event) {
    this.textValue.set((e.target as HTMLInputElement).value);
  }
  updateSearch(e: Event) {
    this.searchQuery.set((e.target as HTMLInputElement).value);
  }
  clearSearch() {
    this.searchQuery.set('');
  }
  toggleError() {
    this.hasError.set(!this.hasError());
  }
`,
    template: `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Standard text input -->
        <div class="space-y-2">
          <label for="std-text-input" class="block text-sm font-semibold text-slate-200">Standard Text Input</label>
          <input
            id="std-text-input"
            type="text"
            placeholder="Enter your full name"
            [value]="textValue()"
            (input)="updateText($event)"
            class="w-full px-4 py-2.5 rounded-lg border border-slate-700 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors shadow-sm outline-none text-white"
          />
          <p class="text-xs text-slate-400">Live value: <span class="font-mono text-emerald-400 font-semibold">{{ textValue() || '(empty)' }}</span></p>
        </div>

        <!-- Input with leading icon and clear button -->
        <div class="space-y-2">
          <label for="search-input" class="block text-sm font-semibold text-slate-200">Search with Clear Button</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <input
              id="search-input"
              type="text"
              placeholder="Search components..."
              [value]="searchQuery()"
              (input)="updateSearch($event)"
              class="w-full pl-10 pr-10 py-2.5 rounded-lg border border-slate-700 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors shadow-sm outline-none text-white"
            />
            @if (searchQuery()) {
              <button
                type="button"
                aria-label="Clear search"
                (click)="clearSearch()"
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-300 transition"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            }
          </div>
          <p class="text-xs text-slate-400">Query: <span class="font-mono text-emerald-400">{{ searchQuery() || '(none)' }}</span></p>
        </div>

        <!-- Validation state toggleable -->
        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <label for="val-username-input" class="block text-sm font-semibold text-slate-200">Validation State</label>
            <button type="button" (click)="toggleError()" class="text-xs text-emerald-600 hover:underline">Toggle Error State</button>
          </div>
          <input
            id="val-username-input"
            type="text"
            [value]="username()"
            [class.border-red-500]="hasError()"
            [class.focus:ring-red-400]="hasError()"
            [class.border-slate-700]="!hasError()"
            [class.focus:ring-emerald-500]="!hasError()"
            class="w-full px-4 py-2.5 rounded-lg border shadow-sm outline-none transition-colors"
          />
          @if (hasError()) {
            <p class="text-xs text-red-600 flex items-center gap-1">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
              Username is already taken. Please choose another.
            </p>
          } @else {
            <p class="text-xs text-emerald-600 flex items-center gap-1">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
              Username is available.
            </p>
          }
        </div>

        <!-- Disabled input -->
        <div class="space-y-2">
          <label for="disabled-input" class="block text-sm font-semibold text-slate-400">Disabled Input</label>
          <input
            id="disabled-input"
            type="text"
            value="System generated ID: #SYS-99420"
            disabled
            class="w-full px-4 py-2.5 rounded-lg border border-slate-700 bg-slate-800 text-slate-400 cursor-not-allowed shadow-none"
          />
          <p class="text-xs text-slate-400">Read-only system field</p>
        </div>
      </div>
`
  },

  'number-input': {
    className: 'NumberInputComponent',
    title: 'Number Input',
    desc: 'Native HTML number inputs with min/max, step increments, and custom stepper button controls.',
    componentCode: `
  count = signal(3);
  amount = signal(150.00);

  increment() {
    this.count.update(c => Math.min(20, c + 1));
  }
  decrement() {
    this.count.update(c => Math.max(1, c - 1));
  }
  updateAmount(e: Event) {
    this.amount.set(parseFloat((e.target as HTMLInputElement).value) || 0);
  }
`,
    template: `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="space-y-3">
          <span class="block text-sm font-semibold text-slate-200">Custom Counter Control</span>
          <div class="inline-flex items-center border border-slate-700 rounded-lg shadow-sm overflow-hidden bg-slate-900">
            <button
              type="button"
              aria-label="Decrement count"
              (click)="decrement()"
              class="px-4 py-2.5 bg-slate-900/60 hover:bg-slate-800 text-slate-200 font-bold border-r border-slate-700 transition"
            >-</button>
            <span class="w-16 text-center font-bold text-white">{{ count() }}</span>
            <button
              type="button"
              aria-label="Increment count"
              (click)="increment()"
              class="px-4 py-2.5 bg-slate-900/60 hover:bg-slate-800 text-slate-200 font-bold border-l border-slate-700 transition"
            >+</button>
          </div>
          <p class="text-xs text-slate-400">Quantity (min: 1, max: 20): <span class="font-semibold text-emerald-400">{{ count() }} items</span></p>
        </div>

        <div class="space-y-3">
          <label for="currency-input" class="block text-sm font-semibold text-slate-200">Currency / Decimal Input</label>
          <div class="relative max-w-xs">
            <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 font-medium">$</span>
            <input
              id="currency-input"
              type="number"
              step="0.50"
              min="0"
              [value]="amount()"
              (input)="updateAmount($event)"
              class="w-full pl-8 pr-4 py-2.5 rounded-lg border border-slate-700 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-white"
            />
          </div>
          <p class="text-xs text-slate-400">Total with 8% Tax: <span class="font-bold text-emerald-800">{{ (amount() * 1.08).toFixed(2) }} USD</span></p>
        </div>
      </div>
`
  },

  'textarea': {
    className: 'TextareaComponent',
    title: 'Textarea',
    desc: 'Multi-line native textarea with live character counter, placeholder hints, and reactive signal feedback.',
    componentCode: `
  content = signal('Angular 22 Native HTML components provide zero-overhead performance comparison.');
  maxLength = 200;

  updateContent(e: Event) {
    this.content.set((e.target as HTMLTextAreaElement).value);
  }
`,
    template: `
      <div class="max-w-xl space-y-3">
        <label for="demo-textarea" class="block text-sm font-semibold text-slate-200">Message / Comments</label>
        <textarea
          id="demo-textarea"
          rows="4"
          [attr.maxlength]="maxLength"
          [value]="content()"
          (input)="updateContent($event)"
          placeholder="Share your benchmark observations..."
          class="w-full px-4 py-3 rounded-xl border border-slate-700 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors shadow-sm outline-none text-white resize-y"
        ></textarea>
        <div class="flex justify-between text-xs text-slate-400">
          <span>Markdown supported</span>
          <span [class.text-amber-600]="content().length > 170" [class.text-red-600]="content().length >= maxLength" class="font-mono">
            {{ content().length }} / {{ maxLength }} characters
          </span>
        </div>
      </div>
`
  },

  'checkbox': {
    className: 'CheckboxComponent',
    title: 'Checkbox',
    desc: 'Native HTML checkboxes with customized Tailwind styling, multiple selection groups, and states.',
    componentCode: `
  acceptedTerms = signal(false);
  selectedFeatures = signal<string[]>(['fast', 'accessible']);

  toggleFeature(feature: string) {
    const curr = this.selectedFeatures();
    if (curr.includes(feature)) {
      this.selectedFeatures.set(curr.filter(f => f !== feature));
    } else {
      this.selectedFeatures.set([...curr, feature]);
    }
  }
  isFeatureSelected(feature: string) {
    return this.selectedFeatures().includes(feature);
  }
`,
    template: `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Single Checkbox -->
        <div class="space-y-4">
          <h3 class="font-semibold text-slate-100">Single Agreement Checkbox</h3>
          <label class="flex items-start gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              [checked]="acceptedTerms()"
              (change)="acceptedTerms.set(!acceptedTerms())"
              class="w-5 h-5 mt-0.5 rounded border-slate-700 text-emerald-600 focus:ring-emerald-500 cursor-pointer accent-emerald-600"
            />
            <div>
              <span class="text-sm font-medium text-white">Accept Terms and Conditions</span>
              <p class="text-xs text-slate-400">Agree to execute automated microfrontend benchmarking protocols.</p>
            </div>
          </label>
          <div class="text-xs text-slate-300">Status: <span class="font-bold" [class.text-emerald-600]="acceptedTerms()">{{ acceptedTerms() ? 'Accepted' : 'Not Accepted' }}</span></div>
        </div>

        <!-- Checkbox Group -->
        <div class="space-y-4">
          <h3 class="font-semibold text-slate-100">Feature Selection Group</h3>
          <div class="space-y-2">
            @for (opt of [
              { id: 'fast', label: 'Zero Runtime JS Overhead' },
              { id: 'accessible', label: 'WAI-ARIA Semantic Markup' },
              { id: 'tailwind', label: 'Tailwind Utility Layer' }
            ]; track opt.id) {
              <label class="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-slate-900/60 transition select-none">
                <input
                  type="checkbox"
                  [checked]="isFeatureSelected(opt.id)"
                  (change)="toggleFeature(opt.id)"
                  class="w-4 h-4 rounded text-emerald-600 accent-emerald-600 focus:ring-emerald-500 cursor-pointer"
                />
                <span class="text-sm text-slate-100">{{ opt.label }}</span>
              </label>
            }
          </div>
          <p class="text-xs text-slate-400">Selected: <span class="font-mono text-emerald-400">{{ selectedFeatures().join(', ') || 'None' }}</span></p>
        </div>
      </div>
`
  },

  'radio': {
    className: 'RadioComponent',
    title: 'Radio Buttons',
    desc: 'Native HTML radio inputs styled with card layout and selection highlights.',
    componentCode: `
  selectedPlan = signal<string>('pro');

  setPlan(plan: string) {
    this.selectedPlan.set(plan);
  }
`,
    template: `
      <div class="space-y-4 max-w-xl">
        <span class="block text-sm font-semibold text-slate-200">Select Architecture Profile</span>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          @for (item of [
            { id: 'basic', name: 'Micro', desc: 'Minimal footprint', price: 'Free' },
            { id: 'pro', name: 'Standard', desc: 'Optimal benchmark', price: 'Fast' },
            { id: 'enterprise', name: 'Enterprise', desc: 'Full federation', price: 'Heavy' }
          ]; track item.id) {
            <label
              [class.border-emerald-600]="selectedPlan() === item.id"
              [class.bg-emerald-50]="selectedPlan() === item.id"
              [class.border-slate-700]="selectedPlan() !== item.id"
              class="flex flex-col p-4 border-2 rounded-xl cursor-pointer hover:border-emerald-400 transition bg-slate-900 shadow-sm"
            >
              <div class="flex items-center justify-between mb-2">
                <input
                  type="radio"
                  name="plan"
                  [value]="item.id"
                  [checked]="selectedPlan() === item.id"
                  (change)="setPlan(item.id)"
                  class="w-4 h-4 text-emerald-600 accent-emerald-600 cursor-pointer"
                />
                <span class="text-xs font-bold px-2 py-0.5 rounded bg-slate-900 border text-slate-200">{{ item.price }}</span>
              </div>
              <span class="font-bold text-white">{{ item.name }}</span>
              <span class="text-xs text-slate-400">{{ item.desc }}</span>
            </label>
          }
        </div>
        <p class="text-xs text-slate-300">Active Profile: <span class="font-mono font-bold text-emerald-400">{{ selectedPlan() }}</span></p>
      </div>
`
  },

  'select': {
    className: 'SelectComponent',
    title: 'Select Dropdown',
    desc: 'Semantic HTML select element using shared mock categories and countries.',
    componentCode: `
  selectedCategory = signal(MOCK_CATEGORIES[0]);
  categories = MOCK_CATEGORIES;
  countries = MOCK_COUNTRIES;

  onSelect(e: Event) {
    this.selectedCategory.set((e.target as HTMLSelectElement).value);
  }
`,
    template: `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="space-y-3">
          <label for="single-select" class="block text-sm font-semibold text-slate-200">Department / Category</label>
          <div class="relative">
            <select
              id="single-select"
              [value]="selectedCategory()"
              (change)="onSelect($event)"
              class="w-full appearance-none bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 pr-10 text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none shadow-sm cursor-pointer"
            >
              @for (cat of categories; track cat) {
                <option [value]="cat">{{ cat }}</option>
              }
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
          <p class="text-xs text-slate-400">Selected: <span class="font-semibold text-emerald-400">{{ selectedCategory() }}</span></p>
        </div>

        <div class="space-y-3">
          <label for="multi-select" class="block text-sm font-semibold text-slate-200">Countries (Multiple)</label>
          <select
            id="multi-select"
            multiple
            size="5"
            class="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none shadow-sm"
          >
            @for (country of countries; track country.code) {
              <option [value]="country.code">{{ country.name }}</option>
            }
          </select>
          <p class="text-xs text-slate-400">Hold Ctrl / Cmd to select multiple options</p>
        </div>
      </div>
`
  },

  'datepicker': {
    className: 'DatepickerComponent',
    title: 'Date & Time Pickers',
    desc: 'Native HTML5 date, time, and datetime-local input elements with Tailwind constraints.',
    componentCode: `
  selectedDate = signal('2026-09-04');
  selectedTime = signal('13:30');

  updateDate(e: Event) {
    this.selectedDate.set((e.target as HTMLInputElement).value);
  }
  updateTime(e: Event) {
    this.selectedTime.set((e.target as HTMLInputElement).value);
  }
`,
    template: `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="space-y-3">
          <label for="html5-date" class="block text-sm font-semibold text-slate-200">Date Picker (HTML5 Date)</label>
          <input
            id="html5-date"
            type="date"
            [value]="selectedDate()"
            (input)="updateDate($event)"
            class="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none shadow-sm cursor-pointer"
          />
          <p class="text-xs text-slate-400">Selected ISO Date: <span class="font-mono font-bold text-emerald-400">{{ selectedDate() }}</span></p>
        </div>

        <div class="space-y-3">
          <label for="html5-time" class="block text-sm font-semibold text-slate-200">Time Picker (HTML5 Time)</label>
          <input
            id="html5-time"
            type="time"
            [value]="selectedTime()"
            (input)="updateTime($event)"
            class="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none shadow-sm cursor-pointer"
          />
          <p class="text-xs text-slate-400">Selected Time: <span class="font-mono font-bold text-emerald-400">{{ selectedTime() }}</span></p>
        </div>
      </div>
`
  },

  'range-slider': {
    className: 'RangeSliderComponent',
    title: 'Range Slider',
    desc: 'Native HTML range slider with live dynamic value display, steps, and responsive styling.',
    componentCode: `
  volume = signal(65);
  stepVal = signal(20);

  updateVolume(e: Event) {
    this.volume.set(parseInt((e.target as HTMLInputElement).value, 10));
  }
  updateStep(e: Event) {
    this.stepVal.set(parseInt((e.target as HTMLInputElement).value, 10));
  }
`,
    template: `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="space-y-4">
          <div class="flex justify-between items-center">
            <label for="continuous-slider" class="block text-sm font-semibold text-slate-200">Continuous Slider</label>
            <span class="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full font-mono">{{ volume() }}%</span>
          </div>
          <input
            id="continuous-slider"
            type="range"
            min="0"
            max="100"
            [value]="volume()"
            (input)="updateVolume($event)"
            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
          />
          <div class="flex justify-between text-xs text-slate-400">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>

        <div class="space-y-4">
          <div class="flex justify-between items-center">
            <label for="stepped-slider" class="block text-sm font-semibold text-slate-200">Stepped Slider (Step = 10)</label>
            <span class="px-2 py-0.5 bg-indigo-100 text-indigo-800 text-xs font-bold rounded-full font-mono">{{ stepVal() }} pts</span>
          </div>
          <input
            id="stepped-slider"
            type="range"
            min="0"
            max="100"
            step="10"
            [value]="stepVal()"
            (input)="updateStep($event)"
            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
          <div class="flex justify-between text-xs text-slate-400">
            <span>0</span>
            <span>50</span>
            <span>100</span>
          </div>
        </div>
      </div>
`
  },

  'color-picker': {
    className: 'ColorPickerComponent',
    title: 'Color Picker',
    desc: 'Native HTML color picker input with live preview swatch and hex color readout.',
    componentCode: `
  selectedColor = signal('#10b981');
  palette = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444', '#111827'];

  updateColor(e: Event) {
    this.selectedColor.set((e.target as HTMLInputElement).value);
  }
  setColor(c: string) {
    this.selectedColor.set(c);
  }
`,
    template: `
      <div class="space-y-6 max-w-lg">
        <div class="flex items-center gap-5">
          <input
            type="color"
            aria-label="Pick color"
            [value]="selectedColor()"
            (input)="updateColor($event)"
            class="w-14 h-14 rounded-xl border border-slate-700 cursor-pointer p-1 bg-slate-900 shadow-sm"
          />
          <div>
            <span class="block text-sm font-semibold text-slate-200">Selected Hex Color</span>
            <span class="font-mono text-lg font-bold text-white">{{ selectedColor() }}</span>
          </div>
        </div>

        <div class="space-y-2">
          <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Quick Presets</span>
          <div class="flex gap-3">
            @for (c of palette; track c) {
              <button
                type="button"
                [attr.aria-label]="'Select preset color ' + c"
                (click)="setColor(c)"
                [style.background-color]="c"
                class="w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 shadow-sm"
                [class.border-gray-900]="selectedColor() === c"
                [class.border-transparent]="selectedColor() !== c"
              ><span class="sr-only">{{ c }}</span></button>
            }
          </div>
        </div>

        <div [style.background-color]="selectedColor()" class="p-6 rounded-xl text-white font-medium shadow-md transition-colors">
          Interactive Live Preview Card styled with {{ selectedColor() }}
        </div>
      </div>
`
  },

  'file-upload': {
    className: 'FileUploadComponent',
    title: 'File Upload',
    desc: 'Native HTML file upload with custom drag-and-drop styling and uploaded files summary.',
    componentCode: `
  files = signal<{ name: string; size: string }[]>([]);

  onFileChange(e: Event) {
    const input = e.target as HTMLInputElement;
    if (input.files) {
      const newFiles = Array.from(input.files).map(f => ({
        name: f.name,
        size: (f.size / 1024).toFixed(1) + ' KB'
      }));
      this.files.set(newFiles);
    }
  }
  clearFiles() {
    this.files.set([]);
  }
`,
    template: `
      <div class="space-y-6 max-w-xl">
        <div class="border-2 border-dashed border-slate-700 hover:border-emerald-500 rounded-2xl p-8 text-center bg-slate-900/60 transition cursor-pointer relative">
          <input
            type="file"
            multiple
            aria-label="Choose file to upload"
            (change)="onFileChange($event)"
            class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div class="space-y-2">
            <svg class="mx-auto h-12 w-12 text-slate-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <div class="text-sm text-slate-300">
              <span class="font-semibold text-emerald-600">Click to upload</span> or drag and drop
            </div>
            <p class="text-xs text-slate-400">JSON, CSV, TSV up to 10MB</p>
          </div>
        </div>

        @if (files().length > 0) {
          <div class="space-y-2">
            <div class="flex justify-between items-center">
              <span class="text-sm font-semibold text-slate-200">Selected Files ({{ files().length }})</span>
              <button type="button" (click)="clearFiles()" class="text-xs text-red-600 hover:underline">Clear all</button>
            </div>
            <ul class="divide-y divide-slate-700 bg-slate-900 rounded-lg border shadow-sm">
              @for (f of files(); track f.name) {
                <li class="p-3 flex justify-between items-center text-sm">
                  <span class="font-medium text-slate-100">{{ f.name }}</span>
                  <span class="text-xs text-slate-400 font-mono">{{ f.size }}</span>
                </li>
              }
            </ul>
          </div>
        }
      </div>
`
  },

  'toggle-switch': {
    className: 'ToggleSwitchComponent',
    title: 'Toggle Switch',
    desc: 'Pure HTML checkbox toggle switch using Tailwind peer-checked CSS transitions.',
    componentCode: `
  notifications = signal(true);
  analytics = signal(true);
  darkMode = signal(false);

  toggleNotif() { this.notifications.set(!this.notifications()); }
  toggleAnalytics() { this.analytics.set(!this.analytics()); }
  toggleDark() { this.darkMode.set(!this.darkMode()); }
`,
    template: `
      <div class="space-y-5 max-w-lg">
        <!-- Switch 1 -->
        <label class="flex items-center justify-between cursor-pointer p-3 rounded-xl border bg-slate-900 shadow-sm hover:border-emerald-300 transition select-none">
          <div>
            <span class="text-sm font-semibold text-white block">Performance Metric Alerts</span>
            <span class="text-xs text-slate-400">Notify when LCP exceeds 2500ms</span>
          </div>
          <div class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" aria-label="Toggle performance alerts" [checked]="notifications()" (change)="toggleNotif()" class="sr-only peer" />
            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-emerald-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-900 after:rounded-full after:h-5 after:w-5 after:transition-all shadow-inner"></div>
          </div>
        </label>

        <!-- Switch 2 -->
        <label class="flex items-center justify-between cursor-pointer p-3 rounded-xl border bg-slate-900 shadow-sm hover:border-emerald-300 transition select-none">
          <div>
            <span class="text-sm font-semibold text-white block">Real-time Web Vitals Stream</span>
            <span class="text-xs text-slate-400">BroadcastChannel metric synchronization</span>
          </div>
          <div class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" aria-label="Toggle web vitals stream" [checked]="analytics()" (change)="toggleAnalytics()" class="sr-only peer" />
            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-emerald-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-900 after:rounded-full after:h-5 after:w-5 after:transition-all shadow-inner"></div>
          </div>
        </label>
      </div>
`
  },

  'datalist': {
    className: 'DatalistComponent',
    title: 'Datalist (Autocomplete)',
    desc: 'Native HTML5 datalist element providing zero-overhead browser auto-completion with shared mock dataset.',
    componentCode: `
  selectedCountry = signal('');
  countries = MOCK_COUNTRIES;

  updateCountry(e: Event) {
    this.selectedCountry.set((e.target as HTMLInputElement).value);
  }
`,
    template: `
      <div class="space-y-4 max-w-lg">
        <label for="country-datalist-input" class="block text-sm font-semibold text-slate-200">Select Country</label>
        <div class="relative">
          <input
            id="country-datalist-input"
            list="countries-list"
            [value]="selectedCountry()"
            (input)="updateCountry($event)"
            placeholder="Search country..."
            class="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-white shadow-sm placeholder-slate-500"
          />
          <datalist id="countries-list">
            @for (country of countries; track country.code) {
              <option [value]="country.name"></option>
            }
          </datalist>
        </div>
        <p class="text-xs text-slate-400">Selected Country: <strong class="font-bold text-emerald-400">{{ selectedCountry() || '(none)' }}</strong></p>
      </div>
`
  },

  'list': {
    className: 'ListComponent',
    title: 'List Group',
    desc: 'Divided, actionable, and rich user lists built with native unordered list elements and Tailwind.',
    componentCode: `
  users = MOCK_TABLE_DATA.slice(0, 5);
`,
    template: `
      <div class="max-w-2xl bg-slate-900 border border-slate-700 rounded-xl shadow-sm overflow-hidden">
        <div class="px-6 py-4 bg-slate-800/80 border-b border-slate-700 font-bold text-white">Top Team Members</div>
        <ul class="divide-y divide-slate-700">
          @for (user of users; track user.id) {
            <li class="p-4 hover:bg-slate-800/50 flex items-center justify-between transition">
              <div>
                <span class="font-semibold text-white block">{{ user.name }}</span>
                <span class="text-xs text-slate-400">{{ user.role }} · {{ user.department }}</span>
              </div>
              <div class="flex items-center gap-3">
                <span class="text-xs font-mono text-emerald-400 font-semibold">&#36;{{ user.salary.toLocaleString() }}</span>
                <span class="px-2 py-0.5 text-xs font-semibold rounded-full uppercase"
                  [class.bg-emerald-950]="user.status === 'active'"
                  [class.text-emerald-400]="user.status === 'active'"
                  [class.bg-amber-950]="user.status === 'pending'"
                  [class.text-amber-400]="user.status === 'pending'"
                  [class.bg-rose-950]="user.status === 'inactive'"
                  [class.text-rose-400]="user.status === 'inactive'">{{ user.status }}</span>
              </div>
            </li>
          }
        </ul>
      </div>
`
  },

  'badge': {
    className: 'BadgeComponent',
    title: 'Badges',
    desc: 'Status badges, indicator dots, and pill labels in multiple colors.',
    componentCode: ``,
    template: `
      <div class="space-y-6">
        <div>
          <h3 class="text-sm font-semibold text-slate-200 mb-3">Color Variants</h3>
          <div class="flex flex-wrap gap-2">
            <span class="px-2.5 py-1 text-xs font-semibold rounded-full bg-slate-800 text-slate-100 border">Default</span>
            <span class="px-2.5 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 border border-blue-200">Info</span>
            <span class="px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">Success</span>
            <span class="px-2.5 py-1 text-xs font-semibold rounded-full bg-amber-100 text-amber-800 border border-amber-200">Warning</span>
            <span class="px-2.5 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800 border border-red-200">Critical</span>
            <span class="px-2.5 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800 border border-purple-200">Benchmark</span>
          </div>
        </div>

        <div>
          <h3 class="text-sm font-semibold text-slate-200 mb-3">Dot Indicators</h3>
          <div class="flex items-center gap-4">
            <span class="flex items-center gap-1.5 text-xs text-slate-300">
              <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Running
            </span>
            <span class="flex items-center gap-1.5 text-xs text-slate-300">
              <span class="w-2 h-2 rounded-full bg-amber-500"></span> Degraded
            </span>
            <span class="flex items-center gap-1.5 text-xs text-slate-300">
              <span class="w-2 h-2 rounded-full bg-red-500"></span> Terminated
            </span>
          </div>
        </div>
      </div>
`
  },

  'tag': {
    className: 'TagComponent',
    title: 'Tags',
    desc: 'Interactive, removable tag chips with add/remove capability driven by Angular signals.',
    componentCode: `
  tags = signal<string[]>(['TypeScript 6', 'Angular 22', 'Native Federation', 'Tailwind v4']);
  newTag = signal('');

  removeTag(t: string) {
    this.tags.update(list => list.filter(item => item !== t));
  }
  addTag() {
    const val = this.newTag().trim();
    if (val && !this.tags().includes(val)) {
      this.tags.update(list => [...list, val]);
      this.newTag.set('');
    }
  }
  updateNewTag(e: Event) {
    this.newTag.set((e.target as HTMLInputElement).value);
  }
`,
    template: `
      <div class="space-y-4 max-w-lg">
        <div class="flex flex-wrap gap-2">
          @for (tag of tags(); track tag) {
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-sm">
              {{ tag }}
              <button type="button" [attr.aria-label]="'Remove tag ' + tag" (click)="removeTag(tag)" class="text-emerald-500 hover:text-emerald-400 font-bold">&times;</button>
            </span>
          }
        </div>
        <div class="flex gap-2">
          <input
            type="text"
            aria-label="New tag name"
            placeholder="Add custom tag..."
            [value]="newTag()"
            (input)="updateNewTag($event)"
            (keydown.enter)="addTag()"
            class="px-3 py-1.5 text-sm rounded-lg border border-slate-700 focus:ring-2 focus:ring-emerald-500 outline-none"
          />
          <button type="button" (click)="addTag()" class="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold transition">Add</button>
        </div>
      </div>
`
  },

  'avatar': {
    className: 'AvatarComponent',
    title: 'Avatar & Avatar Group',
    desc: 'Circular image avatars, gradient initials fallbacks, status indicators, and stacked groups.',
    componentCode: ``,
    template: `
      <div class="space-y-8">
        <div class="flex items-center gap-6">
          <div class="w-12 h-12 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white font-bold shadow">
            JD
          </div>
          <div class="relative">
            <div class="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow">
              AR
            </div>
            <span class="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></span>
          </div>
          <div class="w-16 h-16 rounded-2xl bg-amber-500 flex items-center justify-center text-white font-black text-xl shadow-md">
            NX
          </div>
        </div>

        <div>
          <h3 class="text-sm font-semibold text-slate-200 mb-3">Stacked Avatar Group</h3>
          <div class="flex -space-x-3 overflow-hidden">
            <div class="inline-block h-10 w-10 rounded-full ring-2 ring-white bg-blue-500 text-white flex items-center justify-center font-bold text-xs">M1</div>
            <div class="inline-block h-10 w-10 rounded-full ring-2 ring-white bg-emerald-500 text-white flex items-center justify-center font-bold text-xs">M2</div>
            <div class="inline-block h-10 w-10 rounded-full ring-2 ring-white bg-purple-500 text-white flex items-center justify-center font-bold text-xs">M3</div>
            <div class="inline-block h-10 w-10 rounded-full ring-2 ring-white bg-gray-200 text-slate-200 flex items-center justify-center font-bold text-xs">+5</div>
          </div>
        </div>
      </div>
`
  },

  'card': {
    className: 'CardComponent',
    title: 'Cards',
    desc: 'Responsive cards with headers, action buttons, image banners, and statistics widgets.',
    componentCode: ``,
    template: `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Profile Card -->
        <div class="bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-sm hover:shadow-md transition space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-emerald-400 bg-emerald-50 px-2.5 py-1 rounded-full">Microfrontend #3</span>
            <span class="text-xs text-slate-400 font-mono">Port 4203</span>
          </div>
          <h3 class="text-xl font-bold text-white">Native HTML + Tailwind</h3>
          <p class="text-sm text-slate-300">Zero additional JavaScript UI component library overhead. Direct browser rendering performance baseline.</p>
          <div class="pt-4 border-t border-gray-100 flex justify-between items-center">
            <span class="text-xs text-slate-400">Bundle: <strong class="text-white">319 KB gzip</strong></span>
            <button type="button" class="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition">Inspect</button>
          </div>
        </div>

        <!-- Metric Card -->
        <div class="bg-gradient-to-br from-emerald-600 to-teal-700 text-white rounded-2xl p-6 shadow-md flex flex-col justify-between">
          <div>
            <span class="text-xs uppercase tracking-wider text-emerald-200 font-bold">Largest Contentful Paint</span>
            <div class="text-4xl font-extrabold mt-2">120 ms</div>
          </div>
          <p class="text-xs text-emerald-100 mt-4">Fastest rendering footprint in the comparison monorepo.</p>
        </div>
      </div>
`
  },

  'timeline': {
    className: 'TimelineComponent',
    title: 'Timeline',
    desc: 'Vertical milestone timeline displaying sequential build and benchmark execution phases.',
    componentCode: `
  events = MOCK_TIMELINE_EVENTS;
`,
    template: `
      <div class="max-w-xl">
        <ol class="relative border-l border-emerald-500/40 ml-4 space-y-8">
          @for (event of events; track event.date; let idx = $index) {
            <li class="ml-6">
              <span class="absolute -left-3 flex items-center justify-center w-6 h-6 bg-emerald-600 text-white rounded-full ring-4 ring-slate-800 text-xs font-bold">{{ idx + 1 }}</span>
              <h3 class="font-bold text-white">{{ event.status }}</h3>
              <time class="text-xs text-slate-400">{{ event.date }}</time>
              <p class="text-sm text-slate-300 mt-1">{{ event.description }}</p>
            </li>
          }
        </ol>
      </div>
`
  },

  'accordion': {
    className: 'AccordionComponent',
    title: 'Accordion',
    desc: 'Semantic HTML5 details and summary elements with Tailwind styling and animated disclosures.',
    componentCode: ``,
    template: `
      <div class="max-w-2xl space-y-3">
        <details class="group border border-slate-700 rounded-xl bg-slate-900 p-4 open:shadow-sm transition" open>
          <summary class="flex justify-between items-center font-bold text-white cursor-pointer list-none select-none">
            <span>Why compare Native HTML vs PrimeNG vs Material?</span>
            <span class="transform group-open:rotate-180 transition-transform text-emerald-600">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            </span>
          </summary>
          <p class="mt-3 text-sm text-slate-300 leading-relaxed">
            Component libraries add varying degrees of DOM complexity, CSS layers, and JavaScript bundles. Measuring them in an identical microfrontend setup reveals real runtime costs.
          </p>
        </details>

        <details class="group border border-slate-700 rounded-xl bg-slate-900 p-4 open:shadow-sm transition">
          <summary class="flex justify-between items-center font-bold text-white cursor-pointer list-none select-none">
            <span>Does Native HTML require external UI packages?</span>
            <span class="transform group-open:rotate-180 transition-transform text-emerald-600">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            </span>
          </summary>
          <p class="mt-3 text-sm text-slate-300 leading-relaxed">
            No. It uses standard browser capabilities (dialog, details, datalist, meter) styled directly with Tailwind CSS v4.
          </p>
        </details>
      </div>
`
  },

  'tabs': {
    className: 'TabsComponent',
    title: 'Tabs',
    desc: 'Interactive tab switcher with active indicators driven by Angular signals.',
    componentCode: `
  activeTab = signal<'overview' | 'metrics' | 'config'>('overview');

  setTab(tab: 'overview' | 'metrics' | 'config') {
    this.activeTab.set(tab);
  }
`,
    template: `
      <div class="max-w-xl space-y-4">
        <div class="border-b border-slate-700 flex space-x-6">
          <button
            type="button"
            (click)="setTab('overview')"
            [class.border-emerald-600]="activeTab() === 'overview'"
            [class.text-emerald-600]="activeTab() === 'overview'"
            [class.border-transparent]="activeTab() !== 'overview'"
            [class.text-slate-400]="activeTab() !== 'overview'"
            class="py-3 px-1 border-b-2 font-semibold text-sm transition"
          >Overview</button>
          <button
            type="button"
            (click)="setTab('metrics')"
            [class.border-emerald-600]="activeTab() === 'metrics'"
            [class.text-emerald-600]="activeTab() === 'metrics'"
            [class.border-transparent]="activeTab() !== 'metrics'"
            [class.text-slate-400]="activeTab() !== 'metrics'"
            class="py-3 px-1 border-b-2 font-semibold text-sm transition"
          >Metrics</button>
          <button
            type="button"
            (click)="setTab('config')"
            [class.border-emerald-600]="activeTab() === 'config'"
            [class.text-emerald-600]="activeTab() === 'config'"
            [class.border-transparent]="activeTab() !== 'config'"
            [class.text-slate-400]="activeTab() !== 'config'"
            class="py-3 px-1 border-b-2 font-semibold text-sm transition"
          >Configuration</button>
        </div>

        <div class="bg-slate-900 p-6 rounded-xl border border-slate-700 shadow-sm text-sm text-slate-200">
          @if (activeTab() === 'overview') {
            <div>
              <h4 class="font-bold text-white mb-2">Native Showcase Overview</h4>
              <p>Demonstrates semantic HTML5 elements without the JavaScript bundle payload of heavyweight third-party libraries.</p>
            </div>
          } @else if (activeTab() === 'metrics') {
            <div>
              <h4 class="font-bold text-white mb-2">Performance Metrics</h4>
              <p>Expected First Contentful Paint: &lt; 200ms. DOM Depth: Minimal.</p>
            </div>
          } @else {
            <div>
              <h4 class="font-bold text-white mb-2">Configuration Settings</h4>
              <p>Using Tailwind v4 with PostCSS. CSS layer priority: Base, Utilities.</p>
            </div>
          }
        </div>
      </div>
`
  },

  'divider': {
    className: 'DividerComponent',
    title: 'Divider',
    desc: 'Horizontal, vertical, and labeled dividers styled with Tailwind.',
    componentCode: ``,
    template: `
      <div class="space-y-8 max-w-xl">
        <div>
          <span class="text-xs text-slate-400">Content Section A</span>
          <hr class="my-4 border-slate-700" />
          <span class="text-xs text-slate-400">Content Section B</span>
        </div>

        <div class="relative flex items-center justify-center">
          <div class="flex-grow border-t border-slate-700"></div>
          <span class="flex-shrink mx-4 text-xs uppercase font-bold text-slate-400 bg-slate-900 px-2">OR CONTINUE WITH</span>
          <div class="flex-grow border-t border-slate-700"></div>
        </div>

        <div class="flex items-center gap-4 text-sm text-slate-300">
          <span>Item 1</span>
          <div class="h-5 w-px bg-gray-300"></div>
          <span>Item 2</span>
          <div class="h-5 w-px bg-gray-300"></div>
          <span>Item 3</span>
        </div>
      </div>
`
  },

  'fieldset': {
    className: 'FieldsetComponent',
    title: 'Fieldset & Legend',
    desc: 'Semantic HTML fieldset container with custom styled legends for grouping form elements.',
    componentCode: ``,
    template: `
      <div class="max-w-xl">
        <fieldset class="border border-slate-700 rounded-2xl p-6 bg-slate-900 shadow-sm space-y-4">
          <legend class="px-3 text-sm font-bold text-emerald-800 bg-emerald-50 rounded-lg border border-emerald-200">
            Network & Proxy Configuration
          </legend>
          <div class="space-y-1">
            <span class="block text-xs font-semibold text-slate-300">Federation Port</span>
            <input type="text" value="4203" aria-label="Port" class="w-full px-3 py-2 border rounded-lg text-sm bg-slate-900/60" readonly />
          </div>
          <div class="space-y-1">
            <span class="block text-xs font-semibold text-slate-300">Remote Manifest URI</span>
            <input type="text" value="http://localhost:4203/remoteEntry.json" aria-label="URI" class="w-full px-3 py-2 border rounded-lg text-sm bg-slate-900/60" readonly />
          </div>
        </fieldset>
      </div>
`
  },

  'stepper': {
    className: 'StepperComponent',
    title: 'Stepper',
    desc: 'Multi-step process wizard with active, completed, and pending steps driven by signals.',
    componentCode: `
  currentStep = signal(1);

  next() { this.currentStep.update(s => Math.min(3, s + 1)); }
  prev() { this.currentStep.update(s => Math.max(1, s - 1)); }
`,
    template: `
      <div class="max-w-xl space-y-6">
        <div class="flex items-center justify-between">
          @for (step of [
            { num: 1, label: 'Select MFE' },
            { num: 2, label: 'Configure Load' },
            { num: 3, label: 'Execute Benchmark' }
          ]; track step.num) {
            <div class="flex items-center gap-2">
              <div
                [class.bg-emerald-600]="currentStep() >= step.num"
                [class.text-white]="currentStep() >= step.num"
                [class.bg-gray-200]="currentStep() < step.num"
                [class.text-slate-300]="currentStep() < step.num"
                class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition"
              >{{ step.num }}</div>
              <span class="text-xs font-semibold text-slate-200 hidden sm:inline">{{ step.label }}</span>
            </div>
            @if (step.num < 3) {
              <div class="flex-grow mx-2 h-0.5" [class.bg-emerald-600]="currentStep() > step.num" [class.bg-gray-200]="currentStep() <= step.num"></div>
            }
          }
        </div>

        <div class="p-6 bg-slate-900 border border-slate-700 rounded-xl shadow-sm text-sm">
          <p class="font-bold text-white mb-1">Step {{ currentStep() }} Active</p>
          <p class="text-slate-300">Simulating wizard stage for automated pipeline.</p>
        </div>

        <div class="flex justify-between">
          <button type="button" (click)="prev()" [disabled]="currentStep() === 1" class="px-4 py-2 border rounded-lg text-sm font-semibold disabled:opacity-40 hover:bg-slate-900/60 transition">Previous</button>
          <button type="button" (click)="next()" [disabled]="currentStep() === 3" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold disabled:opacity-40 transition">Next Step</button>
        </div>
      </div>
`
  },

  'grid': {
    className: 'GridComponent',
    title: 'CSS Grid Layout',
    desc: 'Responsive CSS Grid demonstration showcasing 1 to 4 responsive columns and alignment.',
    componentCode: ``,
    template: `
      <div class="space-y-4">
        <h3 class="text-sm font-semibold text-slate-200">Responsive Grid (1 col &rarr; 2 cols &rarr; 4 cols)</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          @for (idx of [1, 2, 3, 4]; track idx) {
            <div class="p-6 rounded-xl bg-slate-900 border border-slate-700 shadow-sm text-center">
              <span class="text-2xl font-black text-emerald-600">#{{ idx }}</span>
              <p class="text-xs text-slate-400 mt-1">Responsive Grid Item</p>
            </div>
          }
        </div>
      </div>
`
  },

  'progress': {
    className: 'ProgressComponent',
    title: 'Progress Bars',
    desc: 'Native HTML5 progress element and custom animated Tailwind striped progress bars.',
    componentCode: `
  val = signal(65);

  inc() { this.val.update(v => Math.min(100, v + 10)); }
  dec() { this.val.update(v => Math.max(0, v - 10)); }
`,
    template: `
      <div class="max-w-xl space-y-6">
        <div class="space-y-2">
          <div class="flex justify-between text-xs font-semibold text-slate-200">
            <span>HTML5 &lt;progress&gt; Element</span>
            <span>{{ val() }}%</span>
          </div>
          <progress class="w-full h-3 rounded-full overflow-hidden accent-emerald-600" [value]="val()" max="100"></progress>
        </div>

        <div class="space-y-2">
          <div class="flex justify-between text-xs font-semibold text-slate-200">
            <span>Tailwind Animated Progress Bar</span>
            <span>{{ val() }}%</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-3.5 overflow-hidden shadow-inner">
            <div [style.width.%]="val()" class="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-300"></div>
          </div>
        </div>

        <div class="flex gap-2">
          <button type="button" (click)="dec()" class="px-3 py-1.5 border rounded-lg text-xs font-bold hover:bg-slate-900/60">-10%</button>
          <button type="button" (click)="inc()" class="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold">+10%</button>
        </div>
      </div>
`
  },

  'meter': {
    className: 'MeterComponent',
    title: 'Meter (Gauge)',
    desc: 'Native HTML5 meter element showing values with low, optimum, and high thresholds.',
    componentCode: `
  storageUsed = signal(72);
`,
    template: `
      <div class="max-w-xl space-y-6">
        <div class="space-y-2">
          <div class="flex justify-between text-sm font-semibold text-slate-200">
            <span>Disk / Memory Storage</span>
            <span class="font-mono text-emerald-800">{{ storageUsed() }} GB / 100 GB</span>
          </div>
          <meter class="w-full h-5" min="0" max="100" low="30" high="75" optimum="20" [value]="storageUsed()"></meter>
          <p class="text-xs text-slate-400">Native browser thresholds: Low (&lt;30), Optimum (20), High (&gt;75).</p>
        </div>
      </div>
`
  },

  'alert': {
    className: 'AlertComponent',
    title: 'Alerts',
    desc: 'Dismissible and informational alert notification boxes in multiple severities.',
    componentCode: `
  showAlert = signal(true);

  dismiss() { this.showAlert.set(false); }
  reset() { this.showAlert.set(true); }
`,
    template: `
      <div class="max-w-2xl space-y-4">
        @if (showAlert()) {
          <div class="flex items-start justify-between p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 shadow-sm">
            <div class="flex gap-3">
              <svg class="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
              <div>
                <strong class="font-bold">Performance Milestone Achieved:</strong>
                <p class="text-xs text-emerald-800 mt-0.5">Native HTML components achieved a 100/100 Lighthouse performance score.</p>
              </div>
            </div>
            <button type="button" aria-label="Dismiss alert" (click)="dismiss()" class="text-emerald-500 hover:text-emerald-800 font-bold ml-4">&times;</button>
          </div>
        } @else {
          <button type="button" (click)="reset()" class="text-xs text-emerald-600 underline">Show alert again</button>
        }

        <div class="flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 shadow-sm">
          <svg class="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
          <div>
            <strong class="font-bold">Warning:</strong>
            <p class="text-xs text-amber-800 mt-0.5">Ensure ports 4200-4203 remain uninterrupted while benchmarks are running.</p>
          </div>
        </div>
      </div>
`
  },

  'skeleton': {
    className: 'SkeletonComponent',
    title: 'Skeleton Loader',
    desc: 'Pulse-animated skeleton screens simulating content loading states.',
    componentCode: `
  loading = signal(true);

  toggle() { this.loading.set(!this.loading()); }
`,
    template: `
      <div class="max-w-md space-y-4">
        <div class="flex justify-between items-center">
          <span class="text-xs font-bold text-slate-400 uppercase">Simulated State</span>
          <button type="button" (click)="toggle()" class="text-xs text-emerald-600 underline">Toggle Loaded/Skeleton</button>
        </div>

        @if (loading()) {
          <div class="border rounded-2xl p-6 bg-slate-900 shadow-sm space-y-4 animate-pulse">
            <div class="flex items-center space-x-4">
              <div class="rounded-full bg-gray-200 h-12 w-12"></div>
              <div class="flex-1 space-y-2 py-1">
                <div class="h-4 bg-gray-200 rounded w-3/4"></div>
                <div class="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
            <div class="space-y-2">
              <div class="h-3 bg-gray-200 rounded"></div>
              <div class="h-3 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        } @else {
          <div class="border rounded-2xl p-6 bg-slate-900 shadow-sm space-y-4">
            <div class="flex items-center space-x-4">
              <div class="rounded-full bg-emerald-500 h-12 w-12 flex items-center justify-center text-white font-bold">NX</div>
              <div>
                <h4 class="font-bold text-white">Microfrontend Workspace</h4>
                <p class="text-xs text-slate-400">Live data loaded</p>
              </div>
            </div>
            <p class="text-sm text-slate-200">Demonstrating loaded content state seamlessly.</p>
          </div>
        }
      </div>
`
  },

  'spinner': {
    className: 'SpinnerComponent',
    title: 'Loading Spinners',
    desc: 'CSS keyframe spinning animations in varied sizes, colors, and button integrations.',
    componentCode: `
  isLoading = signal(false);

  triggerLoad() {
    this.isLoading.set(true);
    setTimeout(() => this.isLoading.set(false), 1500);
  }
`,
    template: `
      <div class="space-y-6">
        <div class="flex items-center gap-6">
          <div class="w-6 h-6 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
          <div class="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <div class="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
        </div>

        <div>
          <button
            type="button"
            (click)="triggerLoad()"
            [disabled]="isLoading()"
            class="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-sm transition shadow-sm disabled:opacity-75"
          >
            @if (isLoading()) {
              <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Processing...</span>
            } @else {
              <span>Simulate Async Action</span>
            }
          </button>
        </div>
      </div>
`
  },

  'dialog': {
    className: 'DialogComponent',
    title: 'Dialog (Modal)',
    desc: 'Modern HTML5 dialog element with native modal backdrop, escape handling, and signal control.',
    componentCode: `
  openDialog(dialog: HTMLDialogElement) {
    dialog.showModal();
  }
  closeDialog(dialog: HTMLDialogElement) {
    dialog.close();
  }
`,
    template: `
      <div class="space-y-4">
        <button
          type="button"
          (click)="openDialog(nativeModal)"
          class="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm shadow transition"
        >
          Open Native HTML5 &lt;dialog&gt;
        </button>

        <dialog
          #nativeModal
          class="p-0 rounded-2xl shadow-2xl backdrop:bg-gray-900/50 backdrop:backdrop-blur-sm max-w-md w-full border border-gray-100"
        >
          <div class="p-6 space-y-4">
            <div class="flex justify-between items-center">
              <h3 class="text-lg font-bold text-white">HTML5 Native Dialog</h3>
              <button type="button" aria-label="Close dialog" (click)="closeDialog(nativeModal)" class="text-slate-400 hover:text-slate-300 font-bold text-lg">&times;</button>
            </div>
            <p class="text-sm text-slate-300">
              This dialog uses browser native <code>&lt;dialog&gt;</code> APIs with zero JavaScript modal frameworks required. It includes automatic focus management and ESC key support.
            </p>
            <div class="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <button type="button" (click)="closeDialog(nativeModal)" class="px-4 py-2 border rounded-lg text-sm font-semibold hover:bg-slate-900/60">Cancel</button>
              <button type="button" (click)="closeDialog(nativeModal)" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold">Confirm</button>
            </div>
          </div>
        </dialog>
      </div>
`
  },

  'tooltip': {
    className: 'TooltipComponent',
    title: 'Tooltips',
    desc: 'Pure CSS hover tooltips positioned via Tailwind group utilities without third party dependencies.',
    componentCode: ``,
    template: `
      <div class="flex flex-wrap gap-8 items-center pt-8">
        <!-- Top Tooltip -->
        <div class="relative group">
          <button type="button" class="px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm font-medium shadow-sm hover:bg-slate-900/60">Tooltip Top</button>
          <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-900 text-white text-xs py-1.5 px-3 rounded shadow-lg whitespace-nowrap z-10 transition">
            Native CSS Tooltip Top
            <div class="w-2 h-2 bg-gray-900 rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2"></div>
          </div>
        </div>

        <!-- Bottom Tooltip -->
        <div class="relative group">
          <button type="button" class="px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm font-medium shadow-sm hover:bg-slate-900/60">Tooltip Bottom</button>
          <div class="absolute top-full left-1/2 -translate-x-1/2 mt-2 hidden group-hover:block bg-gray-900 text-white text-xs py-1.5 px-3 rounded shadow-lg whitespace-nowrap z-10 transition">
            Native CSS Tooltip Bottom
            <div class="w-2 h-2 bg-gray-900 rotate-45 absolute -top-1 left-1/2 -translate-x-1/2"></div>
          </div>
        </div>
      </div>
`
  },

  'popover': {
    className: 'PopoverComponent',
    title: 'Popover',
    desc: 'Native HTML Popover API with toggle buttons and contextual floating content.',
    componentCode: `
  isOpen = signal(false);

  toggle() { this.isOpen.set(!this.isOpen()); }
`,
    template: `
      <div class="relative inline-block">
        <button
          type="button"
          (click)="toggle()"
          class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold shadow transition"
        >
          Toggle Popover Card
        </button>

        @if (isOpen()) {
          <div class="absolute left-0 mt-3 w-80 p-4 bg-slate-900 border border-slate-700 rounded-2xl shadow-xl z-20 space-y-3">
            <h4 class="font-bold text-white text-sm">Contextual Inspector</h4>
            <p class="text-xs text-slate-300">Demonstrating lightweight contextual overlays with reactive signal toggling.</p>
            <div class="flex justify-end">
              <button type="button" (click)="toggle()" class="px-3 py-1 bg-slate-800 hover:bg-gray-200 text-slate-200 rounded text-xs font-semibold">Dismiss</button>
            </div>
          </div>
        }
      </div>
`
  },

  'dropdown-menu': {
    className: 'DropdownMenuComponent',
    title: 'Dropdown Menu',
    desc: 'Action menu with options, icons, and signal-driven toggle state.',
    componentCode: `
  open = signal(false);

  toggle() { this.open.set(!this.open()); }
`,
    template: `
      <div class="relative inline-block text-left">
        <button
          type="button"
          (click)="toggle()"
          class="inline-flex items-center gap-2 px-4 py-2 border border-slate-700 rounded-lg text-sm font-semibold bg-slate-900 hover:bg-slate-900/60 shadow-sm"
        >
          <span>Actions</span>
          <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
        </button>

        @if (open()) {
          <div class="origin-top-left absolute left-0 mt-2 w-48 rounded-xl shadow-lg bg-slate-900 ring-1 ring-black ring-opacity-5 divide-y divide-slate-700 z-30">
            <div class="py-1">
              <button type="button" (click)="toggle()" class="w-full text-left block px-4 py-2 text-xs text-slate-200 hover:bg-slate-900/60 cursor-pointer">Duplicate Benchmark</button>
              <button type="button" (click)="toggle()" class="w-full text-left block px-4 py-2 text-xs text-slate-200 hover:bg-slate-900/60 cursor-pointer">Export CSV Data</button>
            </div>
            <div class="py-1">
              <button type="button" (click)="toggle()" class="w-full text-left block px-4 py-2 text-xs text-red-600 hover:bg-red-50 cursor-pointer">Reset Metrics</button>
            </div>
          </div>
        }
      </div>
`
  },

  'breadcrumb': {
    className: 'BreadcrumbComponent',
    title: 'Breadcrumb',
    desc: 'Hierarchical navigation trail using nav and ol semantic elements with chevron dividers.',
    componentCode: ``,
    template: `
      <nav class="flex text-sm text-slate-400 font-medium" aria-label="Breadcrumb">
        <ol class="inline-flex items-center space-x-1 md:space-x-3">
          <li class="inline-flex items-center">
            <span class="hover:text-white cursor-pointer flex items-center gap-1">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
              Home
            </span>
          </li>
          <li>
            <div class="flex items-center">
              <svg class="w-4 h-4 text-slate-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
              <span class="ml-1 hover:text-white cursor-pointer md:ml-2">Native MFE</span>
            </div>
          </li>
          <li aria-current="page">
            <div class="flex items-center">
              <svg class="w-4 h-4 text-slate-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
              <span class="ml-1 font-bold text-emerald-400 md:ml-2">Breadcrumb Showcase</span>
            </div>
          </li>
        </ol>
      </nav>
`
  },

  'pagination': {
    className: 'PaginationComponent',
    title: 'Pagination',
    desc: 'Accessible pagination controls with Prev/Next buttons and reactive page indices.',
    componentCode: `
  currentPage = signal(1);
  totalPages = 5;

  setPage(p: number) { this.currentPage.set(p); }
  prev() { this.currentPage.update(p => Math.max(1, p - 1)); }
  next() { this.currentPage.update(p => Math.min(this.totalPages, p + 1)); }
`,
    template: `
      <div class="space-y-4">
        <div class="flex items-center space-x-1">
          <button type="button" (click)="prev()" [disabled]="currentPage() === 1" class="px-3 py-1.5 border rounded-lg text-sm font-semibold disabled:opacity-40 hover:bg-slate-900/60 transition">Previous</button>
          @for (p of [1, 2, 3, 4, 5]; track p) {
            <button
              type="button"
              (click)="setPage(p)"
              [class.bg-emerald-600]="currentPage() === p"
              [class.text-white]="currentPage() === p"
              [class.hover:bg-slate-900/60]="currentPage() !== p"
              class="w-9 h-9 border rounded-lg text-sm font-bold transition"
            >{{ p }}</button>
          }
          <button type="button" (click)="next()" [disabled]="currentPage() === totalPages" class="px-3 py-1.5 border rounded-lg text-sm font-semibold disabled:opacity-40 hover:bg-slate-900/60 transition">Next</button>
        </div>
        <p class="text-xs text-slate-400">Page <strong class="text-emerald-400">{{ currentPage() }}</strong> of {{ totalPages }}</p>
      </div>
`
  },

  'toolbar': {
    className: 'ToolbarComponent',
    title: 'Toolbar',
    desc: 'Flexbox application toolbar with filters, action groups, and new item buttons.',
    componentCode: ``,
    template: `
      <div class="p-4 bg-slate-900 border border-slate-700 rounded-xl shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div class="flex items-center gap-2">
          <input type="text" aria-label="Filter benchmark" placeholder="Filter benchmark..." class="px-3 py-1.5 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-emerald-500" />
          <button type="button" class="px-3 py-1.5 border rounded-lg text-sm font-semibold hover:bg-slate-900/60">Filter</button>
        </div>
        <div class="flex items-center gap-2">
          <button type="button" class="px-3 py-1.5 border rounded-lg text-sm font-semibold hover:bg-slate-900/60">Export</button>
          <button type="button" class="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold transition">+ New Test</button>
        </div>
      </div>
`
  },

  'menu': {
    className: 'MenuComponent',
    title: 'Navigation Menu',
    desc: 'Vertical sidebar navigation menu with sections, badges, and active states.',
    componentCode: `
  activeItem = signal('dash');

  select(id: string) { this.activeItem.set(id); }
`,
    template: `
      <div class="w-64 bg-slate-900 border border-slate-700 rounded-2xl p-4 shadow-sm space-y-1">
        @for (item of [
          { id: 'dash', label: 'Dashboard', badge: '' },
          { id: 'perf', label: 'Web Vitals', badge: 'Live' },
          { id: 'suites', label: 'Playwright Tests', badge: '12' },
          { id: 'settings', label: 'Settings', badge: '' }
        ]; track item.id) {
          <button
            type="button"
            (click)="select(item.id)"
            [class.bg-emerald-50]="activeItem() === item.id"
            [class.text-emerald-400]="activeItem() === item.id"
            [class.font-bold]="activeItem() === item.id"
            [class.text-slate-200]="activeItem() !== item.id"
            class="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm transition hover:bg-slate-900/60"
          >
            <span>{{ item.label }}</span>
            @if (item.badge) {
              <span class="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-mono">{{ item.badge }}</span>
            }
          </button>
        }
      </div>
`
  },

  'button': {
    className: 'ButtonComponent',
    title: 'Buttons',
    desc: 'Primary, secondary, outline, ghost, danger buttons and size options with hover states.',
    componentCode: ``,
    template: `
      <div class="space-y-6">
        <div>
          <h3 class="text-sm font-semibold text-slate-200 mb-3">Variants</h3>
          <div class="flex flex-wrap gap-3">
            <button type="button" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg text-sm transition shadow-sm">Primary</button>
            <button type="button" class="px-4 py-2 bg-slate-800 hover:bg-gray-200 text-slate-100 font-semibold rounded-lg text-sm transition">Secondary</button>
            <button type="button" class="px-4 py-2 border border-slate-700 hover:bg-slate-900/60 text-slate-200 font-semibold rounded-lg text-sm transition shadow-sm">Outline</button>
            <button type="button" class="px-4 py-2 text-emerald-600 hover:bg-emerald-50 font-semibold rounded-lg text-sm transition">Ghost</button>
            <button type="button" class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg text-sm transition shadow-sm">Danger</button>
          </div>
        </div>

        <div>
          <h3 class="text-sm font-semibold text-slate-200 mb-3">Sizes</h3>
          <div class="flex items-center gap-3">
            <button type="button" class="px-2.5 py-1 bg-emerald-600 text-white text-xs font-semibold rounded">Small</button>
            <button type="button" class="px-4 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-lg">Regular</button>
            <button type="button" class="px-6 py-3 bg-emerald-600 text-white text-base font-bold rounded-xl shadow">Large</button>
          </div>
        </div>
      </div>
`
  },

  'button-group': {
    className: 'ButtonGroupComponent',
    title: 'Button Group',
    desc: 'Attached segmented button group with active signal states.',
    componentCode: `
  timeframe = signal<string>('week');

  setTimeframe(t: string) {
    this.timeframe.set(t);
  }
`,
    template: `
      <div class="space-y-4">
        <span class="inline-flex rounded-xl shadow-sm border border-slate-700 overflow-hidden bg-slate-900">
          @for (t of [
            { id: 'day', label: 'Day' },
            { id: 'week', label: 'Week' },
            { id: 'month', label: 'Month' },
            { id: 'year', label: 'Year' }
          ]; track t.id) {
            <button
              type="button"
              (click)="setTimeframe(t.id)"
              [class.bg-emerald-600]="timeframe() === t.id"
              [class.text-white]="timeframe() === t.id"
              [class.hover:bg-slate-900/60]="timeframe() !== t.id"
              [class.text-slate-200]="timeframe() !== t.id"
              class="px-4 py-2 text-xs font-bold transition border-r last:border-r-0 border-slate-700"
            >{{ t.label }}</button>
          }
        </span>
        <p class="text-xs text-slate-400">Active Interval: <strong class="text-emerald-400">{{ timeframe() }}</strong></p>
      </div>
`
  },

  'icon-button': {
    className: 'IconButtonComponent',
    title: 'Icon Buttons',
    desc: 'Circular and rounded icon buttons with hover rings and accessibility labels.',
    componentCode: `
  bookmarked = signal(false);
  liked = signal(false);

  toggleBookmark() { this.bookmarked.set(!this.bookmarked()); }
  toggleLike() { this.liked.set(!this.liked()); }
`,
    template: `
      <div class="flex items-center gap-4">
        <!-- Bookmark icon button -->
        <button
          type="button"
          (click)="toggleBookmark()"
          aria-label="Bookmark"
          [class.text-amber-500]="bookmarked()"
          [class.bg-amber-50]="bookmarked()"
          [class.text-slate-400]="!bookmarked()"
          class="p-2.5 rounded-full border border-slate-700 hover:bg-slate-800 transition shadow-sm"
        >
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"></path></svg>
        </button>

        <!-- Like icon button -->
        <button
          type="button"
          (click)="toggleLike()"
          aria-label="Favorite"
          [class.text-red-500]="liked()"
          [class.bg-red-50]="liked()"
          [class.text-slate-400]="!liked()"
          class="p-2.5 rounded-full border border-slate-700 hover:bg-slate-800 transition shadow-sm"
        >
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"></path></svg>
        </button>

        <!-- Share icon button -->
        <button
          type="button"
          aria-label="Share"
          class="p-2.5 rounded-full border border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition shadow-sm"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg>
        </button>
      </div>
`
  }
};

for (const [slug, def] of Object.entries(nativeShowcases)) {
  const dirPath = path.join(basePath, slug);
  fs.mkdirSync(dirPath, { recursive: true });

  const sharedImports: string[] = [];
  if (def.componentCode.includes('MOCK_COUNTRIES')) sharedImports.push('MOCK_COUNTRIES');
  if (def.componentCode.includes('MOCK_CATEGORIES')) sharedImports.push('MOCK_CATEGORIES');
  if (def.componentCode.includes('MOCK_TABLE_DATA')) sharedImports.push('MOCK_TABLE_DATA');
  if (def.componentCode.includes('MOCK_TIMELINE_EVENTS')) sharedImports.push('MOCK_TIMELINE_EVENTS');
  const sharedImportLine = sharedImports.length > 0
    ? `\nimport { ${sharedImports.join(', ')} } from '@nx-microfrontends/shared-models';`
    : '';

  const imports = def.componentCode.includes('signal')
    ? 'ChangeDetectionStrategy, Component, signal'
    : 'ChangeDetectionStrategy, Component';

  const code = `import { ${imports} } from '@angular/core';
import { RouterLink } from '@angular/router';${sharedImportLine}

@Component({
  selector: 'app-${slug}',
  standalone: true,
  imports: [RouterLink],
  template: \`
    <div class="p-6 max-w-4xl text-slate-100">
      <div class="mb-6">
        <a routerLink="/native" class="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300 mb-3 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors w-fit">
          <span>&larr;</span> Back to Native HTML Showcases
        </a>
        <h1 class="text-2xl font-bold text-white mb-1">${def.title}</h1>
        <p class="text-sm text-slate-400">${def.desc}</p>
      </div>

      <div class="p-6 border border-slate-700 rounded-2xl bg-slate-800 shadow-lg text-slate-100">
        ${def.template}
      </div>
    </div>
  \`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ${def.className} {
${def.componentCode}
}
`;

  fs.writeFileSync(path.join(dirPath, 'index.ts'), code, 'utf-8');
}

console.log('Successfully updated all 40 Native HTML + Tailwind showcase components!');
