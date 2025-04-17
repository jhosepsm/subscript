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
import {CommonModule } from '@angular/common';
//Service
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalvarsService } from '../../services/globalvars.service';
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
  selector: 'app-login',
  imports: [CommonModule,MatFormFieldModule,MatInputModule,
              ReactiveFormsModule,MatButtonModule,MatIconModule,
              MatCardModule, MatSelectModule,
              FlexLayoutModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
   private userService=inject(UserService);
   private  varsglobalService=inject(GlobalvarsService);
     private fb=inject(FormBuilder);
     public router=inject(Router);
     private route=inject(ActivatedRoute);
     private snackBar=inject(MatSnackBar);
     loginForm:FormGroup;
     data01:any
     constructor(){
      this.loginForm=this.fb.group({
        USR_ID:[null],
        USR_LOGIN:['',[Validators.required,Validators.maxLength(20)]],
        USR_PASS:[null,[Validators.required,Validators.maxLength(15)]]
       
      })
    }

    onSubmit(){
      if(this.loginForm.invalid) return;
      const loginData={...this.loginForm.value};
       // console.log('Datos a enviar:',loginData);
          this.userService.loginUser(loginData.USR_LOGIN,loginData.USR_PASS).subscribe({
           next:(res)=>{
       //   console.log('Datos a recibidos:',res);
              this.data01= res
              var idusr=  this.data01["usr_id"]
        //  var idusr=  this.data01.map((e: { usr_id: any; })=>e.usr_id)
         //   console.log('ID :',idusr)
            this.varsglobalService.ClearUserData()
            this.varsglobalService.addUserData(loginData.USR_LOGIN);
           this.varsglobalService.addUserData(idusr);
        //    console.log('Datos a login:',this.varsglobalService.getCredentials());
            this.varsglobalService.LogUser();

          //  console.log('Dato Global :', this.varsglobalService.credentials);
            this.snackBar.open('Welcome to Subscriptor','Close',
              { 
               duration:3000,
              });
              this.router.navigate(['/shell/home']);
           },
           error:(err)=>{
            console.error(err);
            this.varsglobalService.LogOutUser();
            this.snackBar.open('Access Denied to Subscriptor','Close',
              { 
               duration:3000,
              });
             }
            ,
          });
            
     }
   

}
