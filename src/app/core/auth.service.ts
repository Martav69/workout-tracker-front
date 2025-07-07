import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

interface LoginPayload {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

interface DecodedToken { sub: string; exp: number}

interface RegisterPayload {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = `${environment.apiUrl}/auth`;
  private jwtKey = 'token';
  private userSubject = new BehaviorSubject<DecodedToken | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.loadUserFromToken();
  }

  login(payload: LoginPayload): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API_URL}/login`, payload).pipe(
      tap((res) => {
        localStorage.setItem('token', res.token);
        const payloadDecoded = JSON.parse(atob(res.token.split('.')[1])) as DecodedToken;
        this.userSubject.next(payloadDecoded);
        this.router.navigate(['/dashboard']);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  register(payload: RegisterPayload): Observable<any> {
    return this.http.post(`${this.API_URL}/register`, payload);
  }

  private loadUserFromToken() {
    const token = localStorage.getItem(this.jwtKey);
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1])) as DecodedToken;
      this.userSubject.next(payload);
    }
  }

  get user(): DecodedToken | null {
    return this.userSubject.value;
  }
}
