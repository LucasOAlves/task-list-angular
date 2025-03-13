import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../models/task.type';
import { TaskServiceAbstractService } from './task-service-abstract.service';

export class MockTaskService extends TaskServiceAbstractService {
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  private tasks: Task[] = [
    { id: 1, name: 'Test Task 1', completed: false },
    { id: 2, name: 'Test Task 2', completed: true },
  ];

  constructor() {
    super();
    this.tasksSubject.next(this.tasks);
  }

  addTask(name: string) {
    const newTask: Task = { id: Date.now(), name, completed: false };
    this.tasks.push(newTask);
    this.tasksSubject.next([...this.tasks]);
  }

  toggleTask(task: Task) {
    this.tasks = this.tasks.map((t) =>
      t.id === task.id ? { ...t, completed: !t.completed } : t
    );
    this.tasksSubject.next([...this.tasks]);
  }

  deleteTask(task: Task) {
    this.tasks = this.tasks.filter((t) => t.id !== task.id);
    this.tasksSubject.next([...this.tasks]);
  }

  getFilteredTasks(filter: string): Observable<Task[]> {
    const filteredTasks = this.tasks.filter((task) =>
      task.name.includes(filter)
    );
    return new BehaviorSubject(filteredTasks).asObservable();
  }
}
