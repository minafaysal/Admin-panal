import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../core/models/product.model';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Input() productsList: Product[] = [];
  @Output() deleteProductEvent = new EventEmitter<number>();

  constructor(private router: Router) {}

  editProduct(productId: number): void {
    this.router.navigate([`/admin/products/edit/${productId}`]);
  }
  deleteProduct(productId: number): void {
    this.deleteProductEvent.emit(productId);
  }
}
