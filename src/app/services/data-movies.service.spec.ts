import { TestBed } from '@angular/core/testing';

import { DataMoviesService } from './data-movies.service';

describe('DataMoviesService', () => {
  let service: DataMoviesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataMoviesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
