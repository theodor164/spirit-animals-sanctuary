import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-volunteer-section',
  imports: [NgOptimizedImage, RouterModule, NgFor, NgIf],
  templateUrl: './volunteer-section.component.html',
  styleUrl: './volunteer-section.component.css',
})
export class VolunteerSectionComponent {
  images: string[] = [
    'https://spiritanimals.ro/wp-content/uploads/2023/07/IMG_20230710_183042-768x1024-400x300.jpg',
    'https://spiritanimals.ro/wp-content/uploads/2023/08/363427131_672053981634517_6459136923972407307_n-2-1024x688-400x300.webp',
    'https://spiritanimals.ro/wp-content/uploads/2023/07/20230710_194624-2048x1536.jpg',
    'https://spiritanimals.ro/wp-content/uploads/2023/07/IMG_20230710_184549-768x1024-400x300.jpg',
  ];

  imagesScaled: string[] = [
    'https://spiritanimals.ro/wp-content/uploads/2023/07/IMG_20230710_183042-scaled.jpg',
    'https://spiritanimals.ro/wp-content/uploads/2023/08/363427131_672053981634517_6459136923972407307_n-2.webp',
    'https://spiritanimals.ro/wp-content/uploads/2023/07/20230710_194624-scaled.jpg',
    'https://spiritanimals.ro/wp-content/uploads/2023/07/IMG_20230710_184549-scaled.jpg',
  ];

  imageWidths: number[] = [720, 1431, 1281, 720];
  imageHeights: number[] = [961, 961, 961, 961];

  currentIndex: number | null = 0;
  lightboxOpen: boolean = false;

  openLightbox(index: number) {
    this.currentIndex = index;
    this.lightboxOpen = true;
  }

  closeLightbox() {
    this.lightboxOpen = false;
  }

  prevImage() {
    if (this.currentIndex !== null) {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      } else {
        this.currentIndex = this.images.length - 1; // Loop to the last image
      }
    }
  }

  nextImage() {
    if (this.currentIndex !== null) {
      if (this.currentIndex < this.images.length - 1) {
        this.currentIndex++;
      } else {
        this.currentIndex = 0; // Loop to the first image
      }
    }
  }

  @ViewChild('lightboxContent') lightboxContent!: ElementRef;

  onBackdropClick(event: MouseEvent) {
  const clickedInside = this.lightboxContent.nativeElement.contains(event.target);
  if (!clickedInside) {
    this.closeLightbox();
  }
}
}
