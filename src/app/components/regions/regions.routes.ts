import { Routes } from "@angular/router";
import { RegionFormComponent } from "./region-form/region-form.component";

 export const REGION_ROUTES:Routes=[
    {path:'new', component:RegionFormComponent},
    {path:'edit/:id', component:RegionFormComponent}

 ]