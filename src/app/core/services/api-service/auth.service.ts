import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  Observable,
  catchError,
  map,
  of,
  throwError,
} from 'rxjs';
import { environment } from '../../../../environments/enviroment';
import { ErrorHandlingService } from './error-handling.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.baseURL}/auth/login`;
  private tokenSubject = new BehaviorSubject<string | null>(this.getToken());
  token$ = this.tokenSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private errorHandlingService: ErrorHandlingService 
  ) {}

  login(username: string, password: string): Observable<void> {
    return this.http
      .post<{ token: string }>(this.apiUrl, { username, password })
      .pipe(
        map((response) => {
          this.setToken(response.token);
          this.tokenSubject.next(response.token);
        }),
        catchError((error) => this.errorHandlingService.handleError(error)) // Use the error handling service
      );
  }

  logout(): void {
    this.removeToken();
    this.tokenSubject.next(null);
    this.router.navigate(['/']);
  }

  isAuthenticated(): boolean {
    return !!this.tokenSubject.value;
  }

  private getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  private setToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  private removeToken(): void {
    localStorage.removeItem('authToken');
  }
}