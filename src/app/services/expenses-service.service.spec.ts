import { TestBed } from '@angular/core/testing';

import { ExpensesServiceService } from './expenses-service.service';

describe('ExpensesServiceService', () => {
  let service: ExpensesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpensesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
