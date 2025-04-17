//import { HttpClient } from '@angular/common/http';
import { Component, inject,  OnInit, signal, ViewChild, WritableSignal } from '@angular/core';
//Interfaces
import { Branch } from '../../../interfaces/branch';
//Services
import { BranchService } from '../../../services/branch.service';
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


@Component({
  selector: 'app-branchlist',
  imports: [MatTableModule,MatPaginator,CommonModule,
    MatIconModule,MatDividerModule,
    MatPaginatorModule,
    MatIconModule,MatButtonModule],
  templateUrl: './branchlist.component.html',
  styleUrl: './branchlist.component.css'
})
export class BranchlistComponent implements OnInit {
    descOption="Branch";
    private dialog=inject(MatDialog)
    private router=inject(Router);
    public getJsonValue:any;
    @ViewChild(MatPaginator) paginator!:MatPaginator;
    branches:WritableSignal<Branch[]>=signal<Branch[]>([]);
  
    public displayColumn:string[]=['BRCODE', 'BRDESC','RGDESC','Actions'];
    //public dataSource:any=[];
    public dataSource=new MatTableDataSource<Branch>([]);
  
  
    //constructor(private http:HttpClient){}
    constructor(private brachService: BranchService) { }
  
    ngOnInit(): void {
   
      this.getBranches();
    }
    public getBranches(){
    
      this.brachService.getBranches().subscribe({
        next:(branches)=>{
          // console.log(branches);
            this.branches.set(branches);
            this.updateTableData();
        }
       })
  
    }
    updateTableData(){
      this.dataSource.data=this.branches();
      //console.log(this.users);
      this.dataSource.paginator=this.paginator;
    }
    navigateToForm(id?:number){
     console.log('ID Branch Edit: ',id)
     const path=id ? `shell/branch/edit/${id}`:`shell/branch/new`;
    // console.log(path);
     this.router.navigate([path]);
     //console.log(path);
    }
    deleteBranch(id:string){
      console.log('ID Branch Delete: ',id)
       
      const dialogRef=this.dialog.open(DialogYesNoComponent);
      dialogRef.componentInstance.descOption="Branch";
      dialogRef.afterClosed().subscribe((result)=>{
        if(result){
          this.brachService.deleteBranch(id).subscribe(()=>{
            const updateBranches=this.branches().filter((branch)=>branch.BRCODE!==id);
            this.branches.set(updateBranches);
            this.updateTableData();
          })
        }
      });
  
    }

}
