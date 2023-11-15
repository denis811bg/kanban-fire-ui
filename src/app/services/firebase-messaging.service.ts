import { Injectable } from '@angular/core';
import { AngularFireMessaging } from "@angular/fire/compat/messaging";
import { BehaviorSubject } from "rxjs";

@Injectable({providedIn: 'root'})
export class FirebaseMessagingService {
  private readonly currentMessage: BehaviorSubject<{}> = new BehaviorSubject<{}>({});

  constructor(private angularFireMessaging: AngularFireMessaging) {
  }

  public requestPermission(): void {
    const fcmToken = localStorage.getItem('fcmToken');

    if (!fcmToken) {
      this.angularFireMessaging.requestToken.subscribe(token => {
        if (token) {
          localStorage.setItem('fcmToken', token);
          console.log(localStorage.getItem('fcmToken'));
        }
      });
    }
  }

  public receiveMessage(): void {
    this.angularFireMessaging.messages.subscribe(msg => this.currentMessage.next(msg));
  }
}
