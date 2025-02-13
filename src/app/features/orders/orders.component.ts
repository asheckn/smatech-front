import {Component, OnInit} from '@angular/core';
import {OrderService} from '../../core/services/order.service';
import {ApiResponse, Order} from '../../core/models';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-orders',
  imports: [
    RouterLink
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
  standalone: true
})
export class OrdersComponent implements OnInit{

  orders:Order[] = []

  constructor(private orderService: OrderService, private router: Router) {
  }

  ngOnInit() {
    this.orderService.getOrders().subscribe({
        next: (response:ApiResponse)=> {
          this.orders = response.data;
        }
    })
  }

  checkOut(activeOrder: Order) {
    this.orderService.activeOrder = activeOrder;
    this.router.navigateByUrl("/checkout");
  }
}
