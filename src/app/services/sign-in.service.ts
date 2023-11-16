import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import firebase from "firebase/compat";
import { GoogleAuthProvider } from 'firebase/auth';
import { BehaviorSubject } from "rxjs";
import UserCredential = firebase.auth.UserCredential;

@Injectable({providedIn: 'root'})
export class SignInService {

  private _isSignedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private readonly angularFireAuth: AngularFireAuth) {
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

}
