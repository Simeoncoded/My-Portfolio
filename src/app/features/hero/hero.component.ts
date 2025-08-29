import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
    selector: 'app-hero',
    standalone: true,
    templateUrl:'./hero.component.html',
    styleUrl: './hero.component.css',
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HeroComponent{

}