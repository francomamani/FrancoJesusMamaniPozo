import { CommonModule, DatePipe } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Product } from '../../../interfaces/product';
import { Command } from '../../../interfaces/command';
import { ProductInvokerService } from '../../../services/product-invoker.service';
import { SaveProductCommand } from '../../../commands/save-product.command';
import { ProductService } from '../../../services/product.service';
import { UpdateProductCommand } from '../../../commands/update-product.command';
import { ActivatedRoute, Router } from '@angular/router';
import { DateService } from '../../../services/date.service';
import { isCurrentDate } from '../../../validators/date.validator';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [DatePipe],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  id: string | null;
  title: string = '';
  isResetted: boolean;
  idAlreadyExists: boolean;

  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private productInvoker = inject(ProductInvokerService);
  private dateService = inject(DateService);
  private datePipe = inject(DatePipe);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);

  constructor() {
    this.id = null;
    this.isResetted = false;
    this.idAlreadyExists = false;
    this.productForm = this.fb.group({
      id: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10),
      ]),
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100),
      ]),
      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(200),
      ]),
      logo: new FormControl(null, Validators.required),
      dateRelease: new FormControl(null, [
        Validators.required,
        isCurrentDate(this.dateService),
      ]),
      dateRevision: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    const dateReleaseControl = this.productForm.get('dateRelease');
    const idControl = this.productForm.get('id');
    this.productForm.get('dateRevision')?.disable();
    if (this.id) {
      this.title = 'Formulario de Edicion';
      this.patchProductForm(this.id);
    } else {
      this.title = 'Formulario de Registro';
    }
    if (idControl) {
      idControl.valueChanges
        .pipe(distinctUntilChanged(), debounceTime(300))
        .subscribe((id: string) => {
          this.productService.exists(id).subscribe((alreadyExists: boolean) => {
            this.idAlreadyExists = alreadyExists;
          });
        });
    }
    if (dateReleaseControl) {
      dateReleaseControl.valueChanges
        .pipe(distinctUntilChanged())
        .subscribe((releaseDate: Date) => {
          const newDate = this.dateService.addYearsToDate(
            new Date(releaseDate),
            1
          );
          const dateRevision = this.datePipe.transform(
            newDate,
            'yyyy-MM-dd',
            'UTC'
          );
          this.productForm.patchValue({ dateRevision });
        });
    }
  }

  public process(): void {
    if (this.id) {
      this.update();
    } else {
      if (this.isResetted) {
        this.isResetted = false;
      } else {
        this.save();
      }
    }
  }

  public save(): void {
    const product: Product = this.productForm.value;
    product.dateRevision = this.productForm.get('dateRevision')?.value;
    const saveProductCommand = new SaveProductCommand(
      this.productService,
      product
    );
    this.executeCommand(saveProductCommand);
  }

  public update(): void {
    const product: Product = this.productForm.value;
    product.id = this.productForm.get('id')?.value;
    product.dateRevision = this.productForm.get('dateRevision')?.value;
    const updateProductCommand = new UpdateProductCommand(
      this.productService,
      product
    );
    this.executeCommand(updateProductCommand);
  }

  public reset() {
    this.isResetted = true;
    this.productForm.reset();
    if (this.id) {
      this.patchProductForm(this.id);
    }
  }

  public hasErrors(field: string): boolean {
    return (
      (this.productForm.get(field)?.invalid &&
        (this.productForm.get(field)?.dirty ||
          this.productForm.get(field)?.touched)) ??
      false
    );
  }

  public getMinLength(field: string): number | null {
    const control = this.productForm.get(field);
    if (control && control.errors && control.errors['minlength']) {
      return control.errors['minlength']['requiredLength'];
    }
    return null;
  }

  public getMaxLength(field: string): number | null {
    const control = this.productForm.get(field);
    if (control && control.errors && control.errors['maxlength']) {
      return control.errors['maxlength']['requiredLength'];
    }
    return null;
  }

  private patchProductForm(id: string): void {
    const product = this.productService.getProduct(id);
    if (product) {
      const dateRelease = this.datePipe.transform(
        product.dateRelease,
        'yyyy-MM-dd', 'UTC'
      );
      const dateRevision = this.datePipe.transform(
        product.dateRevision,
        'yyyy-MM-dd', 'UTC'
      );
      this.productForm.patchValue({ ...product, dateRelease, dateRevision });
      this.productForm.get('id')?.disable();
    }
  }

  private executeCommand<T>(command: Command<T>): void {
    this.productInvoker.executeCommand(command).subscribe((product: T) => {
      this.router.navigate(['/']);
    });
  }
}
