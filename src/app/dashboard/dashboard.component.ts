import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common'; // Combined imports
import { FormsModule } from '@angular/forms';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { ActivatedRoute } from '@angular/router'; // Import ActivatedRoute

// --- These interfaces are no longer needed here ---
// interface StripeSubscription { ... }
// interface DbSubscription { ... }

// --- FIX: Update the User interface ---
interface User {
  id: number;
  name: string;
  email: string;
  hasLocalPassword?: boolean; // This property is now expected
  requiresTermsAcceptance?: boolean; // Noul flag de la backend
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

  // --- NEW: Properties for the change password form ---
  changePasswordData = {
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  };

  // NOU: Proprietate pentru a gestiona tab-ul activ
  activeTab: 'donations' | 'settings' | 'makeDonation' = 'donations';

  // NOU: Proprietate pentru a controla vizibilitatea modal-ului
  showTermsModal: boolean = false;

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.stripePromise = loadStripe(
      'pk_test_51OHSZJJtqR3ifyMoetq4CdyKvrTWgozhmSdkf26pNrcjAqi5tNYmlSBmz8DRit8MHkuqBjPMpa5ouL9vawlgCv1r00RytXbZ9S'
    );
  }

  // NOU: Funcție pentru a schimba tab-ul activ
  setActiveTab(tab: 'donations' | 'settings' | 'makeDonation') {
    this.activeTab = tab;
    this.message = ''; // Resetează mesajele la schimbarea tab-ului
  }

  // --- NEW: Method to handle password change ---
  changePassword() {
    this.message = ''; // Clear previous messages
    if (
      this.changePasswordData.newPassword !==
      this.changePasswordData.confirmNewPassword
    ) {
      this.message = 'Parolele noi nu se potrivesc.';
      return;
    }
    if (this.changePasswordData.newPassword.length < 6) {
      this.message = 'Noua parolă trebuie să aibă cel puțin 6 caractere.';
      return;
    }

    this.http
      .post<{ message: string }>(
        'https://spirit-animals-sanctuary-backend.onrender.com/api/user/change-password',
        {
          currentPassword: this.changePasswordData.currentPassword,
          newPassword: this.changePasswordData.newPassword,
        }
      )
      .subscribe({
        next: (response) => {
          this.message = response.message;
          // Clear the form fields on success
          this.changePasswordData = {
            currentPassword: '',
            newPassword: '',
            confirmNewPassword: '',
          };
        },
        error: (err) => {
          this.message =
            err.error?.errors?.[0]?.msg || 'Nu am putut schimba parola.';
        },
      });
  }

  redirectToCustomerPortal() {
    this.http
      .post<{ url: string }>(
        'https://spirit-animals-sanctuary-backend.onrender.com/api/create-customer-portal-session',
        {}
      )
      .subscribe({
        next: (session) => {
          window.location.href = session.url;
        },
        error: (err) => {
          this.message = 'Nu am putut deschide portalul de plăți.';
          console.error('Portal session error:', err);
        },
      });
  }

  startSubscription() {
    if (!this.subscriptionAmount || this.subscriptionAmount < 10) {
      this.message = 'Donația lunară trebuie să fie de cel puțin 10 LEI.';
      return;
    }
    this.http
      .post<{ id: string }>(
        'https://spirit-animals-sanctuary-backend.onrender.com/api/create-subscription-session',
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
      this.message = 'Vă rugăm introduceți o sumă validă.';
      return;
    }

    this.http
      .post<{ id: string }>(
        'https://spirit-animals-sanctuary-backend.onrender.com/api/create-checkout-session',
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
          this.message = 'Crearea sesiunii de plată a eșuat.' + error.message;
        },
      });
  }

  // --- Metoda acceptTerms actualizată ---
  acceptTerms() {
    // Apelăm noua rută de pe backend
    this.http
      .post(
        'https://spirit-animals-sanctuary-backend.onrender.com/api/user/accept-terms',
        {}
      )
      .subscribe({
        next: () => {
          // Doar după ce backend-ul confirmă succesul, închidem fereastra
          this.showTermsModal = false;
          // Reîmprospătăm starea utilizatorului pentru a ascunde permanent fereastra
          if (this.user) {
            this.user.requiresTermsAcceptance = false;
          }
        },
        error: (err) => {
          // Afișăm o eroare dacă ceva nu a funcționat
          console.error('Failed to accept terms', err);
          this.message = 'A apărut o eroare. Vă rugăm să reîncercați.';
        },
      });
  }

  ngOnInit() {
    // --- MODIFICARE: Verificăm parametrul din URL înainte de orice altceva ---
    const tabFromUrl = this.route.snapshot.queryParamMap.get('tab');
    if (tabFromUrl === 'makeDonation') {
      this.activeTab = 'makeDonation';
    }

    this.http
      .get<{
        message: string;
        user: User & { stripe_customer_id?: string };
        donations: Donation[];
      }>(
        'https://spirit-animals-sanctuary-backend.onrender.com/api/user/dashboard'
      )
      .subscribe({
        next: (response) => {
          this.message = response.message;
          this.user = response.user;
          this.donations = response.donations;

          // --- FIX: Logica a fost separată pentru claritate și corectitudine ---

          // Pasul 1: Verificăm dacă utilizatorul trebuie să accepte termenii.
          // Această verificare se face pentru TOȚI utilizatorii, indiferent dacă au abonamente sau nu.
          if (this.user && this.user.requiresTermsAcceptance) {
            this.showTermsModal = true;
          }

          // Pasul 2: Verificăm dacă utilizatorul are un ID de client Stripe
          // pentru a afișa butonul "Manage Billing".
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
