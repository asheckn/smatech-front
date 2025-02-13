import {Component, Input, OnInit} from '@angular/core';
import {CartService} from '../../core/services/cart.service';
import {CartItem, OrderItem} from '../../core/models';
import Swal from 'sweetalert2';
import {DecimalPipe} from '@angular/common';
import {environment} from '../../../environment/environment';

@Component({
  selector: 'app-order-item',
  imports: [
    DecimalPipe
  ],
  templateUrl: './order-item.component.html',
  styleUrl: './order-item.component.css',
  standalone: true
})
export class OrderItemComponent {

  constructor() {}

  @Input({required:true})
  orderItem!:OrderItem;


  protected readonly environment = environment;
}
