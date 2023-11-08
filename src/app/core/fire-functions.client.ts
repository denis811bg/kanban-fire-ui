import { Injectable } from "@angular/core";
import { AngularFireFunctions } from "@angular/fire/compat/functions";
import { catchError, Observable, throwError } from "rxjs";
import { ErrorInfo } from "./error-info";

@Injectable({providedIn: 'root'})
export class FireFunctionsClient {

  constructor(private readonly angularFireFunctions: AngularFireFunctions) {
  }

  public fetch<R, D = void>(methodName: string, data?: D): Observable<R> {
    return this.makeRequest<R, D>(methodName, data);
  }

  private makeRequest<R, D = void>(methodName: string, data?: D): Observable<R> {
    const body = Object.assign(data || {});

    return this.angularFireFunctions.httpsCallable<any, R>(methodName)(body)
      .pipe(
        catchError(errorResponse => FireFunctionsClient.throwError(errorResponse))
      );
  }

  private static throwError(errorResponse: object): Observable<never> {
    console.log(errorResponse);
    return throwError(() =>
      new ErrorInfo(`${errorResponse}`.replace('Error: ', ''))
    );
  }
}
