import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../interfaces/product';
import { baseUrl } from '../app.config';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

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
    return this.http.delete<string>(`${baseUrl}/bp/products`, {
      params: { id },
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
}
