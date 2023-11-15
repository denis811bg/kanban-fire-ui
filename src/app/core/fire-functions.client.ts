import { Injectable } from "@angular/core";
import { AngularFireFunctions } from "@angular/fire/compat/functions";
import { catchError, Observable } from "rxjs";
import { ErrorService } from "../services/error.service";

@Injectable({providedIn: 'root'})
export class FireFunctionsClient {

  constructor(private readonly angularFireFunctions: AngularFireFunctions,
              private readonly errorService: ErrorService) {
  }

  public fetch<R, D = void>(methodName: string, data?: D): Observable<R> {
    return this.makeRequest<R, D>(methodName, data);
  }

  private makeRequest<R, D = void>(methodName: string, data?: D): Observable<R> {
    const body = Object.assign(data || {});

    return this.angularFireFunctions.httpsCallable<any, R>(methodName)(body)
      .pipe(
        catchError(errorResponse => this.errorService.throwError(errorResponse))
      );
  }
}
