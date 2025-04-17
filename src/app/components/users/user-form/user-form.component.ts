import { CommonModule,DatePipe  } from '@angular/common';
import { Component, inject } from '@angular/core';
//Forms
import { ReactiveFormsModule,FormBuilder,FormGroup,Validators } from '@angular/forms';
//Material
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input'
import {MatCardModule}  from '@angular/material/card'
import {MatButtonModule } from '@angular/material/button';
import {MatSnackBar} from '@angular/material/snack-bar'
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';

import { UserService } from '../../../services/user.service';
import { Router } from  '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { error } from 'node:console';


@Component({
  selector: 'app-user-form',
  imports: [CommonModule,MatFormFieldModule,MatInputModule,
            ReactiveFormsModule,MatButtonModule,MatIconModule,MatCardModule, MatSelectModule
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {
   private userService=inject(UserService);
   private fb=inject(FormBuilder);
   public router=inject(Router);
   private route=inject(ActivatedRoute);
   private snackBar=inject(MatSnackBar);
   userForm:FormGroup;
   isEditMode:boolean=false;
   private datepipe=inject(DatePipe);
   datereg:Date;
   constructor(){
    this.datereg=new Date();
    this.userForm=this.fb.group({
      USR_ID:[null],
      USR_LOGIN:['',[Validators.required,Validators.maxLength(35)]],
      USR_PASS:['12345'],
      USR_NAME:['',[Validators.required,Validators.maxLength(25)]],
      USR_LASTNAME:['',[Validators.required,Validators.maxLength(35)]],
      USR_ADDRESS:['',[Validators.required, Validators.maxLength(120)]],
      USR_MOBIL:['',[Validators.required,Validators.maxLength(15)]],
      USR_EMAIL:['',[Validators.required,Validators.email, Validators.maxLength(35)]],
      USR_ROL:['',[Validators.required,Validators.maxLength(15)]],
      USR_FREG:[this.datepipe.transform(this.datereg, 'yyyy-MM-dd')]
    })
    this.route.params.subscribe((params)=>{
      if(params['id']){
        this.isEditMode=true;
        this.showUser(params['id']);
      }
    })
   }
   showUser(id:number){
     console.log("ID  show ", id);
     this.userService.getUserById(id).subscribe({
      next:(user)=> {
        this.userForm.patchValue(user)
      },
      error:(err)=>{
        console.error(err)
      }
     })
   }
   onSubmit(){
    if(this.userForm.invalid) return;
    const userData={...this.userForm.value};
    if(this.isEditMode){
        this.userService.updateUser(userData.USR_ID,userData).subscribe({
         next:()=>{
          this.snackBar.open('User updated successfull!!','Close',
            { 
             duration:3000,
            });
            this.router.navigate(['/shell/userlist']);
         },
         error:(err)=>console.error(err),
        });
    }
    else{
     // delete userData.USR_ID;
      console.log(userData);
      this.userService.createUser(userData).subscribe({
        next:()=>{
         this.snackBar.open('User Added successfull!!','Close',
           { 
            duration:3000,
           });
           this.router.navigate(['/shell/userlist']);
        },
        error:(err)=>console.error(err),
       });
      
    }
   }
}
