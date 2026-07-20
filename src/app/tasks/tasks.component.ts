import { Component } from '@angular/core';
import {RouterLink } from '@angular/router';
import { TaskComponent } from './task/task.component';
import { Task } from './task/task.model';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent , RouterLink],
})
export class TasksComponent {
  userTasks: Task[] = [];
}
