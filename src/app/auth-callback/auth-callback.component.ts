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
    const token = this.route.snapshot.queryParamMap.get('token');
    const isFirstLogin =
      this.route.snapshot.queryParamMap.get('firstGoogleLogin');

    if (token) {
      localStorage.setItem('token', token);

      // Redirectăm la dashboard, adăugând un parametru dacă e prima logare
      if (isFirstLogin) {
        this.router.navigate(['/dashboard'], {
          queryParams: { showTerms: 'true' },
        });
      } else {
        this.router.navigate(['/dashboard']);
      }
    } else {
      this.isError = true;
      this.message = 'Authentication failed. Please try again.';
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 5000);
    }
  }
}
