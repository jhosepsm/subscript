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
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


import { DepositService } from '../../../services/deposit.service';
import { Router } from  '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { error } from 'node:console';
import { SchemeService } from '../../../services/scheme.service';
import { BranchService } from '../../../services/branch.service';
import { CompanyService } from '../../../services/company.service';



@Component({
  selector: 'app-deposit-form',
  imports: [CommonModule,MatFormFieldModule,MatInputModule,
    ReactiveFormsModule,MatButtonModule,MatCardModule, 
    MatSelectModule,MatDatepickerModule,MatNativeDateModule],
  templateUrl: './deposit-form.component.html',
  styleUrl: './deposit-form.component.css'
})
export class DepositFormComponent {
  private depositService=inject(DepositService);
     private schemeService=inject(SchemeService);
     private branchService=inject(BranchService);
     private companyService=inject(CompanyService);
  
     private fb=inject(FormBuilder);
     public router=inject(Router);
     private route=inject(ActivatedRoute);
     private snackBar=inject(MatSnackBar);
     private datepipe=inject(DatePipe);
     datereg:Date;
     depositForm:FormGroup;
     isEditMode:boolean=false;
     companyData :any=[];
     branchData :any=[];
     schemeData :any=[];
    
     depositData :any=[];
   
             
            
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
       this.companyService.getCompanies().subscribe({
        next:(companies)=>{
           //console.log('Regions :',regions);
            this.companyData=companies;
        }
       })
     
  
  
       this.depositForm=this.fb.group({
               ID:[null],
               COMPANY:['',[Validators.required,Validators.maxLength(5)]],
               BRANCH:['',[Validators.required,Validators.maxLength(3)]],
               REGION:['00',[Validators.maxLength(3)]],
               DEPDATE:[this.datepipe.transform(Date.now(), 'yyyy-MM-dd')],
               MONTH:['',[Validators.required,Validators.min(1),Validators.max(12)]],
               YEAR :['',[Validators.required]],
               PAGE :[1,[Validators.required]],
               AMOUNT :[0,[Validators.required]],
               CO_BURS :[0,[Validators.required]],
               EMP_BURS :[0,[Validators.required]],
               AGENCY :[0,[Validators.required]],
               COSCHEME:[0,[Validators.required,Validators.maxLength(2)]],
               AIDS:[0,[Validators.required]],
               DEPSUBS:[0,[Validators.required]],
               WEEK:[0]
              
              // COMPANY, BRANCH, REGION, DEPDATE, MONTH, YEAR,
              // PAGE, AMOUNT, CO_BURS, EMP_BURS, AGENCY, COSCHEME, AIDS,DEPSUBS

             })
             this.route.params.subscribe((params)=>{
               if(params['id']){
                 this.isEditMode=true;
                 this.showDeposit(params['id']);
               }
             })
            }
  
          showDeposit(id:string){
            //  console.log("ID  show ", id);
              this.depositService.getDepositById(id).subscribe({
               next:(company)=> {
                 this.depositForm.patchValue(company)
               },
               error:(err)=>{
                 console.error(err)
               }
              })
            }
            onSubmit(){
             if(this.depositForm.invalid) return;
             const depositData={...this.depositForm.value};
            // companyData['LEGAL_NAME']=companyData['CODESC'];
             if(this.isEditMode){
              const result = this.branchData.find((s:any) => s.BRCODE===depositData.BRANCH);
              depositData.REGION=result.BRREGION;
          
              delete depositData.WEEK;
                 this.depositService.updateDeposit(depositData.ID,depositData).subscribe({
                  next:()=>{
                   this.snackBar.open('Deposit updated successfull!!','Close',
                     { 
                      duration:3000,
                     });
                     this.router.navigate(['/shell/depositlist']);
                  },
                  error:(err)=>console.error(err),
                 });
             }
             else{
               delete depositData.ID;
               delete depositData.WEEK;
               //console.log(companyData);
               const result = this.branchData.find((s:any) => s.BRCODE===depositData.BRANCH);
               depositData.REGION=result.BRREGION;
               //companyData.LEGAL_NAME=companyData.CODESC;
  
             this.depositService.createDeposit(depositData).subscribe({
                 next:()=>{
                  this.snackBar.open('Deposit Added successfull!!','Close',
                    { 
                     duration:3000,
                    });
                    this.router.navigate(['/shell/depositlist']);
                 },
                 error:(err)=>console.error(err),
                });
               
             }
            }
  
}
