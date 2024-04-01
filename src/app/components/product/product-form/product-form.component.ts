import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormControlName,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { Product } from '../../../interfaces/product';
import { Command } from '../../../interfaces/command';
import { ProductInvokerService } from '../../../services/product-invoker.service';
import { SaveProductCommand } from '../../../commands/save-product.command';
import { ProductService } from '../../../services/product.service';
import { UpdateProductCommand } from '../../../commands/update-product.command';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
})
export class ProductFormComponent {
  productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private productInvoker: ProductInvokerService,
    private router: Router
  ) {
    this.productForm = fb.group({
      id: new FormControl(null),
      name: new FormControl(null),
      description: new FormControl(null),
      logo: new FormControl(null),
      dateRelease: new FormControl(null),
      dateRevision: new FormControl(null),
    });
  }

  public save(): void {
    const product: Product = this.productForm.value;
    const saveProductCommand = new SaveProductCommand(
      this.productService,
      product
    );
    this.executeCommand(saveProductCommand);
  }

  public update(): void {
    const product: Product = this.productForm.value;
    const updateProductCommand = new UpdateProductCommand(
      this.productService,
      product
    );
    this.executeCommand(updateProductCommand);
  }

  public reset() {
    this.productForm.reset();
  }

  private executeCommand<T>(command: Command<T>): void {
    this.productInvoker.executeCommand(command).subscribe((product: T) => {
      console.log(product);
      this.router.navigate(['/']);
    });
  }
}
