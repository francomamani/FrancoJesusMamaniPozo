import { TestBed } from '@angular/core/testing';

import { ProductInvokerService } from './product-invoker.service';

describe('ProductInvokerService', () => {
  let service: ProductInvokerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductInvokerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
