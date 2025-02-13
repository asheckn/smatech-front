import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {AdminService} from '../../../../core/services/admin.service';
import {NgForOf, NgIf} from '@angular/common';
import {ApiResponse, Category} from '../../../../core/models';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';

enum ProductStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}



@Component({
  selector: 'app-create-product',
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css',
  standalone: true
})
export class CreateProductComponent implements OnInit {
  form: FormGroup;
  selectedFile: File| null = null;
  productStatuses = Object.values(ProductStatus);
  categories: Category[] = [];

  constructor(private fb: FormBuilder, private adminService: AdminService, private router: Router) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      categoryId: ['', [Validators.required, Validators.min(1)]],
      description: [''],
      price: ['', [Validators.required, Validators.min(0)]],
      vatRate: ['', [Validators.required, Validators.min(0)]],
      currencyCode: ['USD', [Validators.required, Validators.maxLength(3)]],
      stock: ['', [Validators.required, Validators.min(0)]],
      status: [ProductStatus.ACTIVE, Validators.required]
    });
  }

  ngOnInit() {
    this.adminService.getCategories().subscribe({
      next: (response:ApiResponse)=> {
        this.categories = response.data;
      }
    })
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    if (this.form.invalid || !this.selectedFile) return;
    //ask confirmation
    Swal.fire({
      title: 'Confirm Product Creation',
      text: 'Are you sure you want to create this product?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, create it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        // User confirmed, proceed with product creation
        // Convert form values to query parameters
        const productData = {
          name: this.form.get('name')?.value,
          categoryId: +this.form.get('categoryId')?.value,
          description: this.form.get('description')?.value || '',
          price: +this.form.get('price')?.value,
          vatRate: +this.form.get('vatRate')?.value,
          currencyCode: this.form.get('currencyCode')?.value,
          stock: +this.form.get('stock')?.value,
          status: this.form.get('status')?.value
        };

        const queryParams = new URLSearchParams(productData as any).toString();

        // Append the image as FormData
        const formData = new FormData();
        formData.append('image', this.selectedFile!);

        // Send request with query params and FormData (image)
        this.adminService.createProduct(queryParams, formData, ).subscribe({
          next: (response) => {
            console.log('Product created', response);
            Swal.fire(
              'Created!',
              'Your product has been created.',
              'success'
            ).then((result) => {
              this.router.navigateByUrl("/admin/products");
            })
            this.form.reset();
            this.selectedFile = null;
          },
          error: (err) =>{
          Swal.fire(
            'Cancelled',
            'Product creation was cancelled.',
            'error'
          );
          console.error('Error creating product', err)
        }
        });
        // Add your product creation logic here

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // User canceled, do nothing or provide feedback

      }
    });


  }


}
