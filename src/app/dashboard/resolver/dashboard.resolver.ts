import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from "@angular/core";
import { catchError, Observable, of, switchMap, throwError } from "rxjs";
import { TaskService } from "../services/task.service";
import { TaskDto } from "../../dto/task.dto";

@Injectable({providedIn: 'root'})
export class DashboardResolver implements Resolve<TaskDto[]> {

  constructor(private readonly taskService: TaskService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TaskDto[]> | Promise<TaskDto[]> | TaskDto[] {
    return this.getTaskList().pipe(
      catchError((error) => throwError(() => error))
    )
  }

  private getTaskList(): Observable<TaskDto[]> {
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
