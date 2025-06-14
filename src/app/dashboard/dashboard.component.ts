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

// NEW, CORRECTED INTERFACE
interface StripeSubscription {
  id: string;
  status: string;
  current_period_end: number;
  // The 'plan' object is now at the top level of the subscription
  plan: {
    product: {
      name: string;
    };
  };
  // We keep 'items' in case Stripe still sends it
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
  donationAmount: number = 10; // Default donation amount
  showDonationForm: boolean = false;
  stripePromise: Promise<Stripe | null>;
  subscriptions: any[] = [];

  // Updated state to hold both subscription types
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
    this.http
      .post<{ id: string }>(
        'http://localhost:3000/api/create-subscription-session',
        {}
      )
      .subscribe({
        next: async (session) => {
          const stripe = await this.stripePromise;
          if (stripe) {
            stripe.redirectToCheckout({ sessionId: session.id });
          }
        },
        error: (err) => {
          this.message = 'Subscription failed: ' + err.message;
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
          this.getSubscriptions(); // Refresh list
          this.stripeSubscriptions = this.stripeSubscriptions.filter(
            (sub) => sub.id !== subscriptionId
          );
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

    // This is the equivalent of the fetch call in Angular
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
            // Redirect to Stripe Checkout
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
            this.getSubscriptions(); // Fetch subscriptions for the user
          }
        },
        error: (error) => {
          this.message = 'Access denied or error occured' + error.message;
          this.user = null;
        },
      });
  }
}
