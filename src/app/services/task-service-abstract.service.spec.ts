import { TestBed } from '@angular/core/testing';
import { TaskServiceAbstractService } from './task-service-abstract.service';
import { MockTaskService } from './task-service-mock.service';

describe('TaskServiceAbstractService', () => {
  let service: TaskServiceAbstractService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: TaskServiceAbstractService, useClass: MockTaskService },
      ],
    });
    service = TestBed.inject(TaskServiceAbstractService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have tasks$ as an observable', (done) => {
    service.tasks$.subscribe((tasks) => {
      expect(tasks).toEqual([
        { id: 1, name: 'Test Task 1', completed: false },
        { id: 2, name: 'Test Task 2', completed: true },
      ]);
      done();
    });
  });

  it('should have addTask method', () => {
    expect(service.addTask).toBeDefined();
  });

  it('should have toggleTask method', () => {
    expect(service.toggleTask).toBeDefined();
  });

  it('should have deleteTask method', () => {
    expect(service.deleteTask).toBeDefined();
  });

  it('should have getFilteredTasks method', () => {
    expect(service.getFilteredTasks).toBeDefined();
  });
});
