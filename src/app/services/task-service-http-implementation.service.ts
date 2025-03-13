import { Injectable } from '@angular/core';
import { TaskServiceAbstractService } from './task-service-abstract.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../models/task.type';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TaskServiceHttpImplementationService extends TaskServiceAbstractService {
  private apiUrl = 'https://your-api.com/tasks';
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  constructor(private httpClient: HttpClient) {
    super();
    this.loadTasks();
  }

  private loadTasks(): void {
    this.httpClient.get<Task[]>(this.apiUrl).subscribe((tasks) => {
      this.tasksSubject.next(tasks);
    });
  }

  addTask(name: string): void {
    const newTask = { name, completed: false };
    this.httpClient.post<Task>(this.apiUrl, newTask).subscribe((task) => {
      this.tasksSubject.next([...this.tasksSubject.getValue(), task]);
    });
  }

  toggleTask(task: Task): void {
    const updatedTask = { ...task, completed: !task.completed };
    this.httpClient
      .patch<Task>(`${this.apiUrl}/${task.id}`, updatedTask)
      .subscribe(() => {
        const updatedTasks = this.tasksSubject
          .getValue()
          .map((t) => (t.id === task.id ? updatedTask : t));
        this.tasksSubject.next(updatedTasks);
      });
  }

  deleteTask(task: Task): void {
    this.httpClient.delete(`${this.apiUrl}/${task.id}`).subscribe(() => {
      const updatedTasks = this.tasksSubject
        .getValue()
        .filter((t) => t.id !== task.id);
      this.tasksSubject.next(updatedTasks);
    });
  }

  getFilteredTasks(filter: string): Observable<Task[]> {
    return this.tasks$.pipe(
      map((tasks) =>
        filter === 'All'
          ? tasks
          : filter === 'Completed'
          ? tasks.filter((t) => t.completed)
          : tasks.filter((t) => !t.completed)
      )
    );
  }
}
