import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Category } from '../../models/category.model';
import { environment } from '../../../../environments/enviroment';
import { ErrorHandlingService } from './error-handling.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categoriesSubject = new BehaviorSubject<Category[]>([]);
  public categories$ = this.categoriesSubject.asObservable();

  private apiUrl = `${environment.baseURL}/products/categories`;
  private isCategoriesLoaded = false;

  constructor(
    private http: HttpClient,
    private errorHandlingService: ErrorHandlingService
  ) {}

  fetchCategories(): Observable<Category[]> {
    if (!this.isCategoriesLoaded) {
      return this.http.get<Category[]>(this.apiUrl).pipe(
        tap((categories) => {
          this.categoriesSubject.next(categories);
          this.isCategoriesLoaded = true;
        }),
        catchError(this.errorHandlingService.handleError)
      );
    } else {
      return this.categories$;
    }
  }

  addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.apiUrl, category).pipe(
      tap((newCategory) => {
        const currentCategories = this.categoriesSubject.getValue();
        this.categoriesSubject.next([...currentCategories, newCategory]);
      }),
      catchError(this.errorHandlingService.handleError)
    );
  }

  updateCategory(category: Category): Observable<Category> {
    return this.http
      .put<Category>(`${this.apiUrl}/${category.id}`, category)
      .pipe(
        tap((updatedCategory) => {
          const currentCategories = this.categoriesSubject.getValue();
          const updatedCategories = currentCategories.map((c) =>
            c.id === updatedCategory.id ? updatedCategory : c
          );
          this.categoriesSubject.next(updatedCategories);
        }),
        catchError(this.errorHandlingService.handleError)
      );
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        const currentCategories = this.categoriesSubject.getValue();
        const updatedCategories = currentCategories.filter((c) => c.id !== id);
        this.categoriesSubject.next(updatedCategories);
      }),
      catchError(this.errorHandlingService.handleError)
    );
  }

  getCurrentCategories(): Category[] {
    return this.categoriesSubject.getValue();
  }
}
