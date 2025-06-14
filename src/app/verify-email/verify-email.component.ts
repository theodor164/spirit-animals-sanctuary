import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-verify-email',
  standalone: true,
  imports: [CommonModule], // Use CommonModule for ngIf
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css'],
})
export class VerifyEmailComponent implements OnInit {
  message: string = 'Verifying your email, please wait...';
  isError: boolean = false;
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    // 1. Get the token from the URL's query parameters
    const token = this.route.snapshot.queryParamMap.get('token');

    if (!token) {
      this.isLoading = false;
      this.isError = true;
      this.message =
        'Verification token not found. Please check the link and try again.';
      return;
    }

    // 2. Send the token to the backend API
    this.http
      .post<{ message: string }>(
        'http://localhost:3000/api/auth/verify-email',
        { token }
      )
      .subscribe({
        next: (response) => {
          // Success!
          this.isLoading = false;
          this.isError = false;
          this.message = response.message;

          // Optional: Redirect to the login page after a few seconds
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 5000); // 5 seconds
        },
        error: (err) => {
          // Failure
          this.isLoading = false;
          this.isError = true;
          this.message =
            err.error?.error ||
            'An unknown error occurred during verification.';
        },
      });
  }
}
