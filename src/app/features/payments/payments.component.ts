import {Component, OnInit} from '@angular/core';
import {StoreService} from '../../core/services/store.service';
import {OrderService} from '../../core/services/order.service';
import {ApiResponse, AuthResponse, Payment} from '../../core/models';
import {AuthService} from '../../core/services/auth.service';
import {DatePipe, DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-payments',
  imports: [
    DatePipe,
    DecimalPipe
  ],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.css',
  standalone: true
})
export class PaymentsComponent implements OnInit {

  payments:Payment[] | null= [];

  constructor(private orderService: OrderService, private authService: AuthService) {

  }

  ngOnInit() {

   const  user:AuthResponse | null  = this.authService.getUser();

    this.orderService.getPayments(user?.data?.id!).subscribe({
      next: (response:any)=> {
        this.payments = response
      }
    })
  }

}
