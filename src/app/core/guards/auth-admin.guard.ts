import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {inject} from '@angular/core';


export const AuthAdminGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  // Check if the user is logged in and has the role of ADMIN
  if (authService.getUser()?.data.role === "ADMIN") {
    return true; // Allow access to the route
  } else {
    // Redirect non-admin users to the home screen
    router.navigate(['/home']); // Adjust the route as necessary
    return false; // Deny access to the route
  }
};
