import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../models/task.type';
import { map } from 'rxjs/operators';
import { TaskServiceAbstractService } from './task-service-abstract.service';

@Injectable({
  providedIn: 'root',
})
export class TaskServiceLocalStorageImplementationService extends TaskServiceAbstractService {
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  constructor() {
    super();
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      this.tasksSubject.next(JSON.parse(savedTasks));
    }
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

  getFilteredTasks(filter: string): Observable<Task[]> {
    return this.tasks$.pipe(
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
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}
