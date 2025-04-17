import { CommonModule  } from '@angular/common';
import { Component, inject } from '@angular/core';
//Forms
import { ReactiveFormsModule,FormBuilder,FormGroup,Validators } from '@angular/forms';
//Material
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input'
import {MatCardModule}  from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button';
import {MatSnackBar} from '@angular/material/snack-bar'
import {MatSelectModule} from '@angular/material/select';

import { SchemeService } from '../../../services/scheme.service';
import { Router } from  '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { error } from 'node:console';


@Component({
  selector: 'app-schemes-form',
  imports: [CommonModule,MatFormFieldModule,MatInputModule,
    ReactiveFormsModule,MatButtonModule,MatCardModule, MatSelectModule],
  templateUrl: './schemes-form.component.html',
  styleUrl: './schemes-form.component.css'
})
export class SchemesFormComponent {
   private schemeService=inject(SchemeService);
        private fb=inject(FormBuilder);
        public router=inject(Router);
        private route=inject(ActivatedRoute);
        private snackBar=inject(MatSnackBar);
        schemeForm:FormGroup;
        isEditMode:boolean=false;
         
        
        constructor(){
         
         this.schemeForm=this.fb.group({
           SCHEME:[null,[Validators.required,Validators.maxLength(2)]],
           SCDESC:['',[Validators.required,Validators.maxLength(20)]]
        
          // BRCODE, BRDESC, BRREGION
         })
         this.route.params.subscribe((params)=>{
           if(params['id']){
             this.isEditMode=true;
             this.showScheme(params['id']);
           }
         })
        }
        showScheme(id:string){
        //  console.log("ID  show ", id);
          this.schemeService.getSchemeById(id).subscribe({
           next:(scheme)=> {
             this.schemeForm.patchValue(scheme)
           },
           error:(err)=>{
             console.error(err)
           }
          })
        }
        onSubmit(){
         if(this.schemeForm.invalid) return;
         const schemeData={...this.schemeForm.value};
         if(this.isEditMode){
             this.schemeService.updateScheme(schemeData.SCHEME,schemeData).subscribe({
              next:()=>{
               this.snackBar.open('Scheme updated successfull!!','Close',
                 { 
                  duration:3000,
                 });
                 this.router.navigate(['/shell/schemelist']);
              },
              error:(err)=>console.error(err),
             });
         }
         else{
          // delete userData.USR_ID;
         //  console.log(userData);
           this.schemeService.createScheme(schemeData).subscribe({
             next:()=>{
              this.snackBar.open('Scheme Added successfull!!','Close',
                { 
                 duration:3000,
                });
                this.router.navigate(['/shell/schemelist']);
             },
             error:(err)=>console.error(err),
            });
           
         }
        }

}
