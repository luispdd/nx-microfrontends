import { RouterLink } from '@angular/router';
import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input-showcase',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    RouterLink
  ],
  template: `
    <div class="p-6 max-w-4xl text-slate-100">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-white mb-1">InputText</h1>
        <p class="text-sm text-slate-400">Angular Material text input variants with validation states, search with clear button, and disabled states.</p>
      </div>

      <div class="p-6 border border-slate-700 rounded-2xl bg-slate-800 shadow-lg text-slate-100">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- 1. Standard text input -->
          <div class="space-y-2">
            <label for="mat-std-text" class="block text-sm font-semibold text-slate-200">Standard Text Input</label>
            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Full Name</mat-label>
              <input
                id="mat-std-text"
                matInput
                type="text"
                placeholder="Enter your full name"
                [ngModel]="textValue()"
                (ngModelChange)="textValue.set($event)"
              />
            </mat-form-field>
            <p class="text-xs text-slate-400">Live value: <span class="font-mono text-indigo-400 font-semibold">{{ textValue() || '(empty)' }}</span></p>
          </div>

          <!-- 2. Search with leading icon and clear button -->
          <div class="space-y-2">
            <label for="mat-search-text" class="block text-sm font-semibold text-slate-200">Search with Clear Button</label>
            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Search components...</mat-label>
              <mat-icon matPrefix class="mr-2 text-slate-400">search</mat-icon>
              <input
                id="mat-search-text"
                matInput
                type="text"
                placeholder="Search components..."
                [ngModel]="searchQuery()"
                (ngModelChange)="searchQuery.set($event)"
              />
              @if (searchQuery()) {
                <button mat-icon-button matSuffix (click)="clearSearch()" type="button" aria-label="Clear search">
                  <mat-icon>close</mat-icon>
                </button>
              }
            </mat-form-field>
            <p class="text-xs text-slate-400">Query: <span class="font-mono text-indigo-400">{{ searchQuery() || '(none)' }}</span></p>
          </div>

          <!-- 3. Validation state toggleable -->
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <label for="mat-val-user" class="block text-sm font-semibold text-slate-200">Validation State</label>
              <button type="button" (click)="toggleError()" class="text-xs text-indigo-400 hover:underline">Toggle Error State</button>
            </div>
            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Username</mat-label>
              <input
                id="mat-val-user"
                matInput
                type="text"
                [ngModel]="username()"
                (ngModelChange)="username.set($event)"
              />
              @if (hasError()) {
                <mat-error>Username is already taken. Please choose another.</mat-error>
              } @else {
                <mat-hint class="!text-emerald-400">Username is available.</mat-hint>
              }
            </mat-form-field>
          </div>

          <!-- 4. Disabled input -->
          <div class="space-y-2">
            <label for="mat-dis-input" class="block text-sm font-semibold text-slate-400">Disabled Input</label>
            <mat-form-field appearance="outline" class="w-full">
              <mat-label>System ID</mat-label>
              <input
                id="mat-dis-input"
                matInput
                type="text"
                value="System generated ID: #SYS-99420"
                disabled
              />
              <mat-hint>Read-only system field</mat-hint>
            </mat-form-field>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputShowcase {
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