import { NgIf } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Router, RouterLink } from '@angular/router';
import { NgxCaptchaModule, InvisibleReCaptchaComponent } from 'ngx-captcha'; // 1. Ensure this import is here
// 2. Import the NgxCaptchaModule in your app.module.ts or app.config.ts
//    and add it to the imports array if you're using a module-based approach
//    or to the providers array if you're using a standalone component approach

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, NgIf, NgxCaptchaModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  // Get a reference to the captcha element from the template
  @ViewChild('captchaElem') captchaElem!: InvisibleReCaptchaComponent;

  passwordsMatch = true;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  // A temporary variable to hold our form data
  private formData: NgForm | null = null;

  // NEW: Property for the checkbox
  agreedToTerms: boolean = false;

  // Your reCAPTCHA v3 Site Key from the Google Console
  // Remember to replace 'YOUR_RECAPTCHA_V3_SITE_KEY' with your actual key
  recaptchaSiteKey = '6Ldr-2ErAAAAADW1yRNfbiY1Wu3LI_UYXRg2v2Q2';

  constructor(private authService: AuthService, private router: Router) {}

  checkPasswordMatch(password: string, confirmPassword: string) {
    this.passwordsMatch = password === confirmPassword;
  }

  // 1. This new function is called when the user CLICKS the register button
  handleRegistrationClick(form: NgForm) {
    this.errorMessage = null;

    if (form.invalid || !this.passwordsMatch) {
      this.errorMessage =
        'Please ensure all fields are filled out correctly and passwords match.';
      return;
    }

    // You can add an extra check here if you want
    if (!this.agreedToTerms) {
      this.errorMessage =
        'You must agree to the Terms and Privacy Policy to register.';
      return;
    }

    // Store the form data and execute the captcha
    this.formData = form;
    this.captchaElem.execute();
  }

  // 2. This function is called automatically when the captcha succeeds
  handleRecaptchaSuccess(token: string) {
    if (!this.formData) {
      return; // Should not happen
    }

    // Combine form data with the new reCAPTCHA token
    const registrationData = {
      ...this.formData.value,
      recaptcha: token,
    };

    // 3. Now we call the AuthService to complete the registration
    this.authService.register(registrationData).subscribe({
      next: (response) => {
        this.successMessage =
          'Registration successful! Please check your email for verification.';
        this.errorMessage = null;
        this.formData?.reset();
        setTimeout(() => this.router.navigate(['/login']), 3000);
      },
      error: (error) => {
        this.errorMessage =
          error.error?.errors?.[0]?.msg ||
          'Registration failed. Please try again.';
        this.successMessage = null;
        // --- THIS IS THE FIX ---
        // The correct method to reset the captcha is .resetCaptcha()
        this.captchaElem.resetCaptcha(); // Reset captcha on error
      },
    });
  }
}
