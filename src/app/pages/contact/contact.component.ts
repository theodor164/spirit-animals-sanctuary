import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  form = {
    name: '',
    email: '',
    message: '',
  };

  onSubmit() {
    console.log('Form submitted:', this.form);
    alert('Thank you for your message!');
    this.form = { name: '', email: '', message: '' };
  }
}
