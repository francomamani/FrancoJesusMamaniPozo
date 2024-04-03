import { TestBed } from '@angular/core/testing';

import { DateService } from './date.service';

describe('DateService', () => {
  let service: DateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#isCurrentDate', () => {
    it('should verify if a date is past date', () => {
      const pastDate = new Date(1990, 0, 1);
      const isCurrentDate = service.isCurrentDate(pastDate);
      expect(isCurrentDate).toBe(false);
    });

    it('should verify if a date is current', () => {
      const today = new Date();
      const isCurrentDate = service.isCurrentDate(today);
      expect(isCurrentDate).toBe(true);
    });

    it('should verify if a date is from the future', () => {
      const futureDate = new Date(2100, 0, 1);
      const isCurrentDate = service.isCurrentDate(futureDate);
      expect(isCurrentDate).toBe(true);
    });
  });

  describe('#addYearsToDate', () => {
    it('should add 1 year to date', () => {
      const date = new Date(2024, 2, 1);
      const years = 1;

      const newDate = service.addYearsToDate(date, years);

      const expectedDate = new Date(2025, 2, 1);
      expect(newDate).toEqual(expectedDate);
    });
    it('should add 5 years to date', () => {
      const date = new Date(2024, 2, 1);
      const years = 5;

      const newDate = service.addYearsToDate(date, years);

      const expectedDate = new Date(2029, 2, 1);
      expect(newDate).toEqual(expectedDate);
    });
    it('should add 1 year by default', () => {
      const date = new Date(2024, 2, 1);

      const newDate = service.addYearsToDate(date);

      const expectedDate = new Date(2025, 2, 1);
      expect(newDate).toEqual(expectedDate);
    });
  });
});
