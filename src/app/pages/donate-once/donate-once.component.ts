import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-donate-once',
  imports: [NgFor, FormsModule],
  templateUrl: './donate-once.component.html',
  styleUrl: './donate-once.component.css',
})
export class DonateOnceComponent {
  predefinedAmounts = [10, 25, 50, 100];
  selectedAmount: number | null = null;
  customAmount: number | null = null;

  form = {
    name: '',
    email: '',
  };

  selectAmount(amount: number) {
    this.selectedAmount = amount;
    this.customAmount = null;
  }

  updateSelectedAmount() {
    this.selectedAmount = this.customAmount;
  }

  submitDonation() {
    if (!this.selectedAmount || this.selectedAmount <= 0) {
      alert('Please enter a valid donation amount.');
      return;
    }

    console.log('Donation details:', {
      name: this.form.name,
      email: this.form.email,
      amount: this.selectedAmount,
    });

    alert(
      `Thank you, ${this.form.name}, for your generous donation of €${this.selectedAmount}!`
    );
    this.form = { name: '', email: '' };
    this.selectedAmount = null;
    this.customAmount = null;
  }
}
