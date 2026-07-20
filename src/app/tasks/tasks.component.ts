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
  userId= input.required<string>();
  // exctracting query parameters via inputs
  order = input<'asc' | 'desc'>();
  private taskService = inject(TaskServices);
  userTasks: Task[] = computed(()=>
    this.taskService.allTasks().filter((task)=>task.userId === this.userId())
      );
}
