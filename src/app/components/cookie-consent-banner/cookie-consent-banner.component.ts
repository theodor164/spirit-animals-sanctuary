import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-cookie-consent-banner',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './cookie-consent-banner.component.html',
  styleUrls: ['./cookie-consent-banner.component.css'],
})
export class CookieConsentBannerComponent implements OnInit {
  showBanner: boolean = false;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // Verificăm dacă codul rulează în browser, pentru a putea folosi localStorage în siguranță
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      // Afișăm banner-ul doar dacă nu găsim dovada consimțământului în localStorage
      if (localStorage.getItem('cookie_consent') !== 'true') {
        this.showBanner = true;
      }
    }
  }

  acceptCookies(): void {
    if (this.isBrowser) {
      // La acceptare, ascundem banner-ul și salvăm consimțământul
      this.showBanner = false;
      localStorage.setItem('cookie_consent', 'true');
    }
  }
}
