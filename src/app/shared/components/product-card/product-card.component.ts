import { Component, Input } from '@angular/core';
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

  editProduct(productId: number) {}
  deleteProduct(productId: number) {}
}
