import { Component } from '@angular/core';
import { SignInService } from "../services/sign-in.service";
import firebase from "firebase/compat";
import { NotificationService } from "../services/notification.service";
import { UserService } from "../services/user.service";
import { UserDto } from "../dto/user.dto";
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
              private readonly notificationService: NotificationService,
              private readonly userService: UserService) {
  }

  public signIn(): void {
    this.signInService.signInWithEmailAndPassword(this.email, this.password)
      .then(async (userCredential: UserCredential) => {
        if (userCredential.user) {
          await this.signInService.handleSignInSuccess(userCredential.user);
        }
      })
      .catch((error: any) => {
        this.notificationService.error('SignIn error:', error.message);
      });
  }

  public signInWithGoogle(): void {
    this.signInService.signInWithGoogle()
      .then(async (userCredential: UserCredential) => {
        if (userCredential.user) {
          this.userService.getUser(userCredential.user.uid).subscribe(async (userDto: UserDto) => {
            if (UserUtils.isEmptyUser(userDto) && userCredential.user) {
              this.userService.createUser(UserUtils.buildUserDto(userCredential.user)).subscribe(async (userDto: UserDto) => {
                if (userDto && userCredential.user) {
                  await this.signInService.handleSignInSuccess(userCredential.user);
                }
              });
            }
          });
        }
      })
      .catch((error: any) => {
        this.notificationService.error('SignIn error:', error.message);
      });
  }

}
