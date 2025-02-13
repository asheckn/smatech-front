import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ProductCardComponent} from '../../components/product-card/product-card.component';
import {CommonModule, NgForOf} from '@angular/common';
import {StoreService} from '../../core/services/store.service';
import {ApiResponse, Category, Product} from '../../core/models';
import {environment} from '../../../environment/environment';

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
export class StoreComponent implements OnInit {

  constructor(private storeService:StoreService) {
  }
  searchQuery: any;
  activeItemGroup: any;
  itemGroups: any;
  pageSize: any = 10;
  pageNumber: any;
  totalPages: any;
  products: Product[]= [];
  categories: Category[] = []

  ngOnInit() {
    this.storeService.getCategories().subscribe({
      next: response => {
        this.categories = response.data
      }
    })

    this.storeService.getProducts().subscribe({
      next: (response:ApiResponse)=> {
        this.products = response.data.content;
      },
      error: error => {}
    })
  }

  search() {

  }

  fetchProducts() {

  }

  goToPreviousPage() {

  }

  goToNextPage() {

  }

  protected readonly environment = environment;
}
