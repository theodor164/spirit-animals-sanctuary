import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgxCaptchaModule, InvisibleReCaptchaComponent } from 'ngx-captcha';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, NgxCaptchaModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  @ViewChild('captchaElem') captchaElem!: InvisibleReCaptchaComponent;

  email: string = '';
  message: string = '';
  isError: boolean = false;
  isLoading: boolean = false;
  private formData: NgForm | null = null;

  recaptchaSiteKey = '6Ldr-2ErAAAAADW1yRNfbiY1Wu3LI_UYXRg2v2Q2'; // Replace with your key

  constructor(private http: HttpClient) {}

  handleResetClick(form: NgForm) {
    this.message = '';
    if (form.invalid) {
      this.isError = true;
      this.message = 'Please enter a valid email address.';
      return;
    }

    this.isLoading = true;
    this.formData = form;
    this.captchaElem.execute();
  }

  handleRecaptchaSuccess(token: string) {
    if (!this.formData) {
      return;
    }

    const payload = {
      email: this.formData.value.email,
      recaptchaToken: token,
    };

    this.http
      .post<{ message: string }>(
        'https://spirit-animals-sanctuary-backend.onrender.com/api/auth/forgot-password',
        payload
      )
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          this.isError = false;
          this.message = response.message;
        },
        error: (err) => {
          this.isLoading = false;
          this.isError = true;
          this.message =
            err.error?.errors?.[0]?.msg || 'An unexpected error occurred.';
          this.captchaElem.resetCaptcha();
        },
      });
  }
}
