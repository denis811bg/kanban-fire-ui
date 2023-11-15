import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-permission-dialog',
  templateUrl: './permission-dialog.component.html',
  styleUrls: ['./permission-dialog.component.css']
})
export class PermissionDialogComponent {
  public title: string;
  public img: string;

  constructor(private dialogRef: MatDialogRef<PermissionDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: PermissionsDialogData) {
    this.title = data.title;
    this.img = data.icon;
  }

  public cancel(): void {
    this.dialogRef.close(false);
  }

  public apply(): void {
    this.dialogRef.close(true);
  }
}

export interface PermissionsDialogData {
  title: string;
  icon: string;
}
