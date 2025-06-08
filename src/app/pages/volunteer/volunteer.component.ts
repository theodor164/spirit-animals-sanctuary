import { NgFor, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-volunteer',
  imports: [NgOptimizedImage, RouterModule, NgFor],
  templateUrl: './volunteer.component.html',
  styleUrl: './volunteer.component.css',
})
export class VolunteerComponent {
  images: string[] = [
    'https://spiritanimals.ro/wp-content/uploads/2023/06/Caprita-Icon@4x.png',
    'https://spiritanimals.ro/wp-content/uploads/2023/06/Love-2@4x.png',
    'https://spiritanimals.ro/wp-content/uploads/2023/06/Caprita-Icon@4x.png',
    'https://spiritanimals.ro/wp-content/uploads/2023/06/Caprita-Icon@4x.png',
  ];
}
