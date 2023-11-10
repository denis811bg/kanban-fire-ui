import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { FireFunctionsClient } from "../core/fire-functions.client";
import { Task } from "../dto/task";
import { CdkDragDrop, transferArrayItem } from "@angular/cdk/drag-drop";
import { ActivatedRoute } from "@angular/router";
import { Status } from "../enum/status";
import { TaskDialogComponent, TaskDialogResult } from "./task/task-dialog/task-dialog.component";
import { TaskService } from "./service/task.service";
import { Observable } from "rxjs";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private readonly dialog: MatDialog,
              private readonly fireFunctionsClient: FireFunctionsClient,
              private readonly activatedRoute: ActivatedRoute,
              private readonly taskService: TaskService) {
  }

  public taskList: Task[] = [];
  public todo: Task[] = [];
  public inProgress: Task[] = [];
  public done: Task[] = [];

  public get status(): typeof Status {
    return Status;
  }

  private static TASK_DIALOG_WIDTH: string = '400px';

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data) => {
      this.taskList = data['tasks'];

      this.todo = this.taskList.filter(task => task.status === Status.TODO);
      this.inProgress = this.taskList.filter(task => task.status === Status.IN_PROGRESS);
      this.done = this.taskList.filter(task => task.status === Status.DONE);
    });
  }

  public openTaskDialog(task: Task | {}, enableDelete: boolean): Observable<TaskDialogResult> {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: DashboardComponent.TASK_DIALOG_WIDTH,
      data: {
        task: task,
        enableDelete: enableDelete
      }
    });

    return dialogRef.afterClosed();
  }

  public createTaskDialog(): void {
    this.openTaskDialog({}, false).subscribe((taskDialogResult: TaskDialogResult | undefined) => {
      if (!taskDialogResult) {
        return;
      }

      this.taskService.createNewTask(taskDialogResult.task).subscribe((createdTask: Task) => {
        this.todo.push(createdTask);
      });
    });
  }

  public updateTaskDialog(task: Task): void {
    this.openTaskDialog(task, true).subscribe((taskDialogResult: TaskDialogResult | undefined) => {
      if (!taskDialogResult) {
        return;
      }

      if (taskDialogResult.isDelete) {
        this.deleteTask(taskDialogResult.task);
      } else {
        this.updateTask(taskDialogResult.task);
      }
    });
  }

  public dragDrop(event: CdkDragDrop<Task[]>): void {
    if (event.previousContainer === event.container) {
      return;
    }

    if (!event.container.data || !event.previousContainer.data) {
      return;
    }

    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );

    const task = event.container.data[0];
    task.status = event.container.id as Status;
    this.taskService.updateTask(task as Task).subscribe(() => {
    });
  }

  private deleteTask(task: Task): void {
    this.taskService.deleteTask(task).subscribe(() => {
      this.updateTaskList(task, true);
    });
  }

  private updateTask(task: Task): void {
    this.taskService.updateTask(task).subscribe((updatedTask: Task) => {
      this.updateTaskList(task, false, updatedTask);
    });
  }

  private updateTaskList(task: Task, isDelete: boolean, updatedTask?: Task): void {
    let targetArray: Task[] | undefined = this.getTaskListForStatus(task.status);

    if (targetArray) {
      const index = targetArray.indexOf(task);
      if (index !== -1) {
        if (isDelete) {
          targetArray.splice(index, 1);
        } else if (updatedTask) {
          targetArray.splice(index, 1, updatedTask);
        }
      }
    }
  }

  private getTaskListForStatus(status: string): Task[] | undefined {
    switch (status) {
      case Status.TODO:
        return this.todo;
      case Status.IN_PROGRESS:
        return this.inProgress;
      case Status.DONE:
        return this.done;
      default:
        return undefined;
    }
  }
}
