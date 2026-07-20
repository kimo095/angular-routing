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
  userName = "";
  userId = input.required<string>();
  userName = input.required<string>();
  message = input.required <string>();
  private userService = inject(UsersService);
  private destroyRef = inject(DestroyRef);

  // userName = computed(()=>this.userService.users.find(u=>u.id === this.userId())?.name)

  //Another way when dealing with older angular versions if you do not use the function in app config inputBinding since it is new way for acceptting input 
  // into the path and it is not avilable in the old version 
 // ActivatedRoute.snapshot → reads the route information once when the component is created.
// ActivatedRoute observables (params, paramMap, queryParams, etc.) →
  // listen for changes and update whenever the route changes while the component is still alive.
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

export const resolveUserName: ResolveFn<string> = (
  activatedRouted: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot
  ) => {
  const userService = inject(UsersService);
  const userName = 
    userService.users.find(
      (u) => u.id === activateRoute.paramMap.get('userId'))?.name || '';
    return userName;
  };

// basically with this resolver function you can put as  a value pair in your app.route.ts file {
// userName : resolveUserName , without calling the function , since eangular will call for us
// the we can accept userName as input and get rid of all the code below {
//    ngOnInit(): void {
//       const subscription = this.activatedRoute.paramMap.subscribe({
//         next:(paramMap)=> {
//           this.username = this.userService.users.find((u)=>u.id === paramMap.get('userId'))?.name || ''
//         }
//       })
//       this.destroyRef.onDestroy(()=>subscription.unsubscribe())
//   }
//      }
