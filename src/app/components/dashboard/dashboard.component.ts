import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import {Chart} from 'chart.js/auto'
import { QueryService } from '../../services/query.service';
import { map } from 'rxjs';
import { json } from 'stream/consumers';
import { scales } from 'chart.js';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GlobalvarsService } from '../../services/globalvars.service';
import { Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-dashboard',
  imports: [CommonModule,MatExpansionModule,MatListModule,FlexLayoutModule,
    MatSelectModule,FormsModule, ReactiveFormsModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  private queryService=inject(QueryService)
  private  varsglobalService=inject(GlobalvarsService);
  public router=inject(Router);
  public chart!: Chart;
  public chart02!: Chart;
  public chart03!: Chart;
  public nbdepo!:number;
  public totaldepo!:number;
  res:any
  yearsel:any;
  

 
  showChart(lbl:any,dta:any)
  {
   // console.log('QTY :', this.nbdepo)
    var randomColorGenerator = function () { 
      return '#' + (Math.random().toString(16) + '0000000').slice(2, 8); 
    };
 
    const data = {
        labels: lbl,
        datasets: [{
          label: 'Deposit '+this.yearsel,
          data:dta,
        //  fill: false,
        fillColor:randomColorGenerator, 
        strokeColor:randomColorGenerator, 
        highlightFill:randomColorGenerator,
        highlightStroke:randomColorGenerator,
        backgroundColor:randomColorGenerator,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }],
        options:{
          scales:{
            y:{
              beginAtZero:true
            }
          },
          maintainAspectRatio:false 
        }
      };
      if (this.chart) {
        this.chart.destroy();
       }
          this.chart= new Chart("chart",{
            type:"bar",
            data
          })
          if (this.chart02) {
            this.chart02.destroy();
           }

          this.chart02= new Chart("chart02",{
            type:"line",
            data
          })
          if (this.chart03) {
            this.chart03.destroy();
           }
          this.chart03= new Chart("chart03",{
            type:"pie", //doughnut
            data
          })
  }
  showGraphics(){
    var data02:any
    var nb02:any
    var label02:any
   // console.log('Year Select :',this.yearsel)
    const objstr={ 'SQL':"SELECT MONTHNAME(d.DEPDATE) MTHDES, month(d.DEPDATE) MTH, SUM(d.AMOUNT) AMT , COUNT(*)NB"+
                    " FROM deposit d "+ 
                    " where YEAR (DEPDATE)="+ this.yearsel+
                    " GROUP BY  month(d.DEPDATE)"
                  }
   // const labels = Utils.months({count: 7});
 
  this.queryService.getQuery(objstr).subscribe({
    next:(resqry)=> {
      this.res= resqry
      //this.labels= resqry
      label02=  this.res.map((e: { MTHDES: any; })=>e.MTHDES)
    // console.log(this.label01)
    data02=  this.res.map((e: { AMT: any; })=>e.AMT)
    nb02=  this.res.map((e: { NB: any; })=>e.NB)
    
    let sum = 0;
    for (let NB in nb02) {
      sum += nb02[NB];
    }
   // console.log('QTY', sum);
     this.nbdepo=sum
     for (let AMT in data02) {
      sum += data02[AMT];
    }
    this.totaldepo=parseFloat( sum.toFixed(2))
    
   //  console.log(data02)
     this.showChart(label02,data02)
    },
    error:(err)=>{
      console.error(err)
    }
   });
  }
  selectYear(opened:boolean){               
              
    if (!opened && this.yearsel) {
      // Do whatever you want here with `this.selectedVariable`
    //  console.log('Year :', this.yearsel);
   // this.showDeposits();
    this.showGraphics()
    }

  }
  ngOnInit(): void {
  // console.log('Estado :',this.varsglobalService.CheckLoginUser());
   if (! this.varsglobalService.CheckLoginUser())
      {
        this.router.navigate(['/']);
      }
      this.yearsel=new Date().getFullYear().toString() ;
      this.showGraphics();
  //   var data02:any
  //   var nb02:any
  //   var label02:any
  //   const objstr={ 'SQL':"SELECT MONTHNAME(d.DEPDATE) MTHDES, month(d.DEPDATE) MTH, SUM(d.AMOUNT) AMT , COUNT(*)NB"+
  //                   " FROM deposit d "+ 
  //                   " where YEAR (DEPDATE)=2023 "+
  //                   " GROUP BY  month(d.DEPDATE)"
  //                 }
  //  // const labels = Utils.months({count: 7});
 
  // this.queryService.getQuery(objstr).subscribe({
  //   next:(resqry)=> {
  //     this.res= resqry
  //     //this.labels= resqry
  //     label02=  this.res.map((e: { MTHDES: any; })=>e.MTHDES)
  //   // console.log(this.label01)
  //   data02=  this.res.map((e: { AMT: any; })=>e.AMT)
  //   nb02=  this.res.map((e: { NB: any; })=>e.NB)
    
  //   let sum = 0;
  //   for (let NB in nb02) {
  //     sum += nb02[NB];
  //   }
  //  // console.log('QTY', sum);
  //    this.nbdepo=sum
  //    for (let AMT in data02) {
  //     sum += data02[AMT];
  //   }
  //   this.totaldepo=parseFloat( sum.toFixed(2))
    
  //  //  console.log(data02)
  //    this.showChart(label02,data02)
  //   },
  //   error:(err)=>{
  //     console.error(err)
  //   }
  //  });

  
 

  }
    
}
