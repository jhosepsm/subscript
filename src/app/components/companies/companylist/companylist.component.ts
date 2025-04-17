//Interfaces
import { Company } from '../../../interfaces/company';
//import { HttpClient } from '@angular/common/http';
import { Component, inject,  OnInit, signal, ViewChild, WritableSignal } from '@angular/core';
//Services
import { CompanyService } from '../../../services/company.service';

//Material
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator' ;
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DialogYesNoComponent } from '../../dialogs/dialog-yes-no/dialog-yes-no.component';
import { MatInputModule } from '@angular/material/input';
import { GlobalvarsService } from '../../../services/globalvars.service';



@Component({
  selector: 'app-companylist',
  imports: [MatTableModule,MatPaginator,CommonModule,
    MatIconModule,MatDividerModule,MatFormFieldModule,MatInputModule,
    MatPaginatorModule,
    MatIconModule,MatButtonModule],
  templateUrl: './companylist.component.html',
  styleUrl: './companylist.component.css'
})
export class CompanylistComponent  {
   descOption="Company";
            private dialog=inject(MatDialog)
            private router=inject(Router);
            private  varsglobalService=inject(GlobalvarsService);
            public getJsonValue:any;
            @ViewChild(MatPaginator) paginator!:MatPaginator;
            companies:WritableSignal<Company[]>=signal<Company[]>([]);
          
            public displayColumn:string[]=['COCODE', 'CODESC','COSCHEME','COBRANCH','COREGION','TELEPHONE','Actions'];
            //public dataSource:any=[];
            public dataSource=new MatTableDataSource<Company>([]);
          
          
            //constructor(private http:HttpClient){}
            constructor(private companyService: CompanyService) { }

            applyFilter(event: Event) {
              //console.log(event);
              const filterValue = (event.target as HTMLInputElement).value;
              this.dataSource.filter = filterValue.trim().toLowerCase();
            }
          
            ngOnInit(): void {
              if (! this.varsglobalService.CheckLoginUser())
                {
                  this.router.navigate(['/']);
                }
          
           
              this.showCompanies();
            }
            public showCompanies(){
            
              this.companyService.getCompanies().subscribe({
                next:(companies)=>{
                  // console.log(branches);
                    this.companies.set(companies);
                    this.updateTableData();
                }
               })
          
            }
            updateTableData(){
              this.dataSource.data=this.companies();
              //console.log(this.users);
              this.dataSource.paginator=this.paginator;
            }
            navigateToForm(id?:number){
             console.log('ID Company Edit: ',id)
             const path=id ? `shell/company/edit/${id}`:`shell/company/new`;
            // console.log(path);
             this.router.navigate([path]);
             //console.log(path);
            }
            deleteCompany(id:string){
            //  console.log('ID Category Delete: ',id)
               
              const dialogRef=this.dialog.open(DialogYesNoComponent);
              dialogRef.componentInstance.descOption="Company";
              dialogRef.afterClosed().subscribe((result)=>{
                if(result){
                  this.companyService.deleteCompany(id).subscribe(()=>{
                    const updateRegions=this.companies().filter((company)=>company.ID!==id);
                    this.companies.set(updateRegions);
                    this.updateTableData();
                  })
                }
              });
          
            }
           
}
