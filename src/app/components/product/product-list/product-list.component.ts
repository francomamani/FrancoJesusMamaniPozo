import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../interfaces/product';
import { RetrieveProductsCommand } from '../../../commands/retrieve-products.command';
import { Command } from '../../../interfaces/command';
import { ProductInvokerService } from '../../../services/product-invoker.service';
import { SearchProductsCommand } from '../../../commands/search-products.command';
import { debounceTime, distinctUntilChanged, startWith } from 'rxjs';
import { RemoveProductCommand } from '../../../commands/remove-product.command';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements OnInit {
  products: Product[];
  searchControl: FormControl;

  constructor(
    private productService: ProductService,
    private productInvoker: ProductInvokerService,
    private router: Router
  ) {
    this.products = [];
    this.searchControl = new FormControl('');
  }

  ngOnInit(): void {
    this.getAll();
    this.searchControl.valueChanges
      .pipe(distinctUntilChanged(), debounceTime(300), startWith(''))
      .subscribe((text: string) => this.search(text));
  }

  public getAll(): void {
    const retrieveProductsCommand = new RetrieveProductsCommand(
      this.productService
    );
    this.executeCommand(retrieveProductsCommand);
  }

  public search(text: string): void {
    const searchProductsCommand = new SearchProductsCommand(
      this.productService,
      text
    );
    this.executeCommand(searchProductsCommand);
  }

  public remove(id: string): void {
    const removeProductCommand = new RemoveProductCommand(
      this.productService,
      id
    );
    this.executeCommand(removeProductCommand);
  }

  public openCreateProduct(): void {
    this.router.navigate(['create']);
  }

  public openEditProduct(id: string): void {
    this.router.navigate([`edit/${id}`]);
  }

  private executeCommand<T>(command: Command<T>): void {
    this.productInvoker.executeCommand(command).subscribe((response: T) => {
      console.log('response', response);
      if (response instanceof Array) {
        this.products = response;
        console.log(response);
      }

      if (response instanceof String) {
        alert(response);
      }
    });
  }
}
