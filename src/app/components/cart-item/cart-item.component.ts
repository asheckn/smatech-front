import {Component, Input} from '@angular/core';
import {CartItem} from '../../core/models';
import {DecimalPipe} from '@angular/common';
import {environment} from '../../../environment/environment';
import {CartService} from '../../core/services/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart-item',
  imports: [
    DecimalPipe
  ],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css',
  standalone: true,
})
export class CartItemComponent {

  constructor(private cartService: CartService) {}

  @Input({required:true})
  cartItem!:CartItem

  @Input({required:true})
  index!:number;

  removeItem() {
    const payload = {
      cartItemId: this.cartItem.id,
    }
    this.cartService.removeFromCart(payload).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Item removed',
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

  decrementQuantity() {
    const payload = {
      cartItemId: this.cartItem.id,
      amount:1
    }
    this.cartService.decreaseQuantity(payload).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Item removed',
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

  incrementQuantity() {
    const payload = {
      "productId": this.cartItem.product.id,
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

  protected readonly environment = environment;
}
