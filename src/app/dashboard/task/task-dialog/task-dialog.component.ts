import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { TaskDto } from "../../../dto/task.dto";
import { LocalStorageUtils } from "../../../utils/local-storage.utils";
import { CommentDto } from "../../../dto/comment.dto";
import { CommentService } from "../../services/comment.service";

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.css']
})
export class TaskDialogComponent implements OnInit {
  public comment: string = '';
  public commentList: CommentDto[] = [];

  constructor(private readonly dialogRef: MatDialogRef<TaskDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: TaskDialogData,
              private readonly commentService: CommentService
  ) {
  }

  public ngOnInit() {
    if (this.data.task.id) {
      this.commentService.getCommentList(this.data.task.id).subscribe((commentList: CommentDto[]) => {
        if (commentList) {
          this.commentList = Object.values(commentList)
        }
      });

      this.commentService.listenForCommentListChanges(this.data.task.id!!).subscribe((commentList) => {
        this.commentList.push(...commentList);
      });
    }
  }

  public cancel(): void {
    this.dialogRef.close();
  }

  public delete(task: TaskDto): void {
    this.dialogRef.close(task);
  }

  public addComment(): void {
    let displayName = LocalStorageUtils.getUser()?.displayName;

    if (this.comment.trim() !== '') {
      const comment: CommentDto = {
        author: displayName ? displayName : 'den.matusevichaws',
        text: this.comment,
        timestamp: new Date()
      };

      this.commentService.addComment(this.data.task.id!!, comment).subscribe((comment: CommentDto) => {
        this.commentList.push(comment);
        this.comment = '';
      });
    }
  }
}

export interface TaskDialogData {
  task: TaskDto,
  enableDelete: boolean;
}

export interface TaskDialogResult {
  task: TaskDto,
  isDelete?: boolean;
}
