import { Component, NgZone } from '@angular/core';
import { DialogService } from "./services/dialog.service";
import { FirebaseMessagingService } from "./services/firebase-messaging.service";
import { BASE_FCM_PATH, DIALOG_DELAY, MAX_FCM_TOKEN_TIME } from "./app.constants";
import { MILLISECONDS_IN_WEEK } from "./utils/date.utils";
import { FirebaseStorageService } from "./services/firebase-storage.service";
import { LocalStorageUtils } from "./utils/local-storage.utils";
import { SignInService } from "./services/sign-in.service";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/compat/auth";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public isSignedIn: boolean = false;

  private static readonly FCM_ICON = 'firebase_icon.png';
  private isOpen = false;
  private interval: any;

  constructor(private readonly ngZone: NgZone,
              private readonly dialogService: DialogService,
              private readonly firebaseMessagingService: FirebaseMessagingService,
              private readonly firebaseStorageService: FirebaseStorageService,
              private readonly signInService: SignInService,
              private readonly router: Router,
              private readonly angularFireAuth: AngularFireAuth) {
    this.angularFireAuth.onAuthStateChanged((user) => {
      if (user) {
        this.firebaseStorageService.getDownloadUrl(BASE_FCM_PATH + AppComponent.FCM_ICON).subscribe((url) => {
          LocalStorageUtils.setFcmIcon(url);
        });

        this.checkPermissionTime();
      }
    });

    this.signInService.isSignedIn.subscribe((isSignedIn: boolean) => {
      this.isSignedIn = isSignedIn;
    })
  }

  public signOut(): void {
    this.signInService.signOut().then(async () => {
      this.signInService.isSignedIn.next(false);
      LocalStorageUtils.removeUser();
      await this.router.navigate(['sign-in']);
    });
  }

  private checkPermissionTime(): void {
    const fcmTokenTime: string | null = LocalStorageUtils.getFcmTokenTime();

    if (fcmTokenTime) {
      const retryTime = new Date(+fcmTokenTime);
      if (retryTime.getTime() < Date.now()) {
        this.openPermissionDialog();
      }
    } else {
      this.openPermissionDialog();
    }
  }

  private openPermissionDialog(): void {
    if (!this.isOpen) {
      this.isOpen = true;
      this.interval = setInterval(() => {
        this.ngZone.run(() => {
          this.showPermissionDialog();
        })
      }, DIALOG_DELAY);
    }
  }

  private showPermissionDialog(): void {
    const fcmIcon: string | null = LocalStorageUtils.getFcmIcon();

    if (fcmIcon) {
      this.dialogService.openNotificationRequest('Allow notifications?', fcmIcon).subscribe((apply: boolean) => {
        if (apply) {
          LocalStorageUtils.setFcmTokenTime(MAX_FCM_TOKEN_TIME);
          this.firebaseMessagingService.requestPermission();
          this.firebaseMessagingService.receiveMessage();
        } else {
          LocalStorageUtils.setFcmTokenTime(Date.now() + MILLISECONDS_IN_WEEK);
        }
      });

      clearInterval(this.interval);
    }
  }

}
