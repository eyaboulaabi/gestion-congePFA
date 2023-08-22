import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { salarieGuard } from './salarie.guard';

describe('salarieGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => salarieGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
