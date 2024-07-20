import { Component, OnInit } from '@angular/core';
import { Product } from '../../../core/models/product.model';
import { ProductService } from '../../../core/services/api-service/products.service';
import { takeUntil } from 'rxjs';
import { BaseComponent } from '../../../core/base/common-base';
import { ProductCardComponent } from '../../../shared/components/product-card/product-card.component';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss',
})
export class ProductsListComponent extends BaseComponent implements OnInit {
  productsList: Product[] = [];

  constructor(private productService: ProductService) {
    super();
  }

  ngOnInit(): void {
    this.loadProducts();
  }
  private loadProducts() {
    // Subscribe to products$ to get the current list of products
    this.productService.products$
      .pipe(takeUntil(this.destroy$))
      .subscribe((products) => {
        this.productsList = products;
      });

    // Check if products are already loaded, if not, fetch from server
    if (this.productService.getCurrentProducts().length === 0) {
      this.productService.fetchProducts().subscribe();
    }
  }

  private deleteProduct(id: number): void {}

  addNewProduct(): void {}
}
