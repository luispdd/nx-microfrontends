import { Component } from '@angular/core';
import { LayoutComponent } from './layout/layout';

@Component({
  imports: [LayoutComponent],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  title = 'shell';
}
