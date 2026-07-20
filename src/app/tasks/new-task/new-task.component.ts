import { Component, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {Router , RouterLink } from '@angular/router'; 
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  userId = input.required<string>();
  enteredTitle = signal('');
  enteredSummary = signal('');
  enteredDate = signal('');
  submitted = false;
  private tasksService = inject(TasksService);

  onSubmit() {
    this.tasksService.addTask(
      {
        title: this.enteredTitle(),
        summary: this.enteredSummary(),
        date: this.enteredDate(),
      },
      this.userId()
    );
    this,submitted = true;
    this.router.navigate(['/users' , this.userId(), 'tasks'],{ 
      replaceUrl: true,
      // we use navigate in case of programmatic navigation 
      // replaceUrl make no back to previous step
    });
  }
}

export const canLeaveEditPage: canDeactiveFn<NewTaskComponent> = (component) => {
  if(component.submitted){
    return true;
  }
  if (component.enteredTitle() || component.enteredDate() || component.enteredSummary()){
    return window.confirm('Do you really want to leave ? you will lose the entered data.')
  }
  return true;
}

