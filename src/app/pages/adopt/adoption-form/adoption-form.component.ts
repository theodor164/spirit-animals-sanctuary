import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Definim o interfață simplă pentru imaginile din galerie
interface GalleryImage {
  src: string;
  alt: string;
}

@Component({
  selector: 'app-adoption',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './adoption-form.component.html',
  styleUrls: ['./adoption-form.component.css'],
})
export class AdoptionFormComponent {
  // Lista de imagini pentru galeria de la finalul paginii
  galleryImages: GalleryImage[] = [
    {
      src: '/assets/images/adoption/adopta-2.jpg',
      alt: 'Vacuta cu ochi blânzi, simbol al iubirii și al grijii',
    },
    {
      src: '/assets/images/adoption/adopta-3.jpg',
      alt: 'Vacuta cu ochii mari și blânzi, simbol al iubirii și al grijii',
    },
    {
      src: '/assets/images/adoption/adopta-4.jpg',
      alt: 'vacuta cu nicusor',
    },
    {
      src: '/assets/images/adoption/adopta-5.jpg',
      alt: 'Moment de tandrețe între un om și animal',
    },
    {
      src: '/assets/images/adoption/adopta-6.jpg',
      alt: 'Efrem, gardianul nostru, îngrijind animalele',
    },
    {
      src: '/assets/images/adoption/adopta-7.jpg',
      alt: 'Neytiri si Stela',
    },
  ];
}
