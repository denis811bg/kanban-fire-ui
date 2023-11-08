import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from "../../dto/task";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  @Input() task: Task | undefined = undefined;
  @Output() edit = new EventEmitter<Task>();
}