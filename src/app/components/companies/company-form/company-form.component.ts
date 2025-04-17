import { CommonModule,DatePipe } from '@angular/common';
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

import { CompanyService } from '../../../services/company.service';
import { Router } from  '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { error } from 'node:console';
import { SchemeService } from '../../../services/scheme.service';
import { BranchService } from '../../../services/branch.service';
import { CategoryService } from '../../../services/category.service';


@Component({
  selector: 'app-company-form',
  imports: [CommonModule,MatFormFieldModule,MatInputModule,
    ReactiveFormsModule,MatButtonModule,MatCardModule, MatSelectModule],
  templateUrl: './company-form.component.html',
  styleUrl: './company-form.component.css'
})
export class CompanyFormComponent {
   private companyService=inject(CompanyService);
   private schemeService=inject(SchemeService);
   private branchService=inject(BranchService);
   private categoryService=inject(CategoryService);

   private fb=inject(FormBuilder);
   public router=inject(Router);
   private route=inject(ActivatedRoute);
   private snackBar=inject(MatSnackBar);
   private datepipe=inject(DatePipe);
   datereg:Date;
   companyForm:FormGroup;
   isEditMode:boolean=false;
   schemeData :any=[];
   branchData :any=[];
   categoryData :any=[];
   regionData :any=[];
           
          
   constructor(){
    this.datereg=new Date();
    this.schemeService.getSchemes().subscribe({
      next:(schemes)=>{
         //console.log('Regions :',regions);
          this.schemeData=schemes;
      }
     })

     this.branchService.getBranches().subscribe({
      next:(branches)=>{
         //console.log('Regions :',regions);
          this.branchData=branches;
      }
     })
     this.categoryService.getCategories().subscribe({
      next:(categories)=>{
         //console.log('Regions :',regions);
          this.categoryData=categories;
      }
     })
   


     this.companyForm=this.fb.group({
             ID:[null],
             COCODE:['AUTO',Validators.maxLength(30)],
             CODESC:['',[Validators.required,Validators.maxLength(30)]],
             LEGAL_NAME:['',[Validators.maxLength(40)]],
             COSCHEME:['',[Validators.required,Validators.maxLength(2)]],
             COBRANCH:['',[Validators.required,Validators.maxLength(3)]],
             COREGION:['',[Validators.maxLength(3)]],
             TAKEON:[this.datepipe.transform(this.datereg, 'yyyy-MM-dd')],
             TAKEOFF:[this.datepipe.transform(this.datereg, 'yyyy-MM-dd')],
             ADDR1:['',[Validators.required,Validators.maxLength(30)]],
             ADDR2 :['',[Validators.maxLength(30)]],
             ADDR3 :['',[Validators.maxLength(30)]],
             POSTCODE :['',[Validators.required,Validators.maxLength(4)]],
             SADDR1:['',[Validators.maxLength(30)]], 
             SADDR2 :['',[Validators.maxLength(30)]],
             SADDR3 :['',[Validators.maxLength(30)]],
             SPOSTCODE:['',[Validators.maxLength(4)]], 
             CONTACT:['',[Validators.required,Validators.maxLength(25)]],
             TELEPHONE:['',[Validators.required,Validators.maxLength(12)]], 
             FAX :['',[Validators.maxLength(12)]],
             CATEGORY:['',[Validators.required,Validators.maxLength(5)]],
             STATUS :['Open',[Validators.required,Validators.maxLength(4)]],
             CNCL_YN:[1,[Validators.required]],
             COUNCIL:['',[Validators.maxLength(4)]],
             MANAGER :['',[Validators.maxLength(30)]],
             MGCELL :['',[,Validators.maxLength(10)]],
             STEWARD:['',[Validators.maxLength(30)]],
             STCELL:['',[Validators.maxLength(10)]],
             GENERAL:['',[Validators.maxLength(3)]]
            // BRCODE, BRDESC, BRREGION
           })
           this.route.params.subscribe((params)=>{
             if(params['id']){
               this.isEditMode=true;
               this.showCompany(params['id']);
             }
           })
          }

        showCompany(id:string){
          //  console.log("ID  show ", id);
            this.companyService.getCompanyById(id).subscribe({
             next:(company)=> {
               this.companyForm.patchValue(company)
             },
             error:(err)=>{
               console.error(err)
             }
            })
          }
          onSubmit(){
           if(this.companyForm.invalid) return;
           const companyData={...this.companyForm.value};
          // companyData['LEGAL_NAME']=companyData['CODESC'];
           companyData.LEGAL_NAME=companyData.CODESC;
           if(this.isEditMode){
            const result = this.branchData.find((s:any) => s.BRCODE===companyData.COBRANCH);
              companyData.COREGION=result.BRREGION;
              delete companyData.COCODE;
               this.companyService.updateCompany(companyData.ID,companyData).subscribe({
                next:()=>{
                 this.snackBar.open('Company updated successfull!!','Close',
                   { 
                    duration:3000,
                   });
                   this.router.navigate(['/shell/companylist']);
                },
                error:(err)=>console.error(err),
               });
           }
           else{
             delete companyData.ID;
             //console.log(companyData);
             const result = this.branchData.find((s:any) => s.BRCODE===companyData.COBRANCH);
             companyData.COREGION=result.BRREGION;
             companyData.LEGAL_NAME=companyData.CODESC;

           this.companyService.createCompany(companyData).subscribe({
               next:()=>{
                this.snackBar.open('Company Added successfull!!','Close',
                  { 
                   duration:3000,
                  });
                  this.router.navigate(['/shell/companylist']);
               },
               error:(err)=>console.error(err),
              });
             
           }
          }

}
