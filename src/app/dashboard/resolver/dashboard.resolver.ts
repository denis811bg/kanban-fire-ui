import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from "@angular/core";
import { catchError, Observable, of, switchMap, throwError } from "rxjs";
import { TaskService } from "../service/task.service";
import { Task } from "../../dto/task";

@Injectable({providedIn: 'root'})
export class DashboardResolver implements Resolve<Task[]> {

  constructor(private readonly taskService: TaskService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Task[]> | Promise<Task[]> | Task[] {
    return this.getTaskList().pipe(
      catchError((error) => throwError(() => error))
    )
  }

  private getTaskList(): Observable<Task[]> {
    return this.taskService.getTaskList()
      .pipe(
        switchMap((taskList) => {
          if (taskList.length === 0) {
            return this.taskService.initTaskList();
          }

          return of(taskList);
        })
      );
  }
}
