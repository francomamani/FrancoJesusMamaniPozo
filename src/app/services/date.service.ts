import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  public isCurrentDate(date: Date): boolean {
    const today = new Date();
    return date >= today;
  }

  public addYearsToDate(date: Date, years: number = 1): Date {
    date.setFullYear(date.getFullYear() + years);
    return date;
  }
}
