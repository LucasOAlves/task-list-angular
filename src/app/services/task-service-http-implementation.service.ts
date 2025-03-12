import { Injectable } from '@angular/core';
import { TaskServiceAbstractService } from './task-service-abstract.service';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../models/task.type';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TaskServiceHttpImplementationService extends TaskServiceAbstractService {
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  constructor(private httpClient: HttpClient) {
    super();
  }

  addTask(name: string) {
    const updatedTasks = [
      ...this.tasksSubject.getValue(),
      { id: Date.now(), name, completed: false },
    ];
    this.tasksSubject.next(updatedTasks);
    this.saveTasks(updatedTasks);
  }

  toggleTask(task: Task) {
    const updatedTasks = this.tasksSubject
      .getValue()
      .map((t) => (t.id === task.id ? { ...t, completed: !t.completed } : t));
    this.tasksSubject.next(updatedTasks);
    this.saveTasks(updatedTasks);
  }

  deleteTask(task: Task) {
    const updatedTasks = this.tasksSubject
      .getValue()
      .filter((t) => t.id !== task.id);
    this.tasksSubject.next(updatedTasks);
    this.saveTasks(updatedTasks);
  }

  getFilteredTasks(filter: string) {
    return this.httpClient
      .get('service/task')
      .pipe(
        map((tasks: Task[]) =>
          filter === 'All'
            ? tasks
            : filter === 'Completed'
            ? tasks.filter((t) => t.completed)
            : tasks.filter((t) => !t.completed)
        )
      );
  }

  private saveTasks(tasks: Task[]) {
    this.httpClient.post('service-url/tasks', JSON.stringify(tasks));
  }
}
