import { TestBed } from '@angular/core/testing';

import { PropertySearchService } from './property-search.service';

describe('PropertySearchService', () => {
  let service: PropertySearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PropertySearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
