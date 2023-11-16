import { UserDto } from "../dto/user.dto";

const FCM_ICON = 'fcmIcon';
const FCM_TOKEN_TIME = 'fcmTokenTime';
const AUTHENTICATED_USER = 'authUser';

export class LocalStorageUtils {

  public static getFcmIcon(): string | null {
    return LocalStorageUtils.getItem(FCM_ICON);
  }

  public static setFcmIcon(iconUrl: string): void {
    LocalStorageUtils.setItem(FCM_ICON, iconUrl);
  }

  public static getFcmTokenTime(): string | null {
    return LocalStorageUtils.getItem(FCM_TOKEN_TIME);
  }

  public static setFcmTokenTime(timestamp: number): void {
    LocalStorageUtils.setItem(FCM_TOKEN_TIME, timestamp);
  }

  public static getUser(): UserDto | null {
    const storedUser = LocalStorageUtils.getItem(AUTHENTICATED_USER);

    try {
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser) as UserDto;
        return parsedUser ? parsedUser : null;
      } else {
        return null;
      }
    } catch (error: any) {
      console.error('Error parsing user data from local storage:', error.message);
      return null;
    }
  }

  public static setUser(userDto: UserDto): void {
    LocalStorageUtils.setItem(AUTHENTICATED_USER, JSON.stringify(userDto));
  }

  public static removeUser(): void {
    LocalStorageUtils.removeItem(AUTHENTICATED_USER);
  }

  private static getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  private static setItem(key: string, value: string | number): void {
    localStorage.setItem(key, value.toString());
  }

  private static removeItem(key: string): void {
    localStorage.removeItem(key);
  }

}
