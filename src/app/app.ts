import { Component, signal } from '@angular/core';
import { HeroComponent } from './features/hero/hero.component';
//import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  //imports: [RouterOutlet],
  imports: [HeroComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('My-Portfolio');
  year = new Date().getFullYear();
}
