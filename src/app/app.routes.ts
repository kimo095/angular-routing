import {Routes} from '@angular/router'
import { TasksComponent } from "./tasks/tasks.component";
import { NoTaskComponent } from './tasks/no-task/no-task.component';
import { UserTasksComponent } from './users/user-tasks/user-tasks.component';
import { NewTaskComponent } from './tasks/new-task/new-task.component';

// to protect some of your routes , you can use canActivate , canActivateChild? canMatch , ...
// so those above are equalt to an array in which you can pass a method you pass a method inside it
// to decide what will go next

const dummyCanMatch: CanMatchFn = (route , segments ) => {
  const router = inject(Router);
  const shouldGetAccess = Math.random();
  if (shouldGetAccess < 0.5 ){
    return true;
  }
  return new RedirectCommand(router.parseUrl('/unauthorized'));

export const routes:Routes = [
    {
        path:'',
        component:NoTaskComponent 
    },
    {
        path:'users/:userId',//<your-domain>/tasks
        component:UserTasksComponent,
      canMatch:[dummyCanMatch],
      runGuardsAndResolvers: "always: // here i make sure the resolve work if the paramschange or anything
            // here you can pass static data and recive as input in your component with help of input function
      // since routing with input binding is activated 
      data:{
        message: 'hello'
    }, 
      //accepting dynamic data 
      resove:{
        userName: resolvedUserName
      }
      // you can do the same with title , to get dynamic ( resolved title)
      title:resolveTitle // you do the same and this function in the component you use for
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
        component:NewTaskComponent,
    //angular let you add title in the page u are currently in by adding this property
        title:' add a new task',
              // to ask the user if they want to leave this page in this route
              canDeactivate:[canLeaveEditPage]
            }
        ],
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
