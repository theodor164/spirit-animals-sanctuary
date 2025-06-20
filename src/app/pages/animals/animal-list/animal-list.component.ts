import {
  Component,
  OnInit,
  Inject,
  PLATFORM_ID,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

interface Animal {
  id: number;
  name: string;
  status: string;
  imageUrl: string;
  isOverlayVisible?: boolean;
}

@Component({
  selector: 'app-animal-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './animal-list.component.html',
  styleUrls: ['./animal-list.component.css'],
})
export class AnimalListComponent implements OnInit {
  // NOU: Obținem o referință la containerul grilei din HTML
  @ViewChild('animalGrid') animalGrid!: ElementRef;

  // Lista completă cu toate animalele
  private allAnimals: Animal[] = [
    {
      id: 1,
      name: 'Amos',
      status: 'Caută o inima pe care sa o vindece',
      imageUrl: 'assets/images/animals/amos-1.jpg',
    },
    {
      id: 2,
      name: 'Lera',
      status: 'Caută un sponsor',
      imageUrl: 'assets/images/animals/lera-1.jpg',
    },
    {
      id: 3,
      name: 'Lyra',
      status: 'Caută un parinte adoptiv',
      imageUrl: 'assets/images/animals/lyra-1.jpg',
    },
    {
      id: 4,
      name: 'Annelie',
      status: 'Caută un sponsor',
      imageUrl: 'assets/images/animals/annelie-1.jpg',
    },
    {
      id: 5,
      name: 'Joy',
      status: 'Caută un sponsor',
      imageUrl: 'assets/images/animals/joy-1.jpg',
    },
    {
      id: 6,
      name: 'Neytiri',
      status: 'Caută un sponsor',
      imageUrl: 'assets/images/animals/neytiri-1.jpg',
    },
    {
      id: 7,
      name: 'Curly',
      status: 'Caută un sponsor',
      imageUrl: 'assets/images/animals/curly-1.jpg',
    },
    {
      id: 8,
      name: 'Pleiades',
      status: 'Caută un sponsor',
      imageUrl: 'assets/images/animals/pleiades-1.jpg',
    },
    {
      id: 9,
      name: 'Ikarus',
      status: 'Caută un sponsor',
      imageUrl: 'assets/images/animals/ikarus-1.jpg',
    },
    {
      id: 10,
      name: 'Seli',
      status: 'Caută un sponsor',
      imageUrl: 'assets/images/animals/seli-1.jpg',
    },
    {
      id: 11,
      name: 'Shilah',
      status: 'Caută un sponsor',
      imageUrl: 'assets/images/animals/shilah-1.jpg',
    },
    {
      id: 12,
      name: 'LiebeLula',
      status: 'Caută un sponsor',
      imageUrl: 'assets/images/animals/liebelula-1.jpg',
    },
    {
      id: 13,
      name: 'Alireza',
      status: 'Caută un sponsor',
      imageUrl: 'assets/images/animals/alireza-1.jpg',
    },
    {
      id: 14,
      name: 'Snowy',
      status: 'Caută un sponsor',
      imageUrl: 'assets/images/animals/snowy-1.jpg',
    },
    {
      id: 15,
      name: 'Bell',
      status: 'Caută un sponsor',
      imageUrl: 'assets/images/animals/bell-1.jpg',
    },
    {
      id: 16,
      name: 'Amaruq',
      status: 'Caută un sponsor',
      imageUrl: 'assets/images/animals/amaruq-1.jpg',
    },
    {
      id: 17,
      name: 'Arabelle',
      status: 'Caută un sponsor',
      imageUrl: 'assets/images/animals/arabelle-1.jpg',
    },
    {
      id: 18,
      name: 'Patrick',
      status: 'Caută un sponsor',
      imageUrl: 'assets/images/animals/patrick-2.jpg',
    },
  ];

  displayedAnimals: Animal[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 9;
  totalPages: number = 0;
  isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private elementRef: ElementRef // Injectăm ElementRef
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.totalPages = Math.ceil(this.allAnimals.length / this.itemsPerPage);
    this.updateDisplayedAnimals();
  }

  updateDisplayedAnimals(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedAnimals = this.allAnimals.slice(startIndex, endIndex);
  }

  // NOU: Funcție pentru a afișa/ascunde detaliile pe mobil
  toggleOverlay(selectedAnimal: Animal): void {
    const currentState = selectedAnimal.isOverlayVisible;
    // Mai întâi, ascundem toate celelalte overlay-uri pentru a avea doar unul activ
    this.displayedAnimals.forEach((animal) => {
      animal.isOverlayVisible = false;
    });
    // Apoi, comutăm starea celui selectat
    selectedAnimal.isOverlayVisible = !currentState;
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.currentPage = page;
      this.updateDisplayedAnimals();

      // --- AICI ESTE MODIFICAREA ---
      // Verificăm dacă suntem în browser și apoi facem scroll
      if (this.isBrowser) {
        // --- MODIFICARE: Verificăm dacă elementul animalGrid există înainte de a face scroll ---
        if (this.animalGrid) {
          this.animalGrid.nativeElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }
    }
  }

  get pages(): number[] {
    return Array(this.totalPages)
      .fill(0)
      .map((x, i) => i + 1);
  }
}
