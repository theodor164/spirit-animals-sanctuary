import { CommonModule, NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-donate',
  imports: [RouterModule, NgIf, NgFor, CommonModule],
  templateUrl: './donate.component.html',
  styleUrl: './donate.component.css',
})
export class DonateComponent {
  ranking: { name: string; total: number }[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get<{ name: string; total: number }[]>(
        'http://localhost:3000/api/donations/ranking'
      )
      .subscribe({
        next: (data) => (this.ranking = data),
        error: (error) => console.error('Failed to load ranking', error),
      });
  }
}
