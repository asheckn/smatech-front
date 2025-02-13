import {Component, OnInit} from '@angular/core';
import {ApiResponse, Order, Payment} from '../../core/models';
import {OrderService} from '../../core/services/order.service';
import {ActivatedRoute} from '@angular/router';
import {OrderItemComponent} from '../../components/order-item/order-item.component';
import {DecimalPipe, NgIf} from '@angular/common';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-check-order',
  imports: [
    OrderItemComponent,
    DecimalPipe,
    NgIf
  ],
  templateUrl: './check-order.component.html',
  styleUrl: './check-order.component.css',
  standalone: true
})
export class CheckOrderComponent implements OnInit {

  order: Order | null = null;
  payment:Payment | null = null;
  loading: boolean = true;

  constructor(private orderService: OrderService, private route:ActivatedRoute) {
  }

  ngOnInit() {
      this.route.queryParams.subscribe(params => {
        const paymentToken = params['token'];

        this.orderService.checkPaymentStatus(paymentToken).subscribe({
          next: (response:any)=> {
            // if successfull get order from payment
            this.payment = response;
            this.orderService.getOrderByOrderCode(response.orderCode).subscribe({
              next: (response:any)=> {
                this.order = response.data;
                this.loading = false
              }
            });
          }
        })
      })
  }

  copyToClipboard(text: string | undefined): void {
    if (!text) return;

    navigator.clipboard.writeText(text).then(() => {
      // Optional: Add visual feedback here
      console.log('Copied to clipboard:', text);
      // You could add a snackbar/toast notification
      Swal.fire({
        icon: 'info',
        title: 'Copied!',
        toast: true,
        position: "bottom",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      })

    }).catch(err => {
      console.error('Failed to copy:', err);
    });
  }
}
