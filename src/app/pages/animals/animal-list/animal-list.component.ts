import { Component } from '@angular/core';
import { NgFor, NgIf, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-animal-list',
  imports: [NgOptimizedImage, RouterModule, NgFor, NgIf],
  templateUrl: './animal-list.component.html',
  styleUrl: './animal-list.component.css',
})
export class AnimalListComponent {
  animals = [
    {
      name: 'Caprita',
      thumbnail:
        'https://spiritanimals.ro/wp-content/uploads/2023/08/363427131_672053981634517_6459136923972407307_n-2.webp',
      full: 'https://spiritanimals.ro/wp-content/uploads/2023/08/363427131_672053981634517_6459136923972407307_n-2.webp',
    },
    {
      name: 'Calut',
      thumbnail:
        'https://spiritanimals.ro/wp-content/uploads/2023/06/328737775_507508738241035_7029562333189319196_n.jpg',
      full: 'https://spiritanimals.ro/wp-content/uploads/2023/06/328737775_507508738241035_7029562333189319196_n.jpg',
    },
    // Add more animals here
  ];

  currentIndex: number = 0;
  lightboxOpen: boolean = false;

  openLightbox(index: number) {
    this.currentIndex = index;
    this.lightboxOpen = true;
  }

  closeLightbox(event?: MouseEvent) {
    if (
      event &&
      (event.target as HTMLElement).classList.contains('lightbox-content')
    )
      return;
    this.lightboxOpen = false;
  }

  prevImage() {
    this.currentIndex =
      (this.currentIndex - 1 + this.animals.length) % this.animals.length;
  }

  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.animals.length;
  }
}
