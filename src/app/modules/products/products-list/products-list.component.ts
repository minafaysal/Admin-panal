import { Component, OnInit } from '@angular/core';
import { Product } from '../../../core/models/product.model';
import { ProductService } from '../../../core/services/api-service/products.service';
import { ProductCardComponent } from '../../../shared/components/product-card/product-card.component';
import { takeUntil } from 'rxjs';
import { BaseComponent } from '../../../core/base/common-base';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [ProductCardComponent, FormsModule, SharedModule],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss',
})
export class ProductsListComponent extends BaseComponent implements OnInit {
  productsList: Product[] = [];
  searchTerm: string = '';

  constructor(
    private productService: ProductService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.spinner.show();
    this.loadProducts();
  }
  private loadProducts() {
    // Subscribe to products$ to get the current list of products
    this.productService.products$
      .pipe(takeUntil(this.destroy$))
      .subscribe((products) => {
        this.productsList = products;
        this.spinner.hide();
      });

    // Check if products are already loaded, if not, fetch from server
    if (this.productService.getCurrentProducts().length === 0) {
      this.productService.fetchProducts().subscribe();
    }
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe(() => {
      this.productsList = this.productsList.filter(
        (product) => product.id !== id
      );
    });
  }

  addNewProduct(): void {
    this.router.navigate(['/admin/products/add']);
  }
}
