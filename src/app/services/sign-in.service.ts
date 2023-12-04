import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import firebase from "firebase/compat";
import { GoogleAuthProvider } from 'firebase/auth';
import { BehaviorSubject } from "rxjs";
import UserCredential = firebase.auth.UserCredential;
import { LocalStorageUtils } from "../utils/local-storage.utils";
import { UserUtils } from "../utils/user.utils";
import { Router } from "@angular/router";

@Injectable({providedIn: 'root'})
export class SignInService {

  private _isSignedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private readonly angularFireAuth: AngularFireAuth,
              private readonly router: Router) {
  }

  public signInWithEmailAndPassword(email: string, password: string): Promise<UserCredential> {
    return this.angularFireAuth.signInWithEmailAndPassword(email, password);
  }

  public signUpWithEmailAndPassword(email: string, password: string): Promise<UserCredential> {
    return this.angularFireAuth.createUserWithEmailAndPassword(email, password);
  }

  public signInWithGoogle(): Promise<UserCredential> {
    return this.angularFireAuth.signInWithPopup(new GoogleAuthProvider());
  }

  public signOut(): Promise<void> {
    return this.angularFireAuth.signOut();
  }

  get isSignedIn(): BehaviorSubject<boolean> {
    return this._isSignedIn;
  }

  set isSignedIn(value: BehaviorSubject<boolean>) {
    this._isSignedIn = value;
  }

  public async handleSignInSuccess(user: firebase.User): Promise<void> {
    LocalStorageUtils.setUser(UserUtils.buildUserDto(user));
    this.isSignedIn.next(true);
    await this.router.navigate(['dashboard']);
  }

}
