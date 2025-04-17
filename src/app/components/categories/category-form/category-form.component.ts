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

import { CategoryService } from '../../../services/category.service';
import { Router } from  '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { error } from 'node:console';


@Component({
  selector: 'app-category-form',
  imports: [CommonModule,MatFormFieldModule,MatInputModule,
    ReactiveFormsModule,MatButtonModule,MatCardModule, MatSelectModule],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css'
})
export class CategoryFormComponent {

   private categoryService=inject(CategoryService);
    private fb=inject(FormBuilder);
    public router=inject(Router);
    private route=inject(ActivatedRoute);
    private snackBar=inject(MatSnackBar);
    categoryForm:FormGroup;
    isEditMode:boolean=false;
     
    
    constructor(){
     
     this.categoryForm=this.fb.group({
       CATEGORY:[null,[Validators.required,Validators.maxLength(4)]],
       CAT_DESC:['',[Validators.required,Validators.maxLength(30)]]
    
      // BRCODE, BRDESC, BRREGION
     })
     this.route.params.subscribe((params)=>{
       if(params['id']){
         this.isEditMode=true;
         this.showCategory(params['id']);
       }
     })
    }
    showCategory(id:string){
    //  console.log("ID  show ", id);
      this.categoryService.getCategoryById(id).subscribe({
       next:(category)=> {
         this.categoryForm.patchValue(category)
       },
       error:(err)=>{
         console.error(err)
       }
      })
    }
    onSubmit(){
     if(this.categoryForm.invalid) return;
     const categoryData={...this.categoryForm.value};
     if(this.isEditMode){
         this.categoryService.updateCategory(categoryData.CATEGORY,categoryData).subscribe({
          next:()=>{
           this.snackBar.open('Category updated successfull!!','Close',
             { 
              duration:3000,
             });
             this.router.navigate(['/shell/categorylist']);
          },
          error:(err)=>console.error(err),
         });
     }
     else{
      // delete userData.USR_ID;
     //  console.log(userData);
       this.categoryService.createCategory(categoryData).subscribe({
         next:()=>{
          this.snackBar.open('Category Added successfull!!','Close',
            { 
             duration:3000,
            });
            this.router.navigate(['/shell/categorylist']);
         },
         error:(err)=>console.error(err),
        });
       
     }
    }


}
