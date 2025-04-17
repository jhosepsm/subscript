import { Routes } from "@angular/router";
import { CategoryFormComponent } from './category-form/category-form.component'

 export const CATEGORY_ROUTES:Routes=[
    {path:'new', component:CategoryFormComponent},
    {path:'edit/:id', component:CategoryFormComponent}

 ]