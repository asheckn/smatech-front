import {Component, OnInit} from '@angular/core';
import {ApiResponse, UserData} from '../../../core/models';
import {AuthService} from '../../../core/services/auth.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-profile-details',
  imports: [
    DatePipe
  ],
  templateUrl: './profile-details.component.html',
  styleUrl: './profile-details.component.css',
  standalone: true
})
export class ProfileDetailsComponent implements OnInit {

  user: UserData | null = null;

  constructor(private authService: AuthService,) {
  }

  ngOnInit() {
   this.user =  this.authService.getUser()?.data!;
  }
}
