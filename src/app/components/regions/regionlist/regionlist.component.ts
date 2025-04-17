//import { HttpClient } from '@angular/common/http';
import { Component, inject,  OnInit, signal, ViewChild, WritableSignal } from '@angular/core';
//Interfaces
import { Region } from '../../../interfaces/region';
//Services
import { RegionService } from '../../../services/region.service';

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
  selector: 'app-regionlist',
  imports: [MatTableModule,MatPaginator,CommonModule,
    MatIconModule,MatDividerModule,
    MatPaginatorModule,
    MatIconModule,MatButtonModule],
  templateUrl: './regionlist.component.html',
  styleUrl: './regionlist.component.css'
})
export class RegionlistComponent {
   descOption="Region";
        private dialog=inject(MatDialog)
        private router=inject(Router);
        private  varsglobalService=inject(GlobalvarsService);
        public getJsonValue:any;
        @ViewChild(MatPaginator) paginator!:MatPaginator;
        regions:WritableSignal<Region[]>=signal<Region[]>([]);
      
        public displayColumn:string[]=['RGCODE', 'RGDESC','Actions'];
        //public dataSource:any=[];
        public dataSource=new MatTableDataSource<Region>([]);
      
      
        //constructor(private http:HttpClient){}
        constructor(private regionService: RegionService) { }
      
        ngOnInit(): void {
      //    console.log('Status :', this.varsglobalService.CheckLoginUser())
          if (! this.varsglobalService.CheckLoginUser())
            {
              this.router.navigate(['/']);
            }
      
       
          this.showRegions();
        }
        public showRegions(){
        
          this.regionService.getRegions().subscribe({
            next:(regions)=>{
              // console.log(branches);
                this.regions.set(regions);
                this.updateTableData();
            }
           })
      
        }
        updateTableData(){
          this.dataSource.data=this.regions();
          //console.log(this.users);
          this.dataSource.paginator=this.paginator;
        }
        navigateToForm(id?:number){
       //  console.log('ID Region Edit: ',id)
         const path=id ? `shell/region/edit/${id}`:`shell/region/new`;
        // console.log(path);
         this.router.navigate([path]);
         //console.log(path);
        }
        deleteCategory(id:string){
        //  console.log('ID Category Delete: ',id)
           
          const dialogRef=this.dialog.open(DialogYesNoComponent);
          dialogRef.componentInstance.descOption="Region";
          dialogRef.afterClosed().subscribe((result)=>{
            if(result){
              this.regionService.deleteRegion(id).subscribe(()=>{
                const updateRegions=this.regions().filter((region)=>region.RGCODE!==id);
                this.regions.set(updateRegions);
                this.updateTableData();
              })
            }
          });
      
        }

}
