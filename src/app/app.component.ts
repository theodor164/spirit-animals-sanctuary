import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import {
  MatSidenav,
  MatSidenavContainer,
  MatSidenavContent,
} from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BreakpointObserver } from '@angular/cdk/layout';
import { NgIf } from '@angular/common';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    MatSidenavContainer,
    MatSidenav,
    MatIconModule,
    MatSidenavContent,
    MatButtonModule,
    RouterLink,
    RouterModule,
    NgIf,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements AfterViewInit {
  @ViewChild('drawer') drawer!: MatSidenav;

  constructor(private breakpointObserver: BreakpointObserver, private authService: AuthService) {}

  ngAfterViewInit(): void {
    this.breakpointObserver
      .observe(['(min-width: 810px)'])
      .subscribe((result) => {
        if (result.matches && this.drawer.opened) {
          this.drawer.close();
        }
      });
  }
  
  logout(): void {
    this.authService.logout();
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
