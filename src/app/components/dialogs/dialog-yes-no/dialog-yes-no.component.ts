import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatDialogModule,MatDialogRef}  from  '@angular/material/dialog';


@Component({
  selector: 'app-dialog-yes-no',
  imports: [CommonModule,MatDialogModule,MatButtonModule],
  templateUrl: './dialog-yes-no.component.html',
  styleUrl: './dialog-yes-no.component.css'
})
export class DialogYesNoComponent {
  public descOption?:string;
  readonly dialogRef = inject(MatDialogRef<DialogYesNoComponent>);
  onCancel():void{
   this.dialogRef.close(false);
  }
  onConfirm():void{
    this.dialogRef.close(true);
  }

}
