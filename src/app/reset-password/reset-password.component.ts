import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;
  message: string = '';
  isError: boolean = false;
  isLoading: boolean = false;
  private token: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {
    this.resetForm = this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token');
    if (!this.token) {
      this.isError = true;
      this.message = 'Invalid or missing password reset token.';
    }
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  resetPassword() {
    if (this.resetForm.invalid || !this.token) {
      this.isError = true;
      this.message =
        'Please ensure passwords match and are at least 6 characters long.';
      return;
    }

    this.isLoading = true;
    this.message = '';
    this.isError = false;

    const { password } = this.resetForm.value;

    this.http
      .post<{ message: string }>(
        'http://localhost:3000/api/auth/reset-password',
        { token: this.token, password }
      )
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          this.isError = false;
          this.message = response.message;
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 5000);
        },
        error: (err) => {
          this.isLoading = false;
          this.isError = true;
          this.message =
            err.error?.errors?.[0]?.msg || 'An unexpected error occurred.';
        },
      });
  }
}
