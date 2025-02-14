import {Component, OnInit} from '@angular/core';
import {environment} from '../../../../environment/environment';
import {ApiResponse, Category, Product} from '../../../core/models';
import {AdminService} from '../../../core/services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
  standalone: true,
})
export class CategoriesComponent implements OnInit {

  protected readonly environment = environment;

  categories: Category[] = [];

  constructor(private adminService:AdminService) {
  }

  ngOnInit() {
    this.adminService.getCategories().subscribe({
      next: (response:ApiResponse)=> {
        this.categories = response.data;
      }
    })
  }

  addCategory() {
    // Use SweetAlert2 to prompt for the category name and image
    Swal.fire({
      title: 'Add New Category',
      html: `
    <div class="flex flex-col space-y-4">
      <input id="swal-input1" class="swal2-input w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Category Name">
      <input type="file" id="swal-input2" class="swal2-input w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" accept="image/*">
    </div>
  `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Add',
      cancelButtonText: 'Cancel',
      customClass: {
        popup: 'rounded-2xl shadow-lg bg-white p-6',
        title: 'text-lg font-semibold text-gray-800',
        confirmButton: 'bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition',
        cancelButton: 'bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-4 py-2 rounded-lg transition',
      },
      preConfirm: () => {
        const name = (document.getElementById('swal-input1') as HTMLInputElement).value.trim();
        const file = (document.getElementById('swal-input2') as HTMLInputElement)?.files?.[0];

        if (!name || !file) {
          Swal.showValidationMessage('Category name and image are required!');
          return false;
        }

        return { name, file };
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const { name, file } = result.value;
        const formData = new FormData();
        formData.append('image', file);

        this.adminService.addCategory(name, formData).subscribe(
          () => {
            Swal.fire('Success!', 'Category added successfully.', 'success').then(
              ()=>{
                this.adminService.getCategories().subscribe({
                  next: (response:ApiResponse)=> {
                    this.categories = response.data;
                  }
                })
              }
            );
          },
          (error) => {
            Swal.fire('Error!', 'Failed to add category.', 'error');
            console.error('Error adding category:', error);
          }
        );
      }
    });

  }

  editCategory(categoryId:any) {
    Swal.fire({
      title: 'Edit Category',
      html: `
    <div class="flex flex-col space-y-4">
      <input id="swal-input1" class="swal2-input w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Category Name">
      <input type="file" id="swal-input2" class="swal2-input w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" accept="image/*">
    </div>
  `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Add',
      cancelButtonText: 'Cancel',
      customClass: {
        popup: 'rounded-2xl shadow-lg bg-white p-6',
        title: 'text-lg font-semibold text-gray-800',
        confirmButton: 'bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition',
        cancelButton: 'bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-4 py-2 rounded-lg transition',
      },
      preConfirm: () => {
        const name = (document.getElementById('swal-input1') as HTMLInputElement).value.trim();
        const file = (document.getElementById('swal-input2') as HTMLInputElement)?.files?.[0];

        if (!name && !file) {
          Swal.showValidationMessage('Category name or image are required!');
          return false;
        }

        return { name, file };
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const { name, file } = result.value;
        const formData = new FormData();
        formData.append('image', file);

        this.adminService.editCategory(categoryId,name, formData).subscribe(
          () => {
            Swal.fire('Success!', 'Category updated successfully.', 'success').then(
              ()=>{
                this.adminService.getCategories().subscribe({
                  next: (response:ApiResponse)=> {
                    this.categories = response.data;
                  }
                })
              }
            );
          },
          (error) => {
            Swal.fire('Error!', 'Failed to update category.', 'error');
            console.error('Error updating category:', error);
          }
        );
      }
    });
  }
}
