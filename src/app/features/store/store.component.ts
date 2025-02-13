import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ProductCardComponent} from '../../components/product-card/product-card.component';
import {CommonModule, NgForOf} from '@angular/common';

@Component({
  selector: 'app-store',
  imports: [
    FormsModule,
    ProductCardComponent,
    CommonModule
  ],
  templateUrl: './store.component.html',
  styleUrl: './store.component.css',
  standalone: true
})
export class StoreComponent {

  searchQuery: any;
  activeItemGroup: any;
  itemGroups: any;
  pageSize: any;
  pageNumber: any;
  totalPages: any;
  products: any[]= [1,1,2,5,5,5,6,3,5,8,2];

  search() {

  }

  fetchProducts() {

  }

  goToPreviousPage() {

  }

  goToNextPage() {

  }
}
