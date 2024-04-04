import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Product } from '../interfaces/product';
import { baseUrl } from '../app.config';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsMap: Map<string, Product>;
  private http = inject(HttpClient);

  constructor() {
    this.productsMap = new Map();
  }

  public getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(`${baseUrl}/bp/products`);
  }

  public save(product: Product): Observable<Product> {
    return this.http.post<Product>(`${baseUrl}/bp/products`, product);
  }

  public update(product: Partial<Product>): Observable<Product> {
    return this.http.put<Product>(`${baseUrl}/bp/products`, product);
  }

  public delete(id: string): Observable<string> {
    return this.http.delete(`${baseUrl}/bp/products`, {
      params: { id },
      responseType: 'text',
    });
  }

  public exists(id: string): Observable<boolean> {
    return this.http.get<boolean>(`${baseUrl}/bp/products/verification`, {
      params: { id },
    });
  }

  public search(text: string): Observable<Product[]> {
    const textLowerCase = text.toLowerCase();
    return this.getAll().pipe(
      map((products: Product[]) =>
        products.filter(
          (product: Product) =>
            product.name.toLowerCase().includes(textLowerCase) ||
            product.description.toLowerCase().includes(textLowerCase)
        )
      )
    );
  }

  public setProduct(product: Product): void {
    this.productsMap.set(product.id, product);
  }

  public getProduct(id: string): Product | null {
    return this.productsMap.get(id) ?? null;
  }
}
