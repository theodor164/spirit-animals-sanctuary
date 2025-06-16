import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgxCaptchaModule, InvisibleReCaptchaComponent } from 'ngx-captcha';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, CommonModule, NgxCaptchaModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  @ViewChild('captchaElem') captchaElem!: InvisibleReCaptchaComponent;

  form = { name: '', email: '', message: '' };
  message: string = '';
  isError: boolean = false;
  isLoading: boolean = false;
  private formData: NgForm | null = null;

  recaptchaSiteKey = '6Ldr-2ErAAAAADW1yRNfbiY1Wu3LI_UYXRg2v2Q2'; // Replace with your key

  constructor(private http: HttpClient) {}

  handleSendMessageClick(form: NgForm) {
    this.message = '';
    if (form.invalid) {
      this.isError = true;
      this.message = 'Please fill out all fields.';
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
      ...this.formData.value,
      recaptchaToken: token,
    };

    this.http
      .post<{ message: string }>('http://localhost:3000/api/contact', payload)
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          this.isError = false;
          this.message = response.message;
          this.formData?.reset();
        },
        error: (err) => {
          this.isLoading = false;
          this.isError = true;
          this.message =
            err.error?.errors?.[0]?.msg || 'Failed to send message.';
          this.captchaElem.resetCaptcha();
        },
      });
  }
}
