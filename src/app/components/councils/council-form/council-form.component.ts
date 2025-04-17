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

import { CouncilService } from '../../../services/council.service';
import { Router } from  '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { error } from 'node:console';


@Component({
  selector: 'app-council-form',
  imports: [CommonModule,MatFormFieldModule,MatInputModule,
    ReactiveFormsModule,MatButtonModule,MatCardModule, MatSelectModule],
  templateUrl: './council-form.component.html',
  styleUrl: './council-form.component.css'
})
export class CouncilFormComponent {

   private councilService=inject(CouncilService);
        private fb=inject(FormBuilder);
        public router=inject(Router);
        private route=inject(ActivatedRoute);
        private snackBar=inject(MatSnackBar);
        councilForm:FormGroup;
        isEditMode:boolean=false;
         
        
        constructor(){
         
         this.councilForm=this.fb.group({
           CODE:[null,[Validators.required,Validators.maxLength(4)]],
           COUNCIL:['',[Validators.required,Validators.maxLength(30)]]
        
          // BRCODE, BRDESC, BRREGION
         })
         this.route.params.subscribe((params)=>{
           if(params['id']){
             this.isEditMode=true;
             this.showCouncil(params['id']);
           }
         })
        }
        showCouncil(id:string){
        //  console.log("ID  show ", id);
          this.councilService.getCouncilById(id).subscribe({
           next:(council)=> {
             this.councilForm.patchValue(council)
           },
           error:(err)=>{
             console.error(err)
           }
          })
        }
        onSubmit(){
         if(this.councilForm.invalid) return;
         const councilData={...this.councilForm.value};
         if(this.isEditMode){
             this.councilService.updateCouncil(councilData.CODE,councilData).subscribe({
              next:()=>{
               this.snackBar.open('Council updated successfull!!','Close',
                 { 
                  duration:3000,
                 });
                 this.router.navigate(['/shell/councilist']);
              },
              error:(err)=>console.error(err),
             });
         }
         else{
          // delete userData.USR_ID;
         //  console.log(userData);
           this.councilService.createCouncil(councilData).subscribe({
             next:()=>{
              this.snackBar.open('Council Added successfull!!','Close',
                { 
                 duration:3000,
                });
                this.router.navigate(['/shell/councilist']);
             },
             error:(err)=>console.error(err),
            });
           
         }
        }
    
}
