import { Component } from '@angular/core';
import { SignInService } from "../../services/sign-in.service";
import firebase from "firebase/compat";
import { Router } from "@angular/router";
import { UserService } from "../../services/user.service";
import { UserUtils } from "../../utils/user.utils";
import { UserDto } from "../../dto/user.dto";
import { NotificationService } from "../../services/notification.service";
import UserCredential = firebase.auth.UserCredential;

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  public email: string = '';
  public password: string = '';

  constructor(private readonly signInService: SignInService,
              private readonly router: Router,
              private readonly userService: UserService,
              private readonly notificationService: NotificationService) {
  }

  public signUp(): void {
    this.signInService.signUpWithEmailAndPassword(this.email, this.password)
      .then(async (userCredential: UserCredential) => {
        if (userCredential.user) {
          this.userService.createUser(UserUtils.buildUserDto(userCredential.user)).subscribe(async (userDto: UserDto) => {
            if (userDto && userCredential.user) {
              await this.signInService.handleSignInSuccess(userCredential.user);
            }
          });
        }
      })
      .catch((error: any) => {
        this.notificationService.error('Sign Up error:', error.message);
      });
  }

}
