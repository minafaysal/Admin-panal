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
  addCategory(category: Category): void {
    const currentCategories = this.categoriesSubject.getValue();
    this.categoriesSubject.next([...currentCategories, category]);
  }

  updateCategory(category: Category): void {
    const currentCategories = this.categoriesSubject.getValue();
    const updatedCategories = currentCategories.map((c) =>
      c === category ? category : c
    );
    this.categoriesSubject.next(updatedCategories);
  }

  deleteCategory(category: Category): void {
    const currentCategories = this.categoriesSubject.getValue();
    const updatedCategories = currentCategories.filter((c) => c !== category);
    this.categoriesSubject.next(updatedCategories);
  }

  getCurrentCategories(): Category[] {
    return this.categoriesSubject.getValue();
  }
}
