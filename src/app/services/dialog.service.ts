import { Injectable } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { Observable } from "rxjs";
import { PermissionDialogComponent } from "../components/permission-dialog/permission-dialog.component";

@Injectable({providedIn: 'root'})
export class DialogService {

  constructor(private readonly matDialog: MatDialog) {
  }

  public openNotificationRequest(title: string, icon: string): Observable<boolean> {
    return this.matDialog.open(
      PermissionDialogComponent,
      {
        data: {title, icon},
      }
    ).afterClosed();
  }
}
