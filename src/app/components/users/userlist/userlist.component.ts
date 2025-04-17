//import { HttpClient } from '@angular/common/http';
import { Component, inject,  OnInit, signal, ViewChild, WritableSignal } from '@angular/core';
//Interfaces
import { User } from '../../../interfaces/user';
//Services
import { UserService } from '../../../services/user.service';
//Material
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator' ;
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';


@Component({
  selector: 'app-userlist',
  imports: [MatTableModule,MatPaginator,CommonModule,
            MatIconModule,MatDividerModule,
            MatPaginatorModule,
            MatIconModule,MatButtonModule],
  templateUrl: './userlist.component.html',
  styleUrl: './userlist.component.css'
})
export class UserlistComponent implements OnInit {
  private dialog=inject(MatDialog)
  private router=inject(Router);
  public getJsonValue:any;
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  users:WritableSignal<User[]>=signal<User[]>([]);

  public displayColumn:string[]=['USR_LOGIN', 'USR_NAME','USR_LASTNAME','USR_MOBIL','USR_EMAIL','Actions'];
  //public dataSource:any=[];
  public dataSource=new MatTableDataSource<User>([]);


  //constructor(private http:HttpClient){}
  constructor(private userService: UserService) { }

  ngOnInit(): void {
 
    this.getUsers();
  }
  public getUsers(){
    // this.http.get('http://localhost:3000/api/user').subscribe((data)=>{
    //   console.log(data);
    //   this.getJsonValue=data;
    //   this.dataSource=data;
    // })
    this.userService.getUsers().subscribe({
      next:(users)=>{
        // console.log(users);
          this.users.set(users);
          this.updateTableData();
      }
     })

  }
  updateTableData(){
    this.dataSource.data=this.users();
    //console.log(this.users);
    this.dataSource.paginator=this.paginator;
  }
  navigateToForm(id?:number){
   console.log('ID user Edit: ',id)
   const path=id ? `shell/users/edit/${id}`:`shell/users/new`;
  // console.log(path);
   this.router.navigate([path]);
   //console.log(path);
  }
  deleteUser(id:number){
    console.log('ID user Delete: ',id)
    const dialogRef=this.dialog.open(UserDialogComponent);
    dialogRef.afterClosed().subscribe((result)=>{
      if(result){
        this.userService.deleteUser(id).subscribe(()=>{
          const updateUsers=this.users().filter((user)=>user.USR_ID!==id);
          this.users.set(updateUsers);
          this.updateTableData();
        })
      }
    });

  }


}
