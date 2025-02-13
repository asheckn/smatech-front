import {Component, OnInit} from '@angular/core';
import {CommonModule, NgFor} from '@angular/common';
import {CartItemComponent} from '../../components/cart-item/cart-item.component';
import {CartService} from '../../core/services/cart.service';
import {ApiResponse, ShoppingCart} from '../../core/models';
import Swal from 'sweetalert2';
import {Router, RouterModule} from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [
    CommonModule,
    NgFor,
    CartItemComponent,
    RouterModule,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
  standalone: true
})
export class CartComponent implements OnInit {


  cart: ShoppingCart | null = null;

  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit() {
    this.cartService.cart$.subscribe(cart => {
      this.cart = cart;
    })
  }

  //Checkout the cart
  checkout() {
      this.cartService.checkoutCart().subscribe({
        next: (response:ApiResponse) => {
          Swal.fire({
            icon: 'success',
            title: 'Order created successfully',
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          }).then(
            ()=>{
              this.router.navigateByUrl(`/checkout?orderCode=${response.data.orderCode}`);
            }
          )
        }
      })
  }
}
