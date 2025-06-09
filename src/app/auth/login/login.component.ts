import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, NgIf, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      const { email, password } = form.value;
      this.authService.login(form.value).subscribe({
        next: (response) => {
          // Save token or user data to localStorage/sessionStorage here
          this.errorMessage = null;
          console.log('Login successful:', response);
          // TODO: navigate to dashboard or home page
          this.authService.saveToken(response.token);
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          this.errorMessage =
            error.message || 'Login failed. Please try again.';
          console.error('Login error:', this.errorMessage);
        },
      });
    }
  }
}
