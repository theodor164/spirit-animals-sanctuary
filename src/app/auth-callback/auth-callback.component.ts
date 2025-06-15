import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth-callback',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './auth-callback.component.html',
  styleUrls: ['./auth-callback.component.css'],
})
export class AuthCallbackComponent implements OnInit {
  message: string = 'Finalizing your login, please wait...';
  isError: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // 1. Get the token from the URL query parameters
    const token = this.route.snapshot.queryParamMap.get('token');

    if (token) {
      // 2. Save the token to local storage
      localStorage.setItem('token', token);

      // 3. Redirect to the dashboard
      this.router.navigate(['/dashboard']);
    } else {
      // Handle the case where the token is missing
      this.isError = true;
      this.message = 'Authentication failed. Please try again.';
      // Optionally redirect back to login after a delay
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 5000);
    }
  }
}
