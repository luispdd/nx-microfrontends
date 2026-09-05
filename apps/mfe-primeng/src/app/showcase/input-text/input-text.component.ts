import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputText } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-text-showcase',
  standalone: true,
  imports: [CommonModule, InputText, FormsModule],
  template: `
    <div class="p-6 max-w-4xl text-slate-100">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-white mb-1">InputText</h1>
        <p class="text-sm text-slate-400">PrimeNG text input variants with validation states, search with clear button, and disabled states.</p>
      </div>

      <div class="p-6 border border-slate-700 rounded-2xl bg-slate-800 shadow-lg text-slate-100">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- 1. Standard text input -->
          <div class="space-y-2">
            <label for="p-std-text" class="block text-sm font-semibold text-slate-200">Standard Text Input</label>
            <input
              id="p-std-text"
              pInputText
              type="text"
              placeholder="Enter your full name"
              [ngModel]="textValue()"
              (ngModelChange)="textValue.set($event)"
              class="w-full"
            />
            <p class="text-xs text-slate-400">Live value: <span class="font-mono text-amber-400 font-semibold">{{ textValue() || '(empty)' }}</span></p>
          </div>

          <!-- 2. Search with leading icon and clear button -->
          <div class="space-y-2">
            <label for="p-search-text" class="block text-sm font-semibold text-slate-200">Search with Clear Button</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </div>
              <input
                id="p-search-text"
                pInputText
                type="text"
                placeholder="Search components..."
                [ngModel]="searchQuery()"
                (ngModelChange)="searchQuery.set($event)"
                class="w-full !pl-10 !pr-10"
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
            <p class="text-xs text-slate-400">Query: <span class="font-mono text-amber-400">{{ searchQuery() || '(none)' }}</span></p>
          </div>

          <!-- 3. Validation state toggleable -->
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <label for="p-val-user" class="block text-sm font-semibold text-slate-200">Validation State</label>
              <button type="button" (click)="toggleError()" class="text-xs text-amber-400 hover:underline">Toggle Error State</button>
            </div>
            <input
              id="p-val-user"
              pInputText
              type="text"
              [ngModel]="username()"
              (ngModelChange)="username.set($event)"
              [class.ng-invalid]="hasError()"
              [class.ng-dirty]="hasError()"
              class="w-full"
            />
            @if (hasError()) {
              <p class="text-xs text-red-500 flex items-center gap-1">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                Username is already taken. Please choose another.
              </p>
            } @else {
              <p class="text-xs text-emerald-400 flex items-center gap-1">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                Username is available.
              </p>
            }
          </div>

          <!-- 4. Disabled input -->
          <div class="space-y-2">
            <label for="p-dis-input" class="block text-sm font-semibold text-slate-400">Disabled Input</label>
            <input
              id="p-dis-input"
              pInputText
              type="text"
              value="System generated ID: #SYS-99420"
              disabled
              class="w-full !opacity-60 cursor-not-allowed"
            />
            <p class="text-xs text-slate-400">Read-only system field</p>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputTextShowcaseComponent {
  textValue = signal('');
  username = signal('john_doe');
  searchQuery = signal('');
  hasError = signal(false);

  clearSearch() {
    this.searchQuery.set('');
  }

  toggleError() {
    this.hasError.set(!this.hasError());
  }
}
