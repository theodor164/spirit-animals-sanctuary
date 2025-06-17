import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

interface RegisterData {
  name: string;
  email: string;
  password: string;
  recaptcha?: string; // The token from the form
}

interface LoginData {
  email: string;
  password: string;
  recaptcha?: string;
}

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthResponse {
  token: string;
  user: User;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl =
    'https://spirit-animals-sanctuary-backend.onrender.com/api/auth'; // Adjust the base URL as needed

  constructor(private http: HttpClient, private router: Router) {}

  register(data: RegisterData): Observable<any> {
    // --- FIX: Create the correct payload for the backend ---
    const payload = {
      name: data.name,
      email: data.email,
      password: data.password,
      recaptchaToken: data.recaptcha, // Pass the token under the correct property name
    };
    return this.http.post<any>(`${this.baseUrl}/register`, payload);
  }

  // --- UPDATED: login method ---
  login(data: LoginData): Observable<AuthResponse> {
    const payload = {
      email: data.email,
      password: data.password,
      recaptchaToken: data.recaptcha, // Pass the token under the correct property name
    };
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, payload);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
