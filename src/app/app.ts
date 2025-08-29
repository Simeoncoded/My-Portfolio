import { Component, signal, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HeroComponent } from './features/hero/hero.component';
import { AboutComponent } from './features/about/about.component';
//import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  //imports: [RouterOutlet],
  imports: [HeroComponent, AboutComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class App {
  protected readonly title = signal('My-Portfolio');
  year = new Date().getFullYear();
}
