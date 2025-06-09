import { NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  imports: [NgIf, NgFor, CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  message = '';
  user: User | null = null;
  donations: Donation[] = [];
  donationAmount: number = 0;
  showDonationForm: boolean = false;

  constructor(private http: HttpClient) {}

  toggleDonationForm() {
    this.showDonationForm = !this.showDonationForm;
  }

  submitDonation() {
    if (this.donationAmount <= 0) {
      return;
    }

    this.http.post('http://localhost:3000/api/donations', {
      amount: this.donationAmount,
    }).subscribe({
      next: () => {
        this.message = 'Thamk you for your donation!';
        this.donationAmount = 0;
        this.showDonationForm = false;
        // Optionally, you can refresh the donations list
        this.ngOnInit();
      },
      error: (error) => {
        this.message = 'Donation failed: ' + error.message;
      }
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
        },
        error: (error) => {
          this.message = 'Access denied or error occured' + error.message;
          this.user = null;
        },
      });
  }
}
