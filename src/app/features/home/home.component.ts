import {Component, OnInit} from '@angular/core';
import {HeroComponent} from '../../components/hero/hero.component';
import {CategoryCardComponent} from '../../components/category-card/category-card.component';
import {ProductCardComponent} from '../../components/product-card/product-card.component';
import {StoreService} from '../../core/services/store.service';
import {ApiResponse, Product} from '../../core/models';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [
    HeroComponent,
    CategoryCardComponent,
    ProductCardComponent,
    NgForOf
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone: true,
})
export class HomeComponent implements OnInit {

  products: Product[] = [];

  constructor(private storeService:StoreService) {
  }

  ngOnInit() {
    this.storeService.getProducts().subscribe({
      next: (response:ApiResponse)=> {
        this.products = response.data.content;
      }
    })
  }
}
