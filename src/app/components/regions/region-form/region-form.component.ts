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

import { RegionService } from '../../../services/region.service';
import { Router } from  '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { error } from 'node:console';

@Component({
  selector: 'app-region-form',
  imports: [CommonModule,MatFormFieldModule,MatInputModule,
    ReactiveFormsModule,MatButtonModule,MatCardModule, MatSelectModule],
  templateUrl: './region-form.component.html',
  styleUrl: './region-form.component.css'
})
export class RegionFormComponent {
    private regionService=inject(RegionService);
      private fb=inject(FormBuilder);
      public router=inject(Router);
      private route=inject(ActivatedRoute);
      private snackBar=inject(MatSnackBar);
      regionForm:FormGroup;
      isEditMode:boolean=false;
       
      
      constructor(){
       
       this.regionForm=this.fb.group({
         RGCODE:[null,[Validators.required,Validators.maxLength(3)]],
         RGDESC:['',[Validators.required,Validators.maxLength(20)]]
      
        // BRCODE, BRDESC, BRREGION
       })
       this.route.params.subscribe((params)=>{
         if(params['id']){
           this.isEditMode=true;
           this.showRegion(params['id']);
         }
       })
      }
      showRegion(id:string){
      //  console.log("ID  show ", id);
        this.regionService.getRegionById(id).subscribe({
         next:(region)=> {
           this.regionForm.patchValue(region)
         },
         error:(err)=>{
           console.error(err)
         }
        })
      }
      onSubmit(){
       if(this.regionForm.invalid) return;
       const regionData={...this.regionForm.value};
       if(this.isEditMode){
           this.regionService.updateRegion(regionData.RGCODE,regionData).subscribe({
            next:()=>{
             this.snackBar.open('Region updated successfull!!','Close',
               { 
                duration:3000,
               });
               this.router.navigate(['/shell/regionlist']);
            },
            error:(err)=>console.error(err),
           });
       }
       else{
        // delete userData.USR_ID;
       //  console.log(userData);
         this.regionService.createRegion(regionData).subscribe({
           next:()=>{
            this.snackBar.open('Region Added successfull!!','Close',
              { 
               duration:3000,
              });
              this.router.navigate(['/shell/regionlist']);
           },
           error:(err)=>console.error(err),
          });
         
       }
      }
}
