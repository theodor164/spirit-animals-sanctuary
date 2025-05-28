import { Routes } from '@angular/router';
import { AdoptionFormComponent } from './pages/adopt/adoption-form/adoption-form.component';
import { AnimalDetailComponent } from './pages/animals/animal-detail/animal-detail.component';
import { AnimalListComponent } from './pages/animals/animal-list/animal-list.component';
import { ContactComponent } from './pages/contact/contact.component';
import { DonateComponent } from './pages/donate/donate.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'animals', component: AnimalListComponent },
  { path: 'animals/:id', component: AnimalDetailComponent },
  { path: 'adopt', component: AdoptionFormComponent },
  { path: 'donate', component: DonateComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', component: NotFoundComponent },
];
