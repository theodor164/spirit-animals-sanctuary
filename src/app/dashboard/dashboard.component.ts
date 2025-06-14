import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common'; // Combined imports
import { FormsModule } from '@angular/forms';
import { loadStripe, Stripe } from '@stripe/stripe-js';

// --- These interfaces are no longer needed here ---
// interface StripeSubscription { ... }
// interface DbSubscription { ... }

interface User {
  id: number;
  name: string;
  email: string;
}

interface Donation {
  id: number;
  amount: number;
  date: string;
}

@Component({
  selector: 'app-dashboard',
  // standalone: true // If you use standalone components, keep this
  imports: [NgIf, NgFor, CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  message = '';
  user: User | null = null;
  donations: Donation[] = [];
  donationAmount: number = 10;
  subscriptionAmount: number = 25;
  stripePromise: Promise<Stripe | null>;

  // To check if we should show the "Manage Billing" button
  hasSubscriptions: boolean = false;

  constructor(private http: HttpClient) {
    this.stripePromise = loadStripe(
      'pk_test_51OHSZJJtqR3ifyMoetq4CdyKvrTWgozhmSdkf26pNrcjAqi5tNYmlSBmz8DRit8MHkuqBjPMpa5ouL9vawlgCv1r00RytXbZ9S'
    );
  }

  redirectToCustomerPortal() {
    this.http
      .post<{ url: string }>(
        'http://localhost:3000/api/create-customer-portal-session',
        {}
      )
      .subscribe({
        next: (session) => {
          window.location.href = session.url;
        },
        error: (err) => {
          this.message =
            'Could not open the billing portal. Please try again later.';
          console.error('Portal session error:', err);
        },
      });
  }

  startSubscription() {
    if (!this.subscriptionAmount || this.subscriptionAmount < 5) {
      this.message = 'Monthly donation must be at least 5 RON.';
      return;
    }
    this.http
      .post<{ id: string }>(
        'http://localhost:3000/api/create-subscription-session',
        { amount: this.subscriptionAmount }
      )
      .subscribe({
        next: async (session) => {
          const stripe = await this.stripePromise;
          if (stripe) {
            stripe.redirectToCheckout({ sessionId: session.id });
          }
        },
        error: (err) => {
          this.message =
            err.error?.errors?.[0]?.msg ||
            'Subscription failed: ' + err.message;
        },
      });
  }

  // DELETED getSubscriptions() method

  // DELETED cancelSubscription() method

  submitDonation() {
    if (this.donationAmount <= 0) {
      this.message = 'Please enter a valid amount.';
      return;
    }

    this.http
      .post<{ id: string }>(
        'http://localhost:3000/api/create-checkout-session',
        {
          amount: this.donationAmount,
        }
      )
      .subscribe({
        next: async (session) => {
          const stripe = await this.stripePromise;
          if (stripe) {
            stripe.redirectToCheckout({ sessionId: session.id });
          } else {
            this.message = 'Stripe could not be loaded.';
          }
        },
        error: (error) => {
          this.message = 'Failed to create checkout session: ' + error.message;
        },
      });
  }

  ngOnInit() {
    // We now fetch the donations and check for a stripe_customer_id
    // to decide if the "Manage Billing" button should appear.
    this.http
      .get<{
        message: string;
        user: User & { stripe_customer_id?: string };
        donations: Donation[];
      }>('http://localhost:3000/api/user/dashboard')
      .subscribe({
        next: (response) => {
          this.message = response.message;
          this.user = response.user;
          this.donations = response.donations;
          // Check if the user has a stripe_customer_id. If so, they might have subscriptions.
          if (response.user && response.user.stripe_customer_id) {
            this.hasSubscriptions = true;
          }
        },
        error: (error) => {
          this.message = 'Access denied or error occured' + error.message;
          this.user = null;
        },
      });
  }
}
