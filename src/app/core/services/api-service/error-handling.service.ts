import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlingService {
  constructor(private toastr: ToastrService) {}

  // Unified method for handling errors
  handleError(error: HttpErrorResponse): Observable<never> {
    // Log the error for debugging
    console.error('An error occurred:', error);

    // Show a user-friendly message based on error status
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      this.toastr.error(
        'Client-side or network error occurred. Please check your connection.',
        'Error'
      );
    } else {
      // Server-side error
      this.toastr.error('failed. Please try again.');
    }

    // Return a user-facing error message
    return throwError(
      () => new Error('Something went wrong. Please try again later.')
    );
  }
}
