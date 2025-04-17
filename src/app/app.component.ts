import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { Component, inject,  OnInit,  ViewChild } from '@angular/core';


@Component({
  selector: 'app-root',
  imports: [CommonModule,
            RouterModule,
            RouterOutlet,
    ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'Subscriptor';
  public router=inject(Router);
  
  constructor() { }
  
 
 
  
  ngOnInit(): void {
    
    this.router.navigate(['/']);
    
  }
 
 

  
}
