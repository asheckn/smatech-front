import {CanActivateFn} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {inject} from '@angular/core';


export const authGuard: CanActivateFn = (route, state) => {

  //Get logged in user and check for if user is logged in and has role customer
  const  authService: AuthService = inject(AuthService)
  return authService.getUser()?.data.role === "CUSTOMER" || authService.getUser()?.data?.role === "ADMIN"
};
