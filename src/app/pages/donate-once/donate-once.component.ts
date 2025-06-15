import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { loadStripe, Stripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-donate-once',
  standalone: true, // This is for newer Angular versions
  imports: [CommonModule, FormsModule, NgFor],
  templateUrl: './donate-once.component.html',
  styleUrls: ['./donate-once.component.css'],
})
export class DonateOnceComponent {
  predefinedAmounts: number[] = [10, 25, 50, 100];
  selectedAmount: number | null = 25; // Default to 25
  customAmount: number | null = null;

  form = {
    name: '',
    email: '',
  };

  message: string = ''; // Used to display feedback to the user
  stripePromise: Promise<Stripe | null>;

  constructor(private http: HttpClient) {
    // IMPORTANT: Remember to replace this with your actual public Stripe key in production
    this.stripePromise = loadStripe(
      'pk_test_51OHSZJJtqR3ifyMoetq4CdyKvrTWgozhmSdkf26pNrcjAqi5tNYmlSBmz8DRit8MHkuqBjPMpa5ouL9vawlgCv1r00RytXbZ9S'
    );
  }

  selectAmount(amount: number) {
    this.selectedAmount = amount;
    this.customAmount = null; // Clear custom amount when a button is clicked
  }

  updateSelectedAmount() {
    if (this.customAmount && this.customAmount > 0) {
      this.selectedAmount = this.customAmount;
    }
  }

  submitDonation() {
    this.message = ''; // Clear any previous messages
    if (!this.selectedAmount || this.selectedAmount <= 0) {
      this.message = 'Please select or enter a valid donation amount.';
      return;
    }
    if (!this.form.name || !this.form.email) {
      this.message = 'Please fill in your name and email address.';
      return;
    }

    // Make the POST request to our public backend endpoint
    this.http
      .post<{ id: string }>(
        'http://localhost:3000/api/public/create-guest-checkout',
        {
          amount: this.selectedAmount,
          name: this.form.name,
          email: this.form.email,
        }
      )
      .subscribe({
        next: async (session) => {
          const stripe = await this.stripePromise;
          if (stripe) {
            // Redirect to Stripe's secure checkout page
            stripe.redirectToCheckout({ sessionId: session.id });
          } else {
            this.message = 'Stripe could not be loaded. Please try again.';
          }
        },
        error: (err) => {
          // Display a user-friendly error from the backend if available
          this.message =
            err.error?.errors?.[0]?.msg || 'Failed to create checkout session.';
        },
      });
  }
}
