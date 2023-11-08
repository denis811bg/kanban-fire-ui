import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Task } from "../../../dto/task";

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.css']
})
export class TaskDialogComponent {

  constructor(
    private readonly dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TaskDialogData
  ) {
  }

  public cancel(): void {
    this.dialogRef.close();
  }

  public delete(task: Task): void {
    this.dialogRef.close(task);
  }
}

export interface TaskDialogData {
  task: Task,
  enableDelete: boolean
}

export interface TaskDialogResult {
  task: Task,
  isDelete?: boolean
}
