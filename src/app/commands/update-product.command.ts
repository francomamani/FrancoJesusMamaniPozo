import { Observable } from 'rxjs';
import { Command } from '../interfaces/command';
import { Product } from '../interfaces/product';
import { ProductService } from '../services/product.service';

export class UpdateProductCommand implements Command<Product> {
  constructor(
    private productService: ProductService,
    private product: Partial<Product>
  ) {}

  execute(): Observable<Product> {
    return this.productService.update(this.product);
  }
}
