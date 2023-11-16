import { Component } from '@angular/core';
import { SignInService } from "../services/sign-in.service";
import { Router } from "@angular/router";
import firebase from "firebase/compat";
import { LocalStorageUtils } from "../utils/local-storage.utils";
import { UserUtils } from "../utils/user.utils";
import UserCredential = firebase.auth.UserCredential;

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  public email: string = '';
  public password: string = '';

  constructor(private readonly signInService: SignInService,
              private readonly router: Router) {
  }

  public signIn(): void {
    this.signInService.signInWithEmailAndPassword(this.email, this.password)
      .then(async (userCredential: UserCredential) => {
        if (userCredential.user) {
          LocalStorageUtils.setUser(UserUtils.buildUserInfo(userCredential.user));
          this.signInService.isSignedIn.next(true);
          await this.router.navigate(['dashboard']);
        }
      });
  }

  public signInWithGoogle(): void {
    this.signInService.signInWithGoogle()
      .then(async (userCredential: UserCredential) => {
        if (userCredential.user) {
          LocalStorageUtils.setUser(UserUtils.buildUserInfo(userCredential.user));
          this.signInService.isSignedIn.next(true);
          await this.router.navigate(['dashboard']);
        }
      });
  }

}
