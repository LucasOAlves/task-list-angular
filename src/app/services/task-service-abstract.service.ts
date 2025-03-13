import { Observable } from 'rxjs';
import { Task } from '../models/task.type';
import { ITaskService } from './task-service-interface.interface';

export abstract class TaskServiceAbstractService implements ITaskService {
  abstract tasks$: Observable<Task[]>;
  abstract addTask(name: string);
  abstract toggleTask(task: Task);
  abstract deleteTask(task: Task);
  abstract getFilteredTasks(filter: string): Observable<Task[]>;
}
