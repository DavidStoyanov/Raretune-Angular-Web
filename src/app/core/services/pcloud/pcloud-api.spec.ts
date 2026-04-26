import { TestBed } from '@angular/core/testing';

import { PcloudApi } from './pcloud-api';

describe('PcloudApi', () => {
  let service: PcloudApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PcloudApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
