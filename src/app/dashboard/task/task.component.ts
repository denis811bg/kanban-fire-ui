import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TaskDto } from "../../dto/task.dto";
import { DateUtils } from "../../utils/date.utils";
import firebase from "firebase/compat";
import Timestamp = firebase.firestore.Timestamp;

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  @Input() task: TaskDto | undefined = undefined;
  @Output() edit = new EventEmitter<TaskDto>();

  public timestampToDateString(timestamp: Timestamp): string {
    return DateUtils.timestampToDate(timestamp).toDateString();
  }
}
