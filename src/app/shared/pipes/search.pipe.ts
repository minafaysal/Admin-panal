import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../core/models/product.model';

@Pipe({
  name: 'searchFilter',
})
export class SearchPipe implements PipeTransform {
  transform(products: Product[], searchTerm: string): Product[] {
    if (!searchTerm || !products.length) {
      return products;
    }

    const term = searchTerm.toLowerCase();
    return products.filter((product) =>
      product.title.toLowerCase().includes(term)
    );
  }
}
