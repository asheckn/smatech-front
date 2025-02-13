import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';


@Component({
  selector: 'app-admin-layout',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css',
  standalone: true
})
export class AdminLayoutComponent {

}
