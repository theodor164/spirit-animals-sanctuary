import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Importăm RouterModule pentru routerLink

// Interfețe pentru structurarea datelor
interface Activity {
  icon: string;
  title: string;
  description: string;
}

interface ApplicationStep {
  step: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-volunteer',
  standalone: true,
  imports: [CommonModule, RouterModule], // Adăugăm RouterModule la imports
  templateUrl: './volunteer.component.html',
  styleUrls: ['./volunteer.component.css'],
})
export class VolunteerComponent {
  // Datele pentru secțiunile interactive rămân
  activities: Activity[] = [
    {
      icon: '❤️',
      title: 'Îngrijire Zilnică',
      description:
        'Asigurarea hranei, apei proaspete și curățeniei în spațiile animalelor. Este fundația bunăstării lor.',
    },
    {
      icon: '🎾',
      title: 'Socializare și Joacă',
      description:
        'Timpul petrecut cu animalele, oferindu-le afecțiune și joacă, este vital pentru sănătatea lor emoțională.',
    },
    {
      icon: '🚗',
      title: 'Ajutor la Transport',
      description:
        'Asistarea cu transportul animalelor la vizitele veterinare programate sau în caz de urgențe.',
    },
    {
      icon: '🔨',
      title: 'Mici Reparații',
      description:
        'Ajutor la întreținerea și repararea adăposturilor, gardurilor și a altor facilități ale sanctuarului.',
    },
    {
      icon: '📸',
      title: 'Promovare și Evenimente',
      description:
        'Realizarea de fotografii, ajutor la gestionarea rețelelor sociale sau participarea la evenimente de strângere de fonduri.',
    },
    {
      icon: '🌿',
      title: 'Întreținere Spații Verzi',
      description:
        'Ajutor la curățarea și întreținerea terenului sanctuarului pentru a oferi un mediu curat și sigur.',
    },
  ];

  applicationSteps: ApplicationStep[] = [
    {
      step: '01',
      title: 'Completează Formularul de Contact',
      description:
        'Folosește formularul nostru de contact pentru a ne spune că ești interesat și pentru a ne oferi informații de bază.',
    },
    {
      step: '02',
      title: 'Discuție Inițială',
      description:
        'Te vom contacta pentru o scurtă conversație telefonică sau online pentru a discuta așteptările și disponibilitatea.',
    },
    {
      step: '03',
      title: 'Orientare la Sanctuar',
      description:
        'Vei participa la o sesiune de orientare la sanctuar pentru a cunoaște echipa, regulile și, desigur, animalele!',
    },
  ];

  // Restul logicii pentru formular a fost eliminat.
}
