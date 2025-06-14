import { NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { loadStripe, Stripe } from '@stripe/stripe-js'; // Import Stripe

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

interface StripeSubscription {
  id: string;
  status: string;
  current_period_end: number;
  plan: {
    product: {
      name: string;
    };
  };
  items: {
    data: any[];
  };
}

interface DbSubscription {
  stripe_subscription_id: string;
  status: string;
  created_at: string;
  cancelled_at: string | null;
}

@Component({
  selector: 'app-dashboard',
  imports: [NgIf, NgFor, CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  message = '';
  user: User | null = null;
  donations: Donation[] = [];
  donationAmount: number = 10;
  showDonationForm: boolean = false;
  stripePromise: Promise<Stripe | null>;

  // NEW: Property for the custom monthly donation amount
  subscriptionAmount: number = 25; // Default monthly amount

  stripeSubscriptions: StripeSubscription[] = [];
  dbSubscriptions: DbSubscription[] = [];

  constructor(private http: HttpClient) {
    this.stripePromise = loadStripe(
      'pk_test_51OHSZJJtqR3ifyMoetq4CdyKvrTWgozhmSdkf26pNrcjAqi5tNYmlSBmz8DRit8MHkuqBjPMpa5ouL9vawlgCv1r00RytXbZ9S'
    );
  }

  toggleDonationForm() {
    this.showDonationForm = !this.showDonationForm;
  }

  startSubscription() {
    // Frontend check for minimum amount
    if (!this.subscriptionAmount || this.subscriptionAmount < 5) {
      this.message = 'Monthly donation must be at least 5 RON.';
      return;
    }

    // UPDATED: Send the custom amount in the request body
    this.http
      .post<{ id: string }>(
        'http://localhost:3000/api/create-subscription-session',
        { amount: this.subscriptionAmount } // Send custom amount
      )
      .subscribe({
        next: async (session) => {
          const stripe = await this.stripePromise;
          if (stripe) {
            stripe.redirectToCheckout({ sessionId: session.id });
          }
        },
        error: (err) => {
          // This will now catch validation errors from the backend too
          this.message =
            err.error?.errors?.[0]?.msg ||
            'Subscription failed: ' + err.message;
        },
      });
  }

  getSubscriptions() {
    this.http
      .get<{
        subscriptions: StripeSubscription[];
        dbSubscriptions: DbSubscription[];
      }>('http://localhost:3000/api/subscriptions')
      .subscribe({
        next: (res) => {
          this.stripeSubscriptions = res.subscriptions;
          this.dbSubscriptions = res.dbSubscriptions;
        },
        error: (err) => {
          console.error('Error fetching subscriptions:', err.message);
        },
      });
  }

  cancelSubscription(subscriptionId: string) {
    this.http
      .post('http://localhost:3000/api/subscriptions/cancel', {
        subscriptionId,
      })
      .subscribe({
        next: () => {
          this.getSubscriptions();
          this.message = 'Subscription cancelled successfully.';
        },
        error: (err) => {
          console.error('Failed to cancel:', err.message);
        },
      });
  }

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
    this.http
      .get<{ message: string; user: User; donations: Donation[] }>(
        'http://localhost:3000/api/user/dashboard'
      )
      .subscribe({
        next: (response) => {
          this.message = response.message;
          this.user = response.user;
          this.donations = response.donations;
          if (this.user) {
            this.getSubscriptions();
          }
        },
        error: (error) => {
          this.message = 'Access denied or error occured' + error.message;
          this.user = null;
        },
      });
  }
}
