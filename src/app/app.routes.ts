import { Routes } from '@angular/router';
import { AdoptionFormComponent } from './pages/adopt/adoption-form/adoption-form.component';
import { AnimalDetailComponent } from './pages/animals/animal-detail/animal-detail.component';
import { AnimalListComponent } from './pages/animals/animal-list/animal-list.component';
import { ContactComponent } from './pages/contact/contact.component';
import { DonateComponent } from './pages/donate/donate.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { VolunteerComponent } from './pages/volunteer/volunteer.component';
import { OurStoryComponent } from './pages/our-story/our-story.component';
import { DonateOnceComponent } from './pages/donate-once/donate-once.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component'; // Import the new component
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component'; // Import the new component
import { ResetPasswordComponent } from './reset-password/reset-password.component'; // Import
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';
import { AuthGuard } from './auth/auth.guard';
import { GetInvolvedComponent } from './pages/get-involved/get-involved.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'animals', component: AnimalListComponent },
  { path: 'animals/:id', component: AnimalDetailComponent },
  { path: 'adopt', component: AdoptionFormComponent },
  { path: 'donate', component: DonateComponent },
  { path: 'contact', component: ContactComponent },
  // --- NEW: Nested "Get Involved" Route ---
  {
    path: 'get-involved',
    component: GetInvolvedComponent,
    children: [
      { path: 'adopt', component: AdoptionFormComponent },
      { path: 'volunteer', component: VolunteerComponent },
    ],
  },
  { path: 'volunteer', component: VolunteerComponent },
  { path: 'our-story', component: OurStoryComponent },
  { path: 'donate/once', component: DonateOnceComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'verify-email', component: VerifyEmailComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'auth/callback', component: AuthCallbackComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard], // <-- Protect this route
  },
  // Fallback route for 404 Not Found
  { path: '**', component: NotFoundComponent },
];
