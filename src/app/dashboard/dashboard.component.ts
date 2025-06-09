import { NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


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
  imports: [NgIf, NgFor, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  message = '';
  user: User | null = null;
  donations: Donation[] = [];

  constructor(private http: HttpClient) {}

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
