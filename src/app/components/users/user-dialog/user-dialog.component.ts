import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatDialogModule,MatDialogRef}  from  '@angular/material/dialog';
@Component({
  selector: 'app-user-dialog',
  imports: [CommonModule,MatDialogModule,MatButtonModule],
  templateUrl: './user-dialog.component.html',
  styleUrl: './user-dialog.component.css'
})
export class UserDialogComponent {
  readonly dialogRef = inject(MatDialogRef<UserDialogComponent>);
  onCancel():void{
   this.dialogRef.close(false);
  }
  onConfirm():void{
    this.dialogRef.close(true);
  }
}
