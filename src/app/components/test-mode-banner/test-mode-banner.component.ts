import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-test-mode-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './test-mode-banner.component.html',
  styleUrls: ['./test-mode-banner.component.css'],
})
export class TestModeBannerComponent implements OnInit {
  isVisible: boolean = true;

  ngOnInit(): void {
    // Verificăm dacă utilizatorul a închis deja banner-ul în această sesiune
    if (sessionStorage.getItem('testBannerDismissed') === 'true') {
      this.isVisible = false;
    }
  }

  dismissBanner(): void {
    // Ascundem banner-ul și memorăm acest lucru în sessionStorage
    this.isVisible = false;
    sessionStorage.setItem('testBannerDismissed', 'true');
  }
}
