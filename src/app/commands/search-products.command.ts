import { Observable } from 'rxjs';
import { Command } from '../interfaces/command';
import { Product } from '../interfaces/product';
import { ProductService } from '../services/product.service';

export class SearchProductsCommand implements Command<Product[]> {
  constructor(private productService: ProductService, private text: string) {}

  execute(): Observable<Product[]> {
    return this.productService.search(this.text);
  }
}
