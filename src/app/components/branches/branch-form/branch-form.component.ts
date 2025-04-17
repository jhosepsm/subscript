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

import { BranchService } from '../../../services/branch.service';
import { Router } from  '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { error } from 'node:console';
import { RegionService } from '../../../services/region.service';

@Component({
  selector: 'app-branch-form',
  imports: [CommonModule,MatFormFieldModule,MatInputModule,
    ReactiveFormsModule,MatButtonModule,MatCardModule, MatSelectModule],
  templateUrl: './branch-form.component.html',
  styleUrl: './branch-form.component.css'
})
export class BranchFormComponent {
  private brachService=inject(BranchService);
  private regionService=inject(RegionService);
  private fb=inject(FormBuilder);
  public router=inject(Router);
  private route=inject(ActivatedRoute);
  private snackBar=inject(MatSnackBar);
  branchForm:FormGroup;
  isEditMode:boolean=false;
   regionData :any=[];
  
  constructor(){
    this.regionService.getRegions().subscribe({
      next:(regions)=>{
         //console.log('Regions :',regions);
          this.regionData=regions;
      }
     })
   this.branchForm=this.fb.group({
     BRCODE:[null,[Validators.required,Validators.maxLength(3)]],
     BRDESC:['',[Validators.required,Validators.maxLength(20)]],
     BRREGION:['',[Validators.required,Validators.maxLength(5)]]
    // BRCODE, BRDESC, BRREGION
   })
   this.route.params.subscribe((params)=>{
     if(params['id']){
       this.isEditMode=true;
       this.showBranch(params['id']);
     }
   })
  }
  showBranch(id:string){
    console.log("ID  show ", id);
    this.brachService.getBranchById(id).subscribe({
     next:(branch)=> {
       this.branchForm.patchValue(branch)
     },
     error:(err)=>{
       console.error(err)
     }
    })
  }
  onSubmit(){
   if(this.branchForm.invalid) return;
   const branchData={...this.branchForm.value};
   if(this.isEditMode){
       this.brachService.updateBranch(branchData.BRCODE,branchData).subscribe({
        next:()=>{
         this.snackBar.open('Branch updated successfull!!','Close',
           { 
            duration:3000,
           });
           this.router.navigate(['/shell/branchlist']);
        },
        error:(err)=>console.error(err),
       });
   }
   else{
    // delete userData.USR_ID;
   //  console.log(userData);
     this.brachService.createBranch(branchData).subscribe({
       next:()=>{
        this.snackBar.open('Branch Added successfull!!','Close',
          { 
           duration:3000,
          });
          this.router.navigate(['/shell/branchlist']);
       },
       error:(err)=>console.error(err),
      });
     
   }
  }

}
