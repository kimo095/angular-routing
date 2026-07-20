import { Component, computed, DestroyRef, inject, input, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, RouterOutlet , RouterLink} from '@angular/router';


@Component({
  selector: 'app-user-tasks',
  standalone: true,
  imports:[RouterOutlet , RouterLink],
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent implements OnInit {
  userId = input.required<string>();
  private userService = inject(UsersService);
  private destroyRef = inject(DestroyRef);

  // userName = computed(()=>this.userService.users.find(u=>u.id === this.userId())?.name)

  //Another way when dealing with older angular versions if you do not use the function in app config inputBinding since it is new way for acceptting input 
  // into the path and it is not avilable in the old version 
  username = '';
  private activatedRoute = inject(ActivatedRoute)
  ngOnInit(): void {
      const subscription = this.activatedRoute.paramMap.subscribe({
        next:(paramMap)=> {
          this.username = this.userService.users.find((u)=>u.id === paramMap.get('userId'))?.name || ''
        }
      })
      this.destroyRef.onDestroy(()=>subscription.unsubscribe())
  }

}
