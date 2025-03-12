import { TestBed } from '@angular/core/testing';

import { TaskServiceLocalStorageImplementationService } from './task-service-local-storage-implementation.service';

describe('TaskServiceLocalStorageImplementationService', () => {
  let service: TaskServiceLocalStorageImplementationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskServiceLocalStorageImplementationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
