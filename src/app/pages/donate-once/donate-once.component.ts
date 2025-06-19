import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { NgxCaptchaModule, InvisibleReCaptchaComponent } from 'ngx-captcha';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-donate-once',
  standalone: true,
  imports: [CommonModule, FormsModule, NgFor, NgxCaptchaModule, RouterLink],
  templateUrl: './donate-once.component.html',
  styleUrls: ['./donate-once.component.css'],
})
export class DonateOnceComponent {
  @ViewChild('captchaElem') captchaElem!: InvisibleReCaptchaComponent;

  predefinedAmounts: number[] = [25, 50, 100, 250];
  selectedAmount: number | null = 100;
  customAmount: number | null = null;
  private formData: NgForm | null = null;

  form = { name: '', email: '' };
  message: string = '';
  isError: boolean = false;
  isLoading: boolean = false;
  stripePromise: Promise<Stripe | null>;
  recaptchaSiteKey = '6Ldr-2ErAAAAADW1yRNfbiY1Wu3LI_UYXRg2v2Q2'; // Replace with your key

  // NEW: Property for the checkbox
  agreedToTerms: boolean = false;

  constructor(private http: HttpClient) {
    this.stripePromise = loadStripe(
      'pk_test_51OHSZJJtqR3ifyMoetq4CdyKvrTWgozhmSdkf26pNrcjAqi5tNYmlSBmz8DRit8MHkuqBjPMpa5ouL9vawlgCv1r00RytXbZ9S'
    );
  }

  selectAmount(amount: number) {
    this.selectedAmount = amount;
    this.customAmount = null;
  }

  updateSelectedAmount() {
    if (this.customAmount && this.customAmount > 0) {
      this.selectedAmount = this.customAmount;
    }
  }

  handleDonationClick(form: NgForm) {
    this.message = '';
    this.isError = false;
    if (!this.selectedAmount || this.selectedAmount <= 0) {
      this.message = 'Vă rugăm să selectați sau să introduceți o sumă validă.';
      this.isError = true;
      return;
    }
    if (!form.value.name || !form.value.email) {
      this.message = 'Vă rugăm să completați numele și adresa de e-mail.';
      this.isError = true;
      return;
    }
    if (!this.agreedToTerms) {
      this.message =
        'Trebuie să fiți de acord cu Termenii și Politica de Confidențialitate pentru a dona.';
      this.isError = true;
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
      amount: this.selectedAmount,
      name: this.formData.value.name,
      email: this.formData.value.email,
      recaptchaToken: token,
      agreedToTerms: this.agreedToTerms, // Adăugăm starea checkbox-ului
    };

    this.http
      .post<{ id: string }>(
        'https://spirit-animals-sanctuary-backend.onrender.com/api/public/create-guest-checkout',
        payload
      )
      .subscribe({
        next: async (session) => {
          this.isLoading = false;
          const stripe = await this.stripePromise;
          if (stripe) {
            stripe.redirectToCheckout({ sessionId: session.id });
          } else {
            this.message = 'Serviciul de plăți nu a putut fi încărcat.';
            this.isError = true;
          }
        },
        error: (err) => {
          this.isLoading = false;
          this.isError = true;
          this.message =
            err.error?.errors?.[0]?.msg || 'Crearea sesiunii de plată a eșuat.';
          this.captchaElem.resetCaptcha();
        },
      });
  }
}
