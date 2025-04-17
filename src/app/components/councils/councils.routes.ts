import { Routes } from "@angular/router";
import { CouncilFormComponent } from "./council-form/council-form.component";

 export const COUNCIL_ROUTES:Routes=[
    {path:'new', component:CouncilFormComponent},
    {path:'edit/:id', component:CouncilFormComponent}

 ]