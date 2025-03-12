import { TestBed } from '@angular/core/testing';

import { TaskServiceAbstractService } from './task-service-abstract.service';

describe('TaskServiceAbstractService', () => {
  let service: TaskServiceAbstractService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskServiceAbstractService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
