import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { Router } from '@angular/router';

export interface User {
  id: number;
  username: string;
  email: string;
  location?: string;
  role: string;
  interests?: string;
  profile_picture?: string;
  created_at?: string;
}

export interface AuthResponse {
  message: string;
  access_token: string;
  user: User;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:5000/api';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private tokenSubject = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient, private router: Router) {
    // Load token and user from localStorage on service initialization (browser only)
    if (this.isBrowser()) {
      const token = localStorage.getItem('access_token');
      const user = localStorage.getItem('current_user');
      
      if (token && user) {
        this.tokenSubject.next(token);
        this.currentUserSubject.next(JSON.parse(user));
      }
    }
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  get token(): string | null {
    return this.tokenSubject.value;
  }

  get isAuthenticated(): boolean {
    return !!this.token && !!this.currentUserValue;
  }

  get isAdmin(): boolean {
    return this.currentUserValue?.role === 'admin';
  }

  get isRepresentative(): boolean {
    return this.currentUserValue?.role === 'representative';
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.token;
    return new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json'
    });
  }

  register(userData: {
    username: string;
    email: string;
    password: string;
    location?: string;
  }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, userData)
      .pipe(
        tap(response => {
          if (response.access_token) {
            this.setAuthData(response.access_token, response.user);
          }
        })
      );
  }

  login(credentials: {
    login: string; // email or username
    password: string;
  }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap(response => {
          if (response.access_token) {
            this.setAuthData(response.access_token, response.user);
          }
        })
      );
  }

  googleLogin(token: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/google-login`, { token })
      .pipe(
        tap(response => {
          if (response.access_token) {
            this.setAuthData(response.access_token, response.user);
          }
        })
      );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}, { 
      headers: this.getAuthHeaders() 
    }).pipe(
      tap(() => {
        this.clearAuthData();
      })
    );
  }

  getCurrentUser(): Observable<{ user: User }> {
    return this.http.get<{ user: User }>(`${this.apiUrl}/me`, {
      headers: this.getAuthHeaders()
    });
  }

  refreshToken(): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/refresh`, {}, {
      headers: this.getAuthHeaders()
    }).pipe(
      tap(response => {
        if (response.access_token) {
          this.setAuthData(response.access_token, response.user);
        }
      })
    );
  }

  checkAuth(): Observable<{ authenticated: boolean; user?: User }> {
    return this.http.get<{ authenticated: boolean; user?: User }>(`${this.apiUrl}/check-auth`, {
      headers: this.getAuthHeaders()
    });
  }

  private setAuthData(token: string, user: User): void {
    if (this.isBrowser()) {
      localStorage.setItem('access_token', token);
      localStorage.setItem('current_user', JSON.stringify(user));
    }
    this.tokenSubject.next(token);
    this.currentUserSubject.next(user);
  }

  private clearAuthData(): void {
    if (this.isBrowser()) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('current_user');
    }
    this.tokenSubject.next(null);
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  // Helper method to get authenticated HTTP headers for other services
  getHttpHeaders(): HttpHeaders {
    return this.getAuthHeaders();
  }
}
