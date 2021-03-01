import { TestBed } from '@angular/core/testing';

import { SigninAuthGuard } from './signin-auth.guard';

describe('SigninAuthGuard', () => {
  let guard: SigninAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SigninAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
