import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule, NgFor, NgIf, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';

// NOU: O interfață curată pentru a stoca toate datele unei imagini
interface GalleryImage {
  thumbnail: string;
  full: string;
  alt: string;
}

@Component({
  selector: 'app-volunteer-section',
  standalone: true,
  imports: [NgOptimizedImage, RouterModule, NgFor, NgIf, CommonModule],
  templateUrl: './volunteer-section.component.html',
  styleUrls: ['./volunteer-section.component.css'],
})
export class VolunteerSectionComponent {
  // NOU: Un singur array de obiecte, mai curat și mai ușor de gestionat
  gallery: GalleryImage[] = [
    {
      thumbnail:
        'assets/images/home-page-photo-3-small.jpg',
      full: 'assets/images/home-page-photo-3.jpg',
      alt: 'Voluntar hrănind un animal la sanctuar',
    },
    {
      thumbnail:
        'assets/images/home-page-photo-4-small.webp',
      full: 'assets/images/home-page-photo-4.webp',
      alt: 'Grup de voluntari la sanctuar',
    },
    {
      thumbnail:
        'assets/images/home-page-photo-5-small.jpg',
      full: 'assets/images/home-page-photo-5.jpg',
      alt: 'Interacțiune plină de bucurie între un voluntar și un câine',
    },
    {
      thumbnail:
        'assets/images/home-page-photo-6-small.jpg',
      full: 'assets/images/home-page-photo-6.jpg',
      alt: 'Îngrijirea unui animal la sanctuar',
    },
  ];

  currentIndex: number = 0;
  lightboxOpen: boolean = false;

  @ViewChild('lightboxContent') lightboxContent!: ElementRef;

  openLightbox(index: number): void {
    this.currentIndex = index;
    this.lightboxOpen = true;
  }

  closeLightbox(): void {
    this.lightboxOpen = false;
  }

  prevImage(): void {
    this.currentIndex =
      this.currentIndex > 0 ? this.currentIndex - 1 : this.gallery.length - 1;
  }

  nextImage(): void {
    this.currentIndex =
      this.currentIndex < this.gallery.length - 1 ? this.currentIndex + 1 : 0;
  }

  onBackdropClick(event: MouseEvent): void {
    if (
      this.lightboxContent &&
      !this.lightboxContent.nativeElement.contains(event.target)
    ) {
      this.closeLightbox();
    }
  }
}
