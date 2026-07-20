import { ApplicationConfig } from "@angular/core";
import { provideRouter, withComponentInputBinding } from "@angular/router";
import { routes } from "./app.routes";


export const appConfig :ApplicationConfig = {
    providers:[
        provideRouter(routes , withComponentInputBinding())
      //here we use withComponentInputBinding() to tell the angular that we will expect input to my routes
    ],
}
