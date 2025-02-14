import {Component, OnInit} from '@angular/core';
import {AdminService} from '../../../../core/services/admin.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {ApiResponse, AuthResponse, Order, UserData} from '../../../../core/models';
import {DecimalPipe, NgIf} from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order-detail',
  imports: [
    DecimalPipe,
    NgIf,
    RouterLink
  ],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.css',
  standalone: true
})
export class OrderDetailComponent implements OnInit {

  order:Order | null = null;
  customer:UserData | null = null;

  constructor(private adminService:AdminService,private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const orderId = params['orderId'];

      this.adminService.getOrderById(orderId).subscribe({
        next: (response:ApiResponse)=> {
          this.order = response.data;
          this.getCustomer(response.data.cart.customerId);
        }
      })
    })
  }


  getCustomer(customerId:any) {
    this.adminService.getCustomerById(customerId).subscribe({
      next: (response:UserData)=> {
        this.customer  = response
      }
    })
  }


  /// Switch order to processing
  processOrder() {

    Swal.fire({
      title: 'Confirm Order',
      text: 'Are you sure you want to process this order?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, process it!',
      cancelButtonText: 'No, cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        // User confirmed, proceed with processing the order
        this.adminService.updateOrderStatus(this.order?.orderCode, "PROCESSING").subscribe({
          next: (response:any)=> {
            Swal.fire({
              icon: 'success',
              title: 'Order moved to processing successfully',
            }).then((result) => {
              this.adminService.getOrderById(this.order?.id).subscribe({
                next: (response:ApiResponse)=> {
                  this.order = response.data;
                }
              })
            })
          }
        })

      } else if (result.dismiss === Swal.DismissReason.cancel) {

      }
    });



  }

  dispatchOrder() {

    Swal.fire({
      title: 'Confirm Order',
      text: 'Are you sure you want to dispatch this order?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, dispatch it!',
      cancelButtonText: 'No, cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        // User confirmed, proceed with processing the order
        this.adminService.updateOrderStatus(this.order?.orderCode, "DISPATCHED").subscribe({
          next: (response:any)=> {
            Swal.fire({
              icon: 'success',
              title: 'Order dispatched successfully',
            }).then((result) => {
              this.adminService.getOrderById(this.order?.id).subscribe({
                next: (response:ApiResponse)=> {
                  this.order = response.data;
                }
              })
            })
          }
        })

      } else if (result.dismiss === Swal.DismissReason.cancel) {

      }
    });



  }

  deliverOrder() {

    Swal.fire({
      title: 'Confirm Order Delivery',
      text: 'Are you sure you want to mark this order as delivered?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, mark it!',
      cancelButtonText: 'No, cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        // User confirmed, proceed with processing the order
        this.adminService.updateOrderStatus(this.order?.orderCode, "DELIVERED").subscribe({
          next: (response:any)=> {
            Swal.fire({
              icon: 'success',
              title: 'Order marked as delivered',
            }).then((result) => {
              this.adminService.getOrderById(this.order?.id).subscribe({
                next: (response:ApiResponse)=> {
                  this.order = response.data;
                }
              })
            })
          }
        })

      } else if (result.dismiss === Swal.DismissReason.cancel) {

      }
    });



  }

  completeOrder() {

    Swal.fire({
      title: 'Complete Order ?',
      text: 'Are you sure you want to mark this order complete?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, complete it!',
      cancelButtonText: 'No, cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        // User confirmed, proceed with processing the order
        this.adminService.updateOrderStatus(this.order?.orderCode, "COMPLETE").subscribe({
          next: (response:any)=> {
            Swal.fire({
              icon: 'success',
              title: 'Order marked as complete',
            }).then((result) => {
              this.adminService.getOrderById(this.order?.id).subscribe({
                next: (response:ApiResponse)=> {
                  this.order = response.data;
                }
              })
            })
          }
        })

      } else if (result.dismiss === Swal.DismissReason.cancel) {

      }
    });



  }


}
