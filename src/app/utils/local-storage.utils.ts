const FCM_ICON = 'fcmIcon';
const FCM_TOKEN_TIME = 'fcmTokenTime'

export class LocalStorageUtils {
  public static getFcmIcon(): string | null {
    return LocalStorageUtils.getItem(FCM_ICON);
  }

  public static setFcmIcon(iconUrl: string) {
    LocalStorageUtils.setItem(FCM_ICON, iconUrl);
  }

  public static getFcmTokenTime(): string | null {
    return LocalStorageUtils.getItem(FCM_TOKEN_TIME);
  }

  public static setFcmTokenTime(timestamp: number) {
    LocalStorageUtils.setItem(FCM_TOKEN_TIME, timestamp);
  }

  private static getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  private static setItem(key: string, value: string | number): void {
    localStorage.setItem(key, value.toString());
  }
}
