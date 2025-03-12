import { Observable } from 'rxjs';
import { Task } from '../models/task.type';

export abstract class ITaskService {
  abstract tasks$: Observable<Task[]>;
  abstract addTask(name: string): void;
  abstract toggleTask(task: Task): void;
  abstract deleteTask(task: Task): void;
  abstract getFilteredTasks(filter: string): Observable<Task[]>;
}
