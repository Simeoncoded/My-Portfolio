import { Component, signal } from '@angular/core';
import { HeroComponent } from './features/hero/hero.component';
import { AboutComponent } from './features/about/about.component';
import { ProjectComponent } from './features/project/project.component';
import { ContactComponent } from './features/contact/contact.component';
//import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  //imports: [RouterOutlet],
  imports: [HeroComponent, AboutComponent, ProjectComponent, ContactComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})

export class App {
  protected readonly title = signal('My-Portfolio');
  year = new Date().getFullYear();
}
