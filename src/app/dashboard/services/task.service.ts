import { FireFunctionsClient } from "../../core/fire-functions.client";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TaskDto } from "../../dto/task.dto";

@Injectable({providedIn: 'root'})
export class TaskService {

  constructor(private readonly fireFunctionsClient: FireFunctionsClient) {
  }

  public getTaskList(): Observable<TaskDto[]> {
    return this.fireFunctionsClient.fetch('getTaskList');
  }

  public createNewTask(task: TaskDto): Observable<TaskDto> {
    return this.fireFunctionsClient.fetch('createTask', task);
  }

  public updateTask(task: TaskDto): Observable<TaskDto> {
    return this.fireFunctionsClient.fetch('updateTask', task);
  }

  public deleteTask(task: TaskDto): Observable<void> {
    return this.fireFunctionsClient.fetch('deleteTask', task);
  }

  public initTaskList(): Observable<TaskDto[]> {
    return this.fireFunctionsClient.fetch('initTaskList');
  }
}
