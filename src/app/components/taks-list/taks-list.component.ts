import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from 'src/app/models/task.type';
import { TaskServiceAbstractService } from 'src/app/services/task-service-abstract.service';

@Component({
  selector: 'app-taks-list',
  templateUrl: './taks-list.component.html',
  styleUrls: ['./taks-list.component.scss'],
})
export class TaksListComponent implements OnInit {
  public tasks$: Observable<Task[]>;
  public filter: string = 'All';
  public newTask: string = '';

  constructor(private taskService: TaskServiceAbstractService) {}

  ngOnInit(): void {
    this.loadTask();
  }

  loadTask() {
    this.tasks$ = this.taskService.getFilteredTasks(this.filter);
  }

  addTask() {
    if (this.newTask.trim()) {
      this.taskService.addTask(this.newTask);
      this.newTask = '';
    }
  }

  toggleTask(task: Task) {
    this.taskService.toggleTask(task);
  }

  deleteTask(task: Task) {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(task);
    }
  }

  updateFilter() {
    this.loadTask();
  }
}
