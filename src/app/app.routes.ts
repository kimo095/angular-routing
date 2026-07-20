import {Routes} from '@angular/router'
import { TasksComponent } from "./tasks/tasks.component";
import { NoTaskComponent } from './tasks/no-task/no-task.component';
import { UserTasksComponent } from './users/user-tasks/user-tasks.component';
import { NewTaskComponent } from './tasks/new-task/new-task.component';


export const routes:Routes = [
    {
        path:'',
        component:NoTaskComponent   
    },
    {
        path:'users/:userId',//<your-domain>/tasks
        component:UserTasksComponent,
      // we add children here to add nested routes
        children:[
            {
              path:'',
              redirectTo:'tasks',
              pathMatch:'prefix'
            },
          // 'prefix' URL starts with the route's path Redirecting a whole URL subtree (e.g. /old/** → /new/**)
          // 'full' URL exactly equals the route's path Default/empty route redirects ('' → /home)
          {
         path:'tasks',
         component:TasksComponent
            },
            {
        path:'tasks/new',
        component:NewTaskComponent
            }
        ],
      // here you can pass static data and recive as input in your component with help of input function
      // since routing with input binding is activated 
      data:{
        message: 'hello'
    }, 
      //accepting dynamic data 
      resove:{
        userName: resolvedUserName
      }
    },
  {
    path: '**',
    component: NotFoundComponent,
  }
  // above the case if the path is not exist
]


// But you can also define resolvers as classes - like this:

// @Injectable({ providedIn: 'root' })
// export class UserNameResolver implements Resolve<string> {
//   constructor(private usersService: UsersService) {}
//   resolve(activatedRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//     const userName =
//       this.usersService.users.find(
//         (u) => u.id === activatedRoute.paramMap.get('userId')
//       )?.name || '';
//     return userName;
//   }
// }
