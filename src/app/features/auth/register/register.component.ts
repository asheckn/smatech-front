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
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  standalone: true
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  isLoading:boolean = false;
  errorMessage = '';

  constructor(private router: Router, private authService: AuthService , private fb: FormBuilder,) {
    this.isLoading = false;
    this.registerForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        phoneNumber: ['', [Validators.required]],
        address: ['', [Validators.required]],
        password: ['', [
          Validators.required,
          this.passwordValidator
        ]],
        confirmPassword: ['', Validators.required]
      },
      {
        validator: this.matchPasswordsValidator
      }
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

  // Add this password matching validator
  private matchPasswordsValidator(group: FormGroup): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }



  // Function to handle login submission
  onRegister() {
    if (this.registerForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';

    const registerPayload = {
      "email": this.registerForm.value.email,
      "password": this.registerForm.value.password,
      "phoneNumber": this.registerForm.value.phoneNumber,
      "lastName": this.registerForm.value.lastName,
      "firstName": this.registerForm.value.firstName,
      "address": this.registerForm.value.address,
    }

    this.authService.register(registerPayload).subscribe({
      next: () => {
        this.isLoading = false;

        ///Navigate to register page
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful',
          text: 'Your account was created successfully',
        }).then((result) => {
          //navigate to login
          this.router.navigateByUrl('/login').then(()=>{
          })
        })



      },
      error: (error:any) => {
        this.isLoading = false;
        // this.errorMessage = 'Could not register account. Please try again.';
        this.errorMessage = `${error.error.message}`;
      }
    });
  }
}
