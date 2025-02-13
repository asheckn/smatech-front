import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../core/services/auth.service';
import {AuthResponse} from '../../core/models';
import {CommonModule, NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';
import {ClickOutsideDirective} from '../../../click-outside.directive';

@Component({
  selector: 'app-header',
  imports: [
    NgIf,
    CommonModule,
    RouterLink,
    ClickOutsideDirective
  ],
  templateUrl: './header.component.html',
  standalone: true,
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {

  user:AuthResponse | null = null;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.user$.subscribe(user => {
      this.user = user
    })
  }

  isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown() {
    this.isDropdownOpen = false;
  }

  logout() {
    this.authService.logout();
  }
}
