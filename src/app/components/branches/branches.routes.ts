import { Routes } from "@angular/router";
import { BranchFormComponent } from "./branch-form/branch-form.component";

 export const BRANCH_ROUTES:Routes=[
    {path:'new', component:BranchFormComponent},
    {path:'edit/:id', component:BranchFormComponent}

 ]