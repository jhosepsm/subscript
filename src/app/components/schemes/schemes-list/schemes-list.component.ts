//import { HttpClient } from '@angular/common/http';
import { Component, inject,  OnInit, signal, ViewChild, WritableSignal } from '@angular/core';
//Interfaces
import { Scheme } from '../../../interfaces/scheme';
//Services
import { SchemeService } from '../../../services/scheme.service';

//Material
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator' ;
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DialogYesNoComponent } from '../../dialogs/dialog-yes-no/dialog-yes-no.component';
import { GlobalvarsService } from '../../../services/globalvars.service';



@Component({
  selector: 'app-schemes-list',
  imports: [MatTableModule,MatPaginator,CommonModule,
    MatIconModule,MatDividerModule,
    MatPaginatorModule,
    MatIconModule,MatButtonModule],
  templateUrl: './schemes-list.component.html',
  styleUrl: './schemes-list.component.css'
})
export class SchemesListComponent {
 descOption="Scheme";
        private dialog=inject(MatDialog)
        private  varsglobalService=inject(GlobalvarsService);
        private router=inject(Router);
        public getJsonValue:any;
        @ViewChild(MatPaginator) paginator!:MatPaginator;
        schemes:WritableSignal<Scheme[]>=signal<Scheme[]>([]);
      
        public displayColumn:string[]=['SCHEME', 'SCDESC','RATE','FUNERAL','RAND','SICK','Actions'];
        //SCHEME:string;SCDESC:string ;RATE:number;FUNERAL:number;
       // RAND:number;SICK:number;SUBS:number;BURSARY:number;
       // SELF35:number;SELF65:number;MHT30:number;MHT45:number;
       // FUND62:number;WELFARE:number;CHEST:number;CRECHE:number;
        //LOANS:number;SUNDRIES:number;


        //public dataSource:any=[];
        public dataSource=new MatTableDataSource<Scheme>([]);
      
      
        //constructor(private http:HttpClient){}
        constructor(private schemeService: SchemeService) { }
      
        ngOnInit(): void {
          if (! this.varsglobalService.CheckLoginUser())
            {
              this.router.navigate(['/']);
            }
      
       
          this.showSchemes();
        }
        public showSchemes(){
        
          this.schemeService.getSchemes().subscribe({
            next:(schemes)=>{
              // console.log(branches);
                this.schemes.set(schemes);
                this.updateTableData();
            }
           })
      
        }
        updateTableData(){
          this.dataSource.data=this.schemes();
          //console.log(this.users);
          this.dataSource.paginator=this.paginator;
        }
        navigateToForm(id?:number){
       //  console.log('ID Region Edit: ',id)
         const path=id ? `shell/scheme/edit/${id}`:`shell/scheme/new`;
        // console.log(path);
         this.router.navigate([path]);
         //console.log(path);
        }
        deleteScheme(id:string){
        //  console.log('ID Category Delete: ',id)
           
          const dialogRef=this.dialog.open(DialogYesNoComponent);
          dialogRef.componentInstance.descOption="Scheme";
          dialogRef.afterClosed().subscribe((result)=>{
            if(result){
              this.schemeService.deleteScheme(id).subscribe(()=>{
                const updateSchemes=this.schemes().filter((scheme)=>scheme.SCHEME!==id);
                this.schemes.set(updateSchemes);
                this.updateTableData();
              })
            }
          });
      
        }

}
