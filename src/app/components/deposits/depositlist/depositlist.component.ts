//import { HttpClient } from '@angular/common/http';
import { Component, inject,  OnInit, signal, ViewChild, WritableSignal } from '@angular/core';
import { DatePipe } from '@angular/common';


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
import { MatSelectModule } from '@angular/material/select';
//Interface
import { Deposit } from '../../../interfaces/deposit';
//Services
import { DepositService } from '../../../services/deposit.service';
//forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GlobalvarsService } from '../../../services/globalvars.service';


@Component({
  selector: 'app-depositlist',
  imports: [MatTableModule,MatPaginator,CommonModule,
    MatIconModule,MatDividerModule,MatFormFieldModule,MatInputModule,
    MatPaginatorModule,
    MatIconModule,MatButtonModule,MatSelectModule,
    FormsModule, ReactiveFormsModule],
  templateUrl: './depositlist.component.html',
  styleUrl: './depositlist.component.css'
})
export class DepositlistComponent  implements OnInit{
  descOption="Deposit";
  monthsel:any;
  yearsel:any;
  public orderDateFormat: any = {type:"date", format:"dd.MMM.yyyy"}; 
  private dialog=inject(MatDialog)
  private router=inject(Router);
  private  varsglobalService=inject(GlobalvarsService);
  public getJsonValue:any;
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  deposits:WritableSignal<Deposit[]>=signal<Deposit[]>([]);
          
  public displayColumn:string[]=['ID', 'COMPANY','MONTH','YEAR','DEPDATE','AMOUNT','CO_BURS','RANDFUND','AGENCY','Actions'];
              //public dataSource:any=[];
  public dataSource=new MatTableDataSource<Deposit>([]);
            
            
              //constructor(private http:HttpClient){}
  constructor(private despositService: DepositService) { }
  
  
              applyFilter(event: Event) {
                //console.log(event);
                const filterValue = (event.target as HTMLInputElement).value;
                this.dataSource.filter = filterValue.trim().toLowerCase();
              }
              
              select(opened:boolean){               
              
                if (!opened && this.monthsel) {
                  // Do whatever you want here with `this.selectedVariable`
              //    console.log('Month :', this.monthsel);
                  this.showDeposits();
                   }
                }
                selectYear(opened:boolean){               
              
                  if (!opened && this.yearsel) {
                    // Do whatever you want here with `this.selectedVariable`
                  //  console.log('Year :', this.yearsel);
                  this.showDeposits();
                  
                  }

                }
            //  const selvalue=  (event.target as HTMLInputElement).value;
             // console.log('Month :',selvalue);

             months = [
              {nb: '1', month: 'January'},
              {nb: '2', month: 'February'},
              {nb: '3', month: 'March'},
              {nb: '4', month: 'April'},
              {nb: '5', month: 'May'},
              {nb: '6', month: 'June'},
              {nb: '7', month: 'July'},
              {nb: '8', month: 'August'},
              {nb: '9', month: 'September'},
              {nb: '10', month: 'October'},
              {nb: '11', month: 'November'},
              {nb: '12', month: 'December'},
            ];   
            
              ngOnInit(): void {
                if (! this.varsglobalService.CheckLoginUser())
                  {
                    this.router.navigate(['/']);
                  }
            
                this.monthsel=(new Date().getMonth() + 1).toString();
                this.yearsel=new Date().getFullYear().toString() ;
                
               this.showDeposits();
              }
              public showDeposits(){
              
                this.despositService.getDeposits(this.monthsel,this.yearsel).subscribe({
                  next:(desposits)=>{
                    // console.log(branches);
                      this.deposits.set(desposits);
                      this.updateTableData();
                  }
                 })
            
              }
              updateTableData(){
                this.dataSource.data=this.deposits();
                //console.log(this.users);
                this.dataSource.paginator=this.paginator;
              }
              navigateToForm(id?:number){
              // console.log('ID Company Edit: ',id)
               const path=id ? `shell/deposit/edit/${id}`:`shell/deposit/new`;
              // console.log(path);
               this.router.navigate([path]);
               //console.log(path);
              }
              deleteDeposit(id:string){
              //  console.log('ID Category Delete: ',id)
                 
                const dialogRef=this.dialog.open(DialogYesNoComponent);
                dialogRef.componentInstance.descOption="Deposit";
                dialogRef.afterClosed().subscribe((result)=>{
                  if(result){
                    this.despositService.deleteDeposit(id).subscribe(()=>{
                      const updateDeposits=this.deposits().filter((desposit)=>desposit.ID!==id);
                      this.deposits.set(updateDeposits);
                      this.updateTableData();
                    })
                  }
                });
            
              }

}
