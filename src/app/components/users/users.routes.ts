import { Routes } from "@angular/router";
import { UserFormComponent } from "./user-form/user-form.component";

 export const USER_ROUTES:Routes=[
    {path:'new', component:UserFormComponent},
    {path:'edit/:id', component:UserFormComponent}

 ]