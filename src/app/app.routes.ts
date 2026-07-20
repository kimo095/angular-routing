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
        ]
    }, 
  {
    path: '**',
    component: NotFoundComponent,
  }
  // above the case if the path is not exist
]
