import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [FormsModule, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  passwordsMatch = true;

  checkPasswordMatch(password: string, confirmPassword: string) {
    this.passwordsMatch = password === confirmPassword;
  }

  onSubmit(form: NgForm) {
    if (form.valid && this.passwordsMatch) {
      console.log('Registration data:', form.value);
      // TODO: call backend API here
    }
  }
}
