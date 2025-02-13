import {Component, OnInit} from '@angular/core';
import {OrderService} from '../../core/services/order.service';
import {ApiResponse, Order} from '../../core/models';
import {DecimalPipe} from '@angular/common';
import {OrderItemComponent} from '../../components/order-item/order-item.component';
import {ActivatedRoute} from '@angular/router';
import Swal from 'sweetalert2';
import {AuthService} from '../../core/services/auth.service';
import {environment} from '../../../environment/environment';

@Component({
  selector: 'app-checkout',
  imports: [
    DecimalPipe,
    OrderItemComponent,
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
  standalone: true
})
export class CheckoutComponent implements OnInit {

  order:Order | null = null;

  constructor(private orderService: OrderService, private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {
   this.route.queryParams.subscribe(params => {
     const orderCode = params['orderCode'];

     this.orderService.getOrderByOrderCode(orderCode).subscribe({
       next: (response:ApiResponse)=> {
         this.order = response.data;
       }
     })
   })
  }



  payOrder(){
    //Swal confirmation

    Swal.fire({
      title: 'Confirm Payment',
      text: 'Are you sure you want to proceed with the payment?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Pay Now',
      cancelButtonText: 'Cancel',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        // Proceed with payment logic
        const payload = {
          customerName: "User",
          orderCode: this.order?.orderCode,
          returnUrl: environment.returnUrl,
          cancelUrl: environment.cancelUrl
        }

        this.orderService.payOrder(payload).subscribe({
          next: (response)=> {
            ///Navigate to paypal and pay
            window.open(response.approvalUrl, '_self');
          }
        })

        Swal.fire({
          title: 'Processing Payment...',
          text: 'Please wait while we process your payment.',
          icon: 'info',
          allowOutsideClick: false,
          showConfirmButton: false
        });

        // Call your payment function here
      }
    });

  }

}
