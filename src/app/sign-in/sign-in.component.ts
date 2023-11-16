import { Component } from '@angular/core';
import { SignInService } from "../services/sign-in.service";
import { Router } from "@angular/router";
import firebase from "firebase/compat";
import { LocalStorageUtils } from "../utils/local-storage.utils";
import { UserUtils } from "../utils/user.utils";
import UserCredential = firebase.auth.UserCredential;
import { UserDto } from "../dto/user.dto";
import { UserService } from "../services/user.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  public email: string = '';
  public password: string = '';

  constructor(private readonly signInService: SignInService,
              private readonly router: Router,
              private readonly userService: UserService) {
  }

  public signIn(): void {
    this.signInService.signInWithEmailAndPassword(this.email, this.password)
      .then(async (userCredential: UserCredential) => {
        if (userCredential.user) {
          LocalStorageUtils.setUser(UserUtils.buildUserDto(userCredential.user));
          this.signInService.isSignedIn.next(true);
          await this.router.navigate(['dashboard']);
        }
      });
  }

  public signInWithGoogle(): void {
    this.signInService.signInWithGoogle()
      .then(async (userCredential: UserCredential) => {
        if (userCredential.user) {
          this.userService.getUser(UserUtils.buildUserDto(userCredential.user)).subscribe(async (userDto: UserDto) => {
            if (userDto) {
              LocalStorageUtils.setUser(userDto);
              this.signInService.isSignedIn.next(true);
              await this.router.navigate(['dashboard']);
            }
          });
        }
      });
  }

}
