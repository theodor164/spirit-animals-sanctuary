import { NgIf, CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Router, RouterLink } from '@angular/router';
import { NgxCaptchaModule, InvisibleReCaptchaComponent } from 'ngx-captcha';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIf, RouterLink, NgxCaptchaModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  @ViewChild('captchaElem') captchaElem!: InvisibleReCaptchaComponent;

  errorMessage: string | null = null;
  private formData: NgForm | null = null;

  recaptchaSiteKey = '6Ldr-2ErAAAAADW1yRNfbiY1Wu3LI_UYXRg2v2Q2'; // Replace with your key

  constructor(private authService: AuthService, private router: Router) {}

  handleLoginClick(form: NgForm) {
    this.errorMessage = null;

    if (form.invalid) {
      this.errorMessage = 'Please enter a valid email and password.';
      return;
    }

    this.formData = form;
    this.captchaElem.execute();
  }

  handleRecaptchaSuccess(token: string) {
    if (!this.formData) {
      return;
    }

    const loginData = {
      ...this.formData.value,
      recaptcha: token,
    };

    this.authService.login(loginData).subscribe({
      next: (response) => {
        this.authService.saveToken(response.token);
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.errorMessage =
          error.error?.errors?.[0]?.msg ||
          'Login failed. Please check your credentials.';
        this.captchaElem.resetCaptcha(); // Reset captcha on error
      },
    });
  }
}
