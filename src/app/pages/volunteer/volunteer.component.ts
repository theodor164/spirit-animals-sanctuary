import { NgFor, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-volunteer',
  imports: [NgOptimizedImage, RouterModule, NgFor, RouterLink],
  templateUrl: './volunteer.component.html',
  styleUrl: './volunteer.component.css',
})
export class VolunteerComponent {
  images: string[] = [
    'https://spiritanimals.ro/wp-content/uploads/2023/06/received_109045552191583-2.webp',
    'https://spiritanimals.ro/wp-content/uploads/2023/06/received_948878836428957-1024x683-290x379.jpg',
    'https://spiritanimals.ro/wp-content/uploads/2023/06/332489732_589908163153933_8834787529273301537_n.webp',
    'https://spiritanimals.ro/wp-content/uploads/2023/06/350944195_1002827670709851_4848279126552609894_n-290x370.webp',
  ];
}
