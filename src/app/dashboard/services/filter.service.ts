import { Injectable } from '@angular/core';
import { FireFunctionsClient } from "../../core/fire-functions.client";
import { Observable } from "rxjs";
import { TaskDto } from "../../dto/task.dto";

@Injectable({providedIn: 'root'})
export class FilterService {

  constructor(private readonly fireFunctionsClient: FireFunctionsClient) {
  }

  public filterTaskListWithStatusAndCreatedDateRange(status: string, createdDateRange: any): Observable<TaskDto[]> {
    return this.fireFunctionsClient.fetch('getTaskListWithStatusAndCreatedDateRange', {
      status: status,
      createdDateRange: {
        start: createdDateRange.start,
        end: createdDateRange.end
      }
    });
  }
}
