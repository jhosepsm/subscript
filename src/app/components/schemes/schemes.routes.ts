import { Routes } from "@angular/router";
import { SchemesFormComponent } from "./schemes-form/schemes-form.component";

 export const SCHEME_ROUTES:Routes=[
    {path:'new', component:SchemesFormComponent},
    {path:'edit/:id', component:SchemesFormComponent}

 ]