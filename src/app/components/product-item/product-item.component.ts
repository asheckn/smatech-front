import {Component, Input, OnInit} from '@angular/core';
import {ApiResponse, Category, Product} from '../../core/models';
import {environment} from '../../../environment/environment';
import {StoreService} from '../../core/services/store.service';
import {AdminService} from '../../core/services/admin.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-product-item',
  imports: [
    FormsModule
  ],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css',
  standalone: true,
})
export class ProductItemComponent implements OnInit{

  @Input({required:true})
  editProduct!: Product

  categories: Category[] = [];

  constructor(private adminService:AdminService) {}

  ngOnInit() {
    this.adminService.getCategories().subscribe({
      next: (response:ApiResponse)=> {
        this.categories = response.data;
      }
    })
  }

  // Save handler
  saveProduct() {
    const queryParams = {
      name: this.editProduct.name,
      categoryId: this.editProduct.category.id,
      description: this.editProduct.description,
      price: this.editProduct.price,
      vatRate: this.editProduct.vatRate,
      currencyCode: this.editProduct.currencyCode,
      stock: this.editProduct.stock,
      status: this.editProduct.status
    };

    // Call update service with queryParams
  }

  protected readonly environment = environment;

  handleImageUpload($event: Event) {

  }

  cancelEdit() {

  }
}
