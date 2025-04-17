import { Routes } from "@angular/router";
import { DepositFormComponent } from "./deposit-form/deposit-form.component";

 export const DEPOSIT_ROUTES:Routes=[
    {path:'new', component:DepositFormComponent},
    {path:'edit/:id', component:DepositFormComponent}

 ]