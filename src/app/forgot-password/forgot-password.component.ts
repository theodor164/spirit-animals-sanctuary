import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  email: string = '';
  message: string = '';
  isError: boolean = false;
  isLoading: boolean = false;

  constructor(private http: HttpClient) {}

  requestReset() {
    if (!this.email) {
      this.isError = true;
      this.message = 'Please enter your email address.';
      return;
    }

    this.isLoading = true;
    this.isError = false;
    this.message = '';

    this.http
      .post<{ message: string }>(
        'http://localhost:3000/api/auth/forgot-password',
        { email: this.email }
      )
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          this.isError = false;
          this.message = response.message; // "If a user with that email exists..."
        },
        error: (err) => {
          this.isLoading = false;
          this.isError = true;
          // Use the validation error from the backend if available
          this.message =
            err.error?.errors?.[0]?.msg || 'An unexpected error occurred.';
        },
      });
  }
}
