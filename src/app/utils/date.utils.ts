export const MILLISECONDS_IN_WEEK = 604800000;

export class DateUtils {

  public static timestampToDate(timestamp: any): Date {
    return new Date(timestamp._seconds * 1000 + timestamp._nanoseconds / 1000000);
  }

}
