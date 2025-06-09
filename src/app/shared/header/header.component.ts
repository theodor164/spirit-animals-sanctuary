import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav } from '@angular/material/sidenav';
import { NgIf } from '@angular/common';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-header',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    RouterModule,
    MatIconModule,
    NgIf,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Input() drawer!: MatSidenav;

  constructor(private authService: AuthService) {}

  toggleDrawer(): void {
    if (this.drawer) {
      this.drawer.toggle();
    }
  }

  logout(): void {
    this.authService.logout();
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
