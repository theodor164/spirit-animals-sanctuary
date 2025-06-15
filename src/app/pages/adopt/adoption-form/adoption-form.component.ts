import { Component } from '@angular/core';
import { NgFor, NgIf, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-adoption-form',
  standalone: true,
  imports: [NgFor, NgOptimizedImage, RouterModule, NgIf],
  templateUrl: './adoption-form.component.html',
  styleUrl: './adoption-form.component.css',
})
export class AdoptionFormComponent {
  selectedAnimal: any = null;

  animals = [
    {
      name: 'Luna',
      description: 'Gentle and curious goat who loves cuddles.',
      image: 'https://bigpicturefarm.com/cdn/shop/products/ec78f653cc58acb67d851eacbc5942ee.jpg?v=1515716497',
    },
    {
      name: 'Bella',
      description: 'A sweet sheep who enjoys sunbathing and grass naps.',
      image: 'https://rootstothemoon.co.uk/wp-content/uploads/2023/04/sheep-Bella-sheep-2.jpeg',
    },
    {
      name: 'Milo',
      description: 'Friendly pig with a playful personality.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQPIju3tClicrfvJigFiRDB6ao2UY1JtlAUA&s',
    },
    {
      name: 'Rina',
      description: 'Quiet but affectionate cow who loves apples.',
      image: 'https://www.singulart.com/images/artworks/v2/cropped/65078/main/zoom/2329603_b00a3d53d11316274c18cee28bbb7ec0.jpeg',
    },
  ];

  selectAnimal(animal: any) {
    this.selectedAnimal = animal;
  }
}
