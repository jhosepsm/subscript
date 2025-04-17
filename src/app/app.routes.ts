import { Routes } from '@angular/router';
import { UserlistComponent } from './components/users/userlist/userlist.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserFormComponent } from './components/users/user-form/user-form.component';
import { USER_ROUTES } from './components/users/users.routes';
import { BRANCH_ROUTES } from './components/branches/branches.routes';
import { BranchlistComponent } from './components/branches/branchlist/branchlist.component';
import { LoginComponent } from './components/login/login.component';
import { ShellComponent } from './components/shell/shell.component';
import { CategorylistComponent } from './components/categories/categorylist/categorylist.component';
import { CATEGORY_ROUTES } from './components/categories/categories.routes';
import { REGION_ROUTES } from './components/regions/regions.routes';
import { RegionlistComponent } from './components/regions/regionlist/regionlist.component';
import { COUNCIL_ROUTES } from './components/councils/councils.routes';
import { CouncilListComponent } from './components/councils/council-list/council-list.component';
import { SchemesListComponent } from './components/schemes/schemes-list/schemes-list.component';
import { SCHEME_ROUTES } from './components/schemes/schemes.routes';
import { CompanylistComponent } from './components/companies/companylist/companylist.component';
import { COMPANY_ROUTES } from './components/companies/companies.routes';
import { DEPOSIT_ROUTES } from './components/deposits/deposits.routes';
import { DepositlistComponent } from './components/deposits/depositlist/depositlist.component';
import { ReportsComponent } from './components/reports/reports/reports.component';


export const APP_ROUTES: Routes = [
 //{ path: '', component: DashboardComponent},
 { path: '', component: LoginComponent},
//   { path: 'reports', component: ReportsComponent },
  {path: 'shell', component: ShellComponent,  children: [
   { path: 'home', component: DashboardComponent }, 
   { path: 'userlist', component:UserlistComponent},
  { path: 'users', children:USER_ROUTES},
  { path: 'branchlist', component:BranchlistComponent},
  { path: 'branch', children:BRANCH_ROUTES},
  { path: 'categorylist', component:CategorylistComponent},
  { path: 'category', children:CATEGORY_ROUTES},
  { path: 'regionlist', component:RegionlistComponent},
  { path: 'region', children:REGION_ROUTES},
  { path: 'councilist', component:CouncilListComponent},
  { path: 'council', children:COUNCIL_ROUTES},
  { path: 'schemelist', component:SchemesListComponent},
  { path: 'scheme', children:SCHEME_ROUTES},
  { path: 'companylist', component:CompanylistComponent},
  { path: 'company', children:COMPANY_ROUTES},
  { path: 'depositlist', component:DepositlistComponent},
  { path: 'deposit', children:DEPOSIT_ROUTES},
  { path: 'reports', component:ReportsComponent}
  ]
  },
  { path: '**', redirectTo: '' },


];

