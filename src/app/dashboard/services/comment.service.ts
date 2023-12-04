import { Injectable } from '@angular/core';
import { FireFunctionsClient } from "../../core/fire-functions.client";
import { CommentDto } from "../../dto/comment.dto";
import { Observable } from "rxjs";
import { AngularFireDatabase } from "@angular/fire/compat/database";

@Injectable({providedIn: 'root'})
export class CommentService {

  constructor(private readonly fireFunctionsClient: FireFunctionsClient,
              private readonly angularFireDatabase: AngularFireDatabase) {
  }

  public addComment(taskId: string, comment: CommentDto): Observable<CommentDto> {
    return this.fireFunctionsClient.fetch('addNewComment', {taskId: taskId, comment: comment});
  }

  public getCommentList(taskId: string): Observable<CommentDto[]> {
    return this.fireFunctionsClient.fetch('getTaskCommentList', {taskId: taskId});
  }

  public listenForCommentListChanges(taskId: string): Observable<CommentDto[]> {
    return this.angularFireDatabase.list<CommentDto>(`taskComments/${taskId}/comments`).valueChanges();
  }

}
