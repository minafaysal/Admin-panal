import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../core/models/product.model';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared.module';

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

  editProduct(productId: number) {}
  deleteProduct(productId: number): void {
    this.deleteProductEvent.emit(productId);
  }
}
