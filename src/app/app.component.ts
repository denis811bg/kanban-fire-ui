import { Component, NgZone } from '@angular/core';
import { DialogService } from "./services/dialog.service";
import { FirebaseMessagingService } from "./services/firebase-messaging.service";
import { BASE_FCM_PATH, DIALOG_DELAY, MAX_FCM_TOKEN_TIME } from "./app.constants";
import { MILLISECONDS_IN_WEEK } from "./utils/date.utils";
import { FirebaseStorageService } from "./services/firebase-storage.service";
import { LocalStorageUtils } from "./utils/local-storage.utils";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private static readonly FCM_ICON = 'firebase_icon.png';
  private isOpen = false;
  private interval: any;

  constructor(private readonly ngZone: NgZone,
              private readonly dialogService: DialogService,
              private readonly firebaseMessagingService: FirebaseMessagingService,
              private readonly firebaseStorageService: FirebaseStorageService) {
    this.firebaseStorageService.getDownloadUrl(BASE_FCM_PATH + AppComponent.FCM_ICON).subscribe((url) => {
      LocalStorageUtils.setFcmIcon(url);
    });

    this.checkPermissionTime();
  }

  private checkPermissionTime(): void {
    const fcmTokenTime = LocalStorageUtils.getFcmTokenTime();

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
    const fcmIcon = LocalStorageUtils.getFcmIcon();

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
