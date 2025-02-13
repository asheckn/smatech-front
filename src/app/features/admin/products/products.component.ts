import {Component, OnInit} from '@angular/core';
import {AdminService} from '../../../core/services/admin.service';
import {ApiResponse, Product} from '../../../core/models';
import {of} from 'rxjs';
import {environment} from '../../../../environment/environment';
import {DecimalPipe, NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';
import {ProductItemComponent} from '../../../components/product-item/product-item.component';

@Component({
  selector: 'app-products',
  imports: [
    DecimalPipe,
    RouterLink,
    NgIf,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
  standalone: true
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];

  constructor(private adminService:AdminService) {
  }

  ngOnInit() {
    this.adminService.getProducts().subscribe({
      next: (response:ApiResponse)=> {
        this.products = response.data.content;
      }
    })
  }

  protected readonly of = of;
  protected readonly environment = environment;
}
