import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [
    trigger('fadeIn', [
      state('void', style({opacity: 0})),
      transition(':enter', [
        animate('1000ms ease-in-out', style({opacity: 100}))
      ])
    ])
    // animation triggers go here
  ],
  standalone: true
})
export class AppComponent {
  title = 'smatech-front';
}
