import {Component, OnInit} from '@angular/core';
import {ApiResponse, Order, UserData} from '../../../core/models';
import {AdminService} from '../../../core/services/admin.service';
import {NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-orders',
  imports: [
    NgIf,
    RouterLink
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
  standalone: true,
})
export class OrdersComponent implements OnInit {

  orders: Order[] = [];
  showModal: boolean = true;

  constructor(private adminService:AdminService) {
  }

  ngOnInit() {
    let payload  = {
      page: 0,
      size: 20,
      customerId: null,
      status:null
    }
    this.adminService.getOrders(payload).subscribe({
      next: (response:ApiResponse)=> {
        this.orders = response.data.content
      }
    })
  }



  filterOrders(status: any) {
    // customerId: any = null, status: any = null, page:number = 0, size:number = 20

    let payload  = {
      page: 0,
      size: 20,
      customerId: null,
      status:null
    }

    if(status){
      payload.status = status;
    }

    this.adminService.getOrders(payload).subscribe({
      next: (response:ApiResponse)=> {
        this.orders = response.data.content
      },
      error: err => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'No orders found',

        })
      }
    })
  }
}
