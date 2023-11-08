import { FireFunctionsClient } from "../../core/fire-functions.client";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Task } from "../../dto/task";

@Injectable({providedIn: 'root'})
export class TaskService {

  constructor(private readonly fireFunctionsClient: FireFunctionsClient) {
  }

  public getAllTask(): Observable<Task[]> {
    return this.fireFunctionsClient.fetch('getTasks');
  }

  public createNewTask(task: Task): Observable<Task> {
    return this.fireFunctionsClient.fetch('createTask', task);
  }

  public updateTask(task: Task): Observable<Task> {
    return this.fireFunctionsClient.fetch('updateTask', task);
  }

  public deleteTask(task: Task): Observable<void> {
    return this.fireFunctionsClient.fetch('deleteTask', task);
  }
}
