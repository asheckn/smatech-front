import {Component, OnInit} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../../core/services/auth.service';
import Swal from 'sweetalert2';
import {CartService} from '../../../core/services/cart.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isLoading:boolean = false;
  errorMessage = '';

  constructor(private router: Router, private authService: AuthService , private fb: FormBuilder,private cartService:CartService) {
    this.isLoading = false;
    this.loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [
          Validators.required
        ]],}
    );
  }

  ngOnInit() {
    window.scrollTo(0, 0);
  }

  // Add this custom validator function inside your component class
  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const errors: ValidationErrors = {};

    if (!value) return null;

    if (value.length < 8) {
      errors['minlength'] = { requiredLength: 8 };
    }
    if (!/[A-Z]/.test(value)) {
      errors['missingUppercase'] = true;
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
      errors['missingSpecialChar'] = true;
    }
    if (!/\d/.test(value)) {
      errors['missingNumber'] = true;
    }

    return Object.keys(errors).length > 0 ? errors : null;
  }





  // Function to handle login submission
  login() {
    if (this.loginForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';

    const loginPayload = {
      "email": this.loginForm.value.email,
      "password": this.loginForm.value.password
    }

    this.authService.login(loginPayload).subscribe({
      next: () => {
        this.isLoading = false;

        //Todo Get Cart
        this.cartService.getCart().subscribe({
          next: () => {
            ///Navigate to register page
            Swal.fire({
              icon: 'success',
              title: 'Login Successful',
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 1000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              }
            }).then((result) => {
              //navigate to login
              this.router.navigateByUrl('/store').then(()=>{
              })
            })
          },
          error: err => {
              Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: err.message,
              })
          }
        })






      },
      error: (error:any) => {
        this.isLoading = false;
        this.errorMessage = 'Could not login account. Please try again.';
          Swal.fire({
            icon: 'error',
            title: 'Incorrect username or password',
            text: error.error.message,
          })
        this.errorMessage = `${error.error.message}`;
      }
    });
  }
}
