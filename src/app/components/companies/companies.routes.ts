import { Routes } from "@angular/router";
import { CompanyFormComponent } from "./company-form/company-form.component";

 export const COMPANY_ROUTES:Routes=[
    {path:'new', component:CompanyFormComponent},
    {path:'edit/:id', component:CompanyFormComponent}

 ]