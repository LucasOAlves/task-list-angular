import { Observable } from 'rxjs';
import { Task } from '../models/task.type';

export interface ITaskService {
  tasks$: Observable<Task[]>;
  addTask(name: string): void;
  toggleTask(task: Task): void;
  deleteTask(task: Task): void;
  getFilteredTasks(filter: string): Observable<Task[]>;
}
