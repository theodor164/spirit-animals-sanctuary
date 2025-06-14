import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-donate',
  imports: [RouterModule, NgIf, CommonModule],
  templateUrl: './donate.component.html',
  styleUrl: './donate.component.css',
})
export class DonateComponent {
  constructor(private authService: AuthService) {}

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
