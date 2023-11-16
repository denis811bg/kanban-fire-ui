import { NgModule } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";
import { TaskComponent } from './task/task.component';
import { MatCardModule } from "@angular/material/card";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { TaskDialogComponent } from './task/task-dialog/task-dialog.component';
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from "@angular/forms";
import { DashboardComponent } from './dashboard.component';
import { CommonModule } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterLink } from "@angular/router";

@NgModule({
  declarations: [
    TaskComponent,
    TaskDialogComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    DragDropModule,
    FormsModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    RouterLink
  ],
  providers: [],
  bootstrap: [DashboardComponent]
})
export class DashboardModule {
}
