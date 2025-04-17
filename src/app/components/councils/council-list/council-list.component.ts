//import { HttpClient } from '@angular/common/http';
import { Component, inject,  OnInit, signal, ViewChild, WritableSignal } from '@angular/core';
//Interfaces
import { Council } from '../../../interfaces/council';
//Services
import { CouncilService } from '../../../services/council.service';

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
  selector: 'app-council-list',
  imports: [MatTableModule,MatPaginator,CommonModule,
    MatIconModule,MatDividerModule,
    MatPaginatorModule,
    MatIconModule,MatButtonModule],
  templateUrl: './council-list.component.html',
  styleUrl: './council-list.component.css'
})
export class CouncilListComponent {
     descOption="Council";
          private dialog=inject(MatDialog)
          private  varsglobalService=inject(GlobalvarsService);
          private router=inject(Router);
          public getJsonValue:any;
          @ViewChild(MatPaginator) paginator!:MatPaginator;
          councils:WritableSignal<Council[]>=signal<Council[]>([]);
        
          public displayColumn:string[]=['CODE', 'COUNCIL','Actions'];
          //public dataSource:any=[];
          public dataSource=new MatTableDataSource<Council>([]);
        
        
          //constructor(private http:HttpClient){}
          constructor(private councilService: CouncilService) { }
        
          ngOnInit(): void {
            if (! this.varsglobalService.CheckLoginUser())
              {
                this.router.navigate(['/']);
              }
                 
            this.showCouncils();
          }
          public showCouncils(){
          
            this.councilService.getCouncils().subscribe({
              next:(councils)=>{
                // console.log(branches);
                  this.councils.set(councils);
                  this.updateTableData();
              }
             })
        
          }
          updateTableData(){
            this.dataSource.data=this.councils();
            //console.log(this.users);
            this.dataSource.paginator=this.paginator;
          }
          navigateToForm(id?:number){
         //  console.log('ID Region Edit: ',id)
           const path=id ? `shell/council/edit/${id}`:`shell/council/new`;
          // console.log(path);
           this.router.navigate([path]);
           //console.log(path);
          }
          deleteCouncil(id:string){
          //  console.log('ID Category Delete: ',id)
             
            const dialogRef=this.dialog.open(DialogYesNoComponent);
            dialogRef.componentInstance.descOption="Council";
            dialogRef.afterClosed().subscribe((result)=>{
              if(result){
                this.councilService.deleteCouncil(id).subscribe(()=>{
                  const updateRegions=this.councils().filter((council)=>council.CODE!==id);
                  this.councils.set(updateRegions);
                  this.updateTableData();
                })
              }
            });
        
          }

}
