import { Observable } from 'rxjs';
import { Command } from '../interfaces/command';
import { ProductService } from '../services/product.service';

export class RemoveProductCommand implements Command<string> {
  constructor(private productService: ProductService, private id: string) {}
  execute(): Observable<string> {
    return this.productService.delete(this.id);
  }
}
