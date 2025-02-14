import {Component, Input, OnInit} from '@angular/core';
import {ApiResponse, AuthResponse, Product, UserData} from '../../core/models';
import {CommonModule, DecimalPipe, NgIf} from '@angular/common';
import {environment} from '../../../environment/environment';
import {StoreService} from '../../core/services/store.service';
import {CartService} from '../../core/services/cart.service';
import Swal from 'sweetalert2';
import {AuthService} from '../../core/services/auth.service';

@Component({
  selector: 'app-product-card',
  imports: [
    DecimalPipe,
    NgIf,
    CommonModule
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
  standalone: true
})
export class ProductCardComponent implements OnInit {

  @Input({required:true})
  product!: Product;
  stockThreshold: number  = 5
  user: UserData | null = null;

  constructor(private cartService:CartService, private authService: AuthService) {

  }

  ngOnInit() {
    this.authService.user$.subscribe({
      next: (response:any)=> {
          this.user = response.data
      }
    })
  }

  protected readonly environment = environment;

  addToCart() {

    const payload = {
      "productId": this.product.id,
      "quantity": 1
    }

      this.cartService.addToCart(payload).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Added to cart',
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          })
        }
      })
  }
}
