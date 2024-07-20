import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { ErrorHandlingService } from './error-handling.service';
import { Product } from '../../models/product.model';
import { environment } from '../../../../environments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsSubject = new BehaviorSubject<Product[]>([]);
  public products$ = this.productsSubject.asObservable();

  private apiUrl = `${environment.baseURL}/products`;
  private isProductsLoaded = false;

  constructor(
    private http: HttpClient,
    private errorHandlingService: ErrorHandlingService
  ) {}

  fetchProducts(): Observable<Product[]> {
    if (!this.isProductsLoaded) {
      return this.http.get<Product[]>(this.apiUrl).pipe(
        tap((products) => {
          this.productsSubject.next(products);
          this.isProductsLoaded = true;
        }),
        catchError(this.errorHandlingService.handleError)
      );
    } else {
      return this.products$;
    }
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product).pipe(
      tap((newProduct) => {
        const currentProducts = this.productsSubject.getValue();
        this.productsSubject.next([...currentProducts, newProduct]);
      }),
      catchError(this.errorHandlingService.handleError)
    );
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${product.id}`, product).pipe(
      tap((updatedProduct) => {
        const currentProducts = this.productsSubject.getValue();
        const updatedProducts = currentProducts.map((p) =>
          p.id === updatedProduct.id ? updatedProduct : p
        );
        this.productsSubject.next(updatedProducts);
      }),
      catchError(this.errorHandlingService.handleError)
    );
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        const currentProducts = this.productsSubject.getValue();
        const updatedProducts = currentProducts.filter((p) => p.id !== id);
        this.productsSubject.next(updatedProducts);
      }),
      catchError(this.errorHandlingService.handleError)
    );
  }

  getCurrentProducts(): Product[] {
    return this.productsSubject.getValue();
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }
}
