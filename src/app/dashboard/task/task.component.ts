import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from "../../dto/task";
import { DateUtils } from "../../utils/date.utils";
import firebase from "firebase/compat";
import Timestamp = firebase.firestore.Timestamp;

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  @Input() task: Task | undefined = undefined;
  @Output() edit = new EventEmitter<Task>();

  public timestampToDateString(timestamp: Timestamp): string {
    return DateUtils.timestampToDate(timestamp).toDateString();
  }
}
