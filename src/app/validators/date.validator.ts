import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { DateService } from '../services/date.service';

const isCurrentDate =
  (dateService: DateService): ValidatorFn =>
  (control: AbstractControl): ValidationErrors | null =>
    dateService.isCurrentDate(new Date(control.value))
      ? null
      : { invalidDate: true };

export { isCurrentDate };
