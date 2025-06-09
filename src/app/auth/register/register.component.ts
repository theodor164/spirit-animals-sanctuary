import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  passwordsMatch = true;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  checkPasswordMatch(password: string, confirmPassword: string) {
    this.passwordsMatch = password === confirmPassword;
  }

  onSubmit(form: NgForm) {
    if (form.valid && this.passwordsMatch) {
      this.authService.register(form.value).subscribe({
        next: (response) => {
          this.successMessage = 'Registration successful! You can now login.';
          this.errorMessage = null;
          console.log('Registration successful:', response);
          // Optionally, redirect to login page or clear the form
          form.reset();
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.errorMessage =
            error.error.message || 'Registration failed. Please try again.';
          this.successMessage = null;
          console.error('Registration error:', this.errorMessage);
        },
      });
    }
  }
}
