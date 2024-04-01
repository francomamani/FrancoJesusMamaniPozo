import { Observable } from "rxjs";
import { Command } from "../interfaces/command";
import { Product } from "../interfaces/product";
import { ProductService } from "../services/product.service";

export class RetrieveProductsCommand implements Command<Product[]> {
    constructor(private productService: ProductService) {}

    execute(): Observable<Product[]> {
        return this.productService.getAll();
    }
}
