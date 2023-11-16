import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { SignInService } from "../../services/sign-in.service";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";

@Injectable({providedIn: 'root'})
export class SecureInnerPageGuard implements CanActivate {

  constructor(private readonly signInService: SignInService,
              private readonly router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.signInService.isSignedIn.pipe(
      tap(async (isSignedIn: boolean) => {
        if (!isSignedIn) {
          await this.router.navigate(['sign-in'])
        }
      })
    );
  }
}
