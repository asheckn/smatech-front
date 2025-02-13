import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../core/services/auth.service';
import {AuthResponse, ShoppingCart} from '../../core/models';
import {CommonModule, NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';
import {ClickOutsideDirective} from '../../../click-outside.directive';
import {CartService} from '../../core/services/cart.service';

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
  cart:any = null;


  constructor(private authService: AuthService, private cartService: CartService) { }

  ngOnInit() {
    this.authService.user$.subscribe(user => {
      this.user = user
    })

    this.cartService.cart$.subscribe(cart => {
      this.cart = cart;
    })

    this.cartService.getCart().subscribe(cart => {

    });
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
