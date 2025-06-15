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
  selectedAnimal: any = null;

  animals = [
    {
      name: 'Luna',
      image: 'https://placekitten.com/600/600',
      description:
        'Luna is a playful and curious kitten who loves sunshine and cuddles.',
    },
    {
      name: 'Charlie',
      image: 'https://placedog.net/600/600?id=1',
      description:
        'Charlie is a gentle dog who enjoys long walks and belly rubs.',
    },
    {
      name: 'Bella',
      image: 'https://placekitten.com/601/601',
      description:
        'Bella is an elegant cat who spends her days lounging and purring.',
    },
    {
      name: 'Oscar',
      image: 'https://placedog.net/601/601?id=2',
      description: 'Oscar is a loyal and energetic companion with a big heart.',
    },
    {
      name: 'Milo',
      image: 'https://placebear.com/600/600',
      description: 'Milo is a calm and curious bear who loves honey and naps.',
    },
    {
      name: 'Nina',
      image: 'https://loremflickr.com/600/600/animal',
      description: 'Nina is a graceful animal full of charm and curiosity.',
    },
  ];

  openModal(animal: any) {
    this.selectedAnimal = animal;
  }

  closeModal() {
    this.selectedAnimal = null;
  }
}
