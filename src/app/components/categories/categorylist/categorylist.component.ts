//import { HttpClient } from '@angular/common/http';
import { Component, inject,  OnInit, signal, ViewChild, WritableSignal } from '@angular/core';
//Interfaces
import { Category } from '../../../interfaces/category';
//Services
import { CategoryService } from '../../../services/category.service';

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
  selector: 'app-categorylist',
  imports: [MatTableModule,MatPaginator,CommonModule,
    MatIconModule,MatDividerModule,
    MatPaginatorModule,
    MatIconModule,MatButtonModule],
  templateUrl: './categorylist.component.html',
  styleUrl: './categorylist.component.css'
})
export class CategorylistComponent implements OnInit {
    descOption="Category";
      private dialog=inject(MatDialog)
      private  varsglobalService=inject(GlobalvarsService);
      private router=inject(Router);
      public getJsonValue:any;
      @ViewChild(MatPaginator) paginator!:MatPaginator;
      categories:WritableSignal<Category[]>=signal<Category[]>([]);
    
      public displayColumn:string[]=['CATEGORY', 'CAT_DESC','Actions'];
      //public dataSource:any=[];
      public dataSource=new MatTableDataSource<Category>([]);
    
    
      //constructor(private http:HttpClient){}
      constructor(private categoryService: CategoryService) { }
    
      ngOnInit(): void {
        if (! this.varsglobalService.CheckLoginUser())
          {
            this.router.navigate(['/']);
          }
     
        this.showCategories();
      }
      public showCategories(){
      
        this.categoryService.getCategories().subscribe({
          next:(categories)=>{
            // console.log(branches);
              this.categories.set(categories);
              this.updateTableData();
          }
         })
    
      }
      updateTableData(){
        this.dataSource.data=this.categories();
        //console.log(this.users);
        this.dataSource.paginator=this.paginator;
      }
      navigateToForm(id?:number){
     //  console.log('ID Category Edit: ',id)
       const path=id ? `shell/category/edit/${id}`:`shell/category/new`;
      // console.log(path);
       this.router.navigate([path]);
       //console.log(path);
      }
      deleteCategory(id:string){
      //  console.log('ID Category Delete: ',id)
         
        const dialogRef=this.dialog.open(DialogYesNoComponent);
        dialogRef.componentInstance.descOption="Category";
        dialogRef.afterClosed().subscribe((result)=>{
          if(result){
            this.categoryService.deleteCategory(id).subscribe(()=>{
              const updateBranches=this.categories().filter((category)=>category.CATEGORY!==id);
              this.categories.set(updateBranches);
              this.updateTableData();
            })
          }
        });
    
      }

}
