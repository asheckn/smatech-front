import {Component, OnInit} from '@angular/core';
import {ApiResponse, UserData} from '../../../core/models';
import {AdminService} from '../../../core/services/admin.service';
import {NgIf} from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  imports: [
    NgIf
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
  standalone: true
})
export class UsersComponent implements OnInit {

  admins: UserData[] = [];

  constructor(private adminService:AdminService) {
  }

  ngOnInit() {
    this.adminService.getAdmins().subscribe({
      next: (response:any)=> {
        this.admins = response
      }
    })
  }

  addUser() {
    Swal.fire({
      title: 'Add New Admin',
      html: `
    <div class="flex flex-col space-y-4">
      <input id="email" class="swal2-input w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Email">
      <input id="firstName" class="swal2-input w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="First Name">
      <input id="lastName" class="swal2-input w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Last Name">
      <input id="address" class="swal2-input w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Address Name">
      <input id="phoneNumber" class="swal2-input w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="PhoneNumber Name">
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
        const email = (document.getElementById('email') as HTMLInputElement).value.trim();
        const firstName = (document.getElementById('firstName') as HTMLInputElement).value.trim();
        const lastName = (document.getElementById('lastName') as HTMLInputElement).value.trim();
        const address = (document.getElementById('address') as HTMLInputElement).value.trim();
        const phoneNumber = (document.getElementById('phoneNumber') as HTMLInputElement).value.trim();



        if (!email || !firstName || !lastName || !address || !phoneNumber || !phoneNumber) {
          Swal.showValidationMessage('Email , First Name , Last Name , Address, Phone Number!');
          return false;
        }

        return { email, firstName, lastName, address, phoneNumber };
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const {email, firstName, lastName, address, phoneNumber} = result.value;

        let payload = result.value;

        payload['password'] = lastName+"@3421"


        this.adminService.createAdmin(payload).subscribe(
          () => {
            Swal.fire('Success!', 'Admin created successfully.', 'success').then(
              ()=>{
                this.adminService.getAdmins().subscribe({
                  next: (response:ApiResponse)=> {
                    this.admins = response.data;
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
}
