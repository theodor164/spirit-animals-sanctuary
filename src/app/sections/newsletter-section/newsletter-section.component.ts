import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-newsletter-section',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './newsletter-section.component.html',
  styleUrls: ['./newsletter-section.component.css'],
})
export class NewsletterSectionComponent {
  message: string = '';
  isError: boolean = false;
  isLoading: boolean = false;

  constructor(private http: HttpClient) {}

  subscribe(form: NgForm): void {
    if (form.invalid) {
      this.isError = true;
      this.message = 'Vă rugăm să introduceți o adresă de e-mail validă.';
      return;
    }

    this.isLoading = true;
    this.isError = false;
    this.message = '';

    const email = form.value.email;

    // Apelăm un nou endpoint pe backend, pe care va trebui să îl creăm
    this.http
      .post<{ message: string }>(
        'https://spirit-animals-sanctuary-backend.onrender.com/api/newsletter/subscribe',
        { email }
      )
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          this.isError = false;
          this.message = response.message;
          form.reset();
        },
        error: (err) => {
          this.isLoading = false;
          this.isError = true;
          this.message =
            err.error?.errors?.[0]?.msg ||
            'A apărut o eroare. Vă rugăm să reîncercați.';
        },
      });
  }
}
