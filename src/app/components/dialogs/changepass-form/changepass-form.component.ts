import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

//Material
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input'
import {MatCardModule}  from '@angular/material/card'
import {MatSnackBar} from '@angular/material/snack-bar'
import { MatButtonModule } from '@angular/material/button';
import {MatDialogModule,MatDialogRef}  from  '@angular/material/dialog';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalvarsService } from '../../../services/globalvars.service';
import { MatIconModule } from '@angular/material/icon';
import { min } from 'rxjs';



@Component({
  selector: 'app-changepass-form',
  imports: [CommonModule,MatDialogModule,MatButtonModule,
            CommonModule,MatFormFieldModule,MatInputModule,MatIconModule,
            ReactiveFormsModule,MatButtonModule,MatCardModule, MatSelectModule
  ],
  templateUrl: './changepass-form.component.html',
  styleUrl: './changepass-form.component.css'
})
export class ChangepassFormComponent {
  readonly dialogRef = inject(MatDialogRef<ChangepassFormComponent>);
   private userService=inject(UserService);
    private fb=inject(FormBuilder);
    public router=inject(Router);
    private route=inject(ActivatedRoute);
    private snackBar=inject(MatSnackBar);
    userForm:FormGroup;
    private  varsglobalService=inject(GlobalvarsService);
    msj:any
    userCred:any
   constructor(){
      
      this.userForm=this.fb.group({
        id :[null],
        USR_LOGIN:[null,[Validators.required,Validators.maxLength(15)]],
        USR_NAME:['',[Validators.required,Validators.maxLength(25)]],
        USR_LASTNAME:['',[Validators.required,Validators.maxLength(25)]],
        CURRENT_PASS:['',[Validators.required,Validators.minLength(4),Validators.maxLength(15)]],
        NEW_PASS:['',[Validators.required,Validators.minLength(4),Validators.maxLength(15)]],
        CONFIRM_PASS:['',[Validators.required,Validators.minLength(4), Validators.maxLength(15)]]
        // USR_ID:number; USR_LOGIN:string; USR_PASS:string;
        // USR_NAME:string; USR_LASTNAME:string; USR_ADDRESS:string;
        // USR_MOBIL:string; USR_ACTIVO:number; USR_EMAIL:string;
        // USR_ROL:string; USR_FREG:string;
      },
      {
       validators: this.passwordMatchValidator,
      }
    )
  
      this.userCred= this.varsglobalService.getCredentials()
      this.showUser(Number(this.userCred[1]))

      
     }
     passwordMatchValidator(control:AbstractControl)
     {
        return control.get('NEW_PASS')?.value=== control.get('CONFIRM_PASS')?.value
        ? null
        :{mismatch:true}
     }
     showUser(id:number){
      // console.log("ID  show ", id);
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
      const obj={ 'id':this.userCred[1],
                  'NEW_PASS':userData.NEW_PASS,
                  'CURRENT_PASS':userData.CURRENT_PASS
                }
          this.userService.changePassword(obj).subscribe({
           next:(res)=>{
             
               this.msj=res
              // console.log('Error :', this.msj)
              if (this.msj==="OK")
              {
                this.snackBar.open('Password updated successfull!!','Close',
                  { 
                  duration:3000,
                  });
                  this.router.navigate(['/']);
                  this.dialogRef.close(false);
              }
              else
              {
              //  console.log('Error :', this.msj)
                this.snackBar.open('Change pass failed!!!','Close',
                  { 
                  duration:3000,
                  });
              }
           },
           error:(err)=>{
            this.snackBar.open('Change password failed!!!, please review data!','Close',
              { 
              duration:3000,
              });
            console.error(err)
            }
            ,
          });
      }
     
     
  onCancel():void{
   this.dialogRef.close(false);
  }

  // onConfirm():void{
  //   this.dialogRef.close(true);
  // }

}
