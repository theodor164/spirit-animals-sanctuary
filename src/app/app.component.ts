import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {
  RouterLink,
  RouterModule,
  RouterOutlet,
  Router,
  NavigationEnd,
} from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import {
  MatSidenav,
  MatSidenavContainer,
  MatSidenavContent,
  MatSidenavModule,
} from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BreakpointObserver } from '@angular/cdk/layout';
import { NgIf } from '@angular/common';
import { AuthService } from './auth.service';
import { TestModeBannerComponent } from './components/test-mode-banner/test-mode-banner.component';
import { CookieConsentBannerComponent } from './components/cookie-consent-banner/cookie-consent-banner.component';
// NOU: Am adăugat operatorul filter
import { filter } from 'rxjs/operators';

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
    TestModeBannerComponent,
    CookieConsentBannerComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements AfterViewInit {
  @ViewChild('drawer') drawer!: MatSidenav;

  // NOU: Obținem o referință la containerul de conținut din HTML
  @ViewChild('content') content!: MatSidenavContent;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private router: Router // NOU: Injectăm Router
  ) {
    // NOU: Adăugăm logica de ascultare a evenimentelor de navigare
    this.router.events
      .pipe(
        // Ne interesează doar evenimentul de finalizare a navigării
        filter((event) => event instanceof NavigationEnd)
      )
      .subscribe(() => {
        // Forțăm scroll-ul la începutul containerului de conținut
        if (this.content) {
          this.content.getElementRef().nativeElement.scrollTop = 0;
        }
      });
  }

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
