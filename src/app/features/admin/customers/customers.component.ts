import {Component, OnInit} from '@angular/core';
import {ApiResponse, Category, UserData} from '../../../core/models';
import {AdminService} from '../../../core/services/admin.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-customers',
  imports: [
    NgIf
  ],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css',
  standalone: true,
})
export class CustomersComponent implements OnInit {

  customers: UserData[] = [];

  constructor(private adminService:AdminService) {
  }

  ngOnInit() {
    this.adminService.getCustomers().subscribe({
      next: (response:any)=> {
        this.customers = response
      }
    })
  }
}
