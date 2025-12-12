import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { cmsroleGuard } from './cmsrole.guard';

describe('cmsroleGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => cmsroleGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
