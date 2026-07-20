import { ApplicationConfig } from "@angular/core";
import { provideRouter, withComponentInputBinding ,  withRouterConfig } from "@angular/router";
import { routes } from "./app.routes";


export const appConfig :ApplicationConfig = {
    providers:[
        provideRouter(routes , withComponentInputBinding() , withRouterConfig({
        paramsInheritanceStrategy:'always'})),
      // 
      //here we use withComponentInputBinding() to tell the angular that we will expect input to my routes
      //here we use  withRouterConfig() to let accessing parent route data from inside nested routes
    ],
}
