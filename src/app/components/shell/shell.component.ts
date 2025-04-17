import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { Component, inject,  OnInit,  viewChild,  ViewChild } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenav, MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule, MatMenuTrigger} from '@angular/material/menu';
import {MatAccordion, MatExpansionModule } from '@angular/material/expansion';

import { BreakpointObserver } from '@angular/cdk/layout';
import { GlobalvarsService } from '../../services/globalvars.service';
import { MatDialog } from '@angular/material/dialog';
import { ChangepassFormComponent } from '../dialogs/changepass-form/changepass-form.component';




@Component({
  selector: 'app-shell',
  imports: [CommonModule, RouterModule,
    RouterOutlet,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule, MatDividerModule,
    MatButtonModule,MatMenuModule,
    MatAccordion, MatExpansionModule ],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.css'
})
export class ShellComponent implements OnInit {
  private  varsglobalService=inject(GlobalvarsService);
  public userLogged:string="";
   public router=inject(Router);
   private swlogged:boolean=false;
    //public swloadedPage:boolean=false;
    @ViewChild(MatSidenav, {static: true})
    sidenav!: MatSidenav;
    public userdataservice=inject(GlobalvarsService);
   //Change Pass 
   readonly menuTrigger = viewChild.required(MatMenuTrigger);

   readonly dialog = inject(MatDialog);
 

    constructor(private observer: BreakpointObserver) {
  
    }
    
   
    get DataUser()
    {
      return this.userdataservice.credentials;
    
    }
    get LoginStatus()
    {
      return this.userdataservice.CheckLoginUser();
    }
    
    ngOnInit(): void {
      var lstcred=  this.varsglobalService.getCredentials()
      this.userLogged=lstcred[0];
  

       this.observer.observe(["(max-width: 800px)"])
      .subscribe((res) => {
        if(res.matches) {
          this.sidenav.mode = "over";
          this.sidenav.close();
        } else {
          this.sidenav.mode = "side";
          this.sidenav.open();
        }
      })
      
      
      
    }

    logout()
    {
      this.varsglobalService.LogOutUser();
      this.router.navigate(['/']);

    }

    openDialog() {
      const dialogRef = this.dialog.open(ChangepassFormComponent, {restoreFocus: false});
  
      // Manually restore focus to the menu trigger since the element that
      // opens the dialog won't be in the DOM any more when the dialog closes.
      dialogRef.afterClosed().subscribe(() => this.menuTrigger().focus());
    }

}
