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

  public createNewTask(taskDto: TaskDto): Observable<TaskDto> {
    return this.fireFunctionsClient.fetch('createTask', {taskDto: taskDto});
  }

  public updateTask(taskDto: TaskDto): Observable<TaskDto> {
    return this.fireFunctionsClient.fetch('updateTask', {taskDto: taskDto});
  }

  public deleteTask(taskId: string): Observable<void> {
    return this.fireFunctionsClient.fetch('deleteTask', {taskId: taskId});
  }

  public initTaskList(): Observable<TaskDto[]> {
    return this.fireFunctionsClient.fetch('initTaskList');
  }
}
