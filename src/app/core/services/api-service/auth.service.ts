import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from '../../../../environments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.baseURL}/auth/login`;
  private tokenSubject = new BehaviorSubject<string | null>(null);
  token$ = this.tokenSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    const token = localStorage.getItem('authToken');
    if (token) {
      this.tokenSubject.next(token);
    }
  }

  login(username: string, password: string): Observable<void> {
    return this.http
      .post<{ token: string }>(this.apiUrl, { username, password })
      .pipe(
        map((response) => {
          localStorage.setItem('authToken', response.token);
          this.tokenSubject.next(response.token);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.tokenSubject.next(null);
    this.router.navigate(['/']);
  }

  isAuthenticated(): boolean {
    return !!this.tokenSubject.value;
  }
}