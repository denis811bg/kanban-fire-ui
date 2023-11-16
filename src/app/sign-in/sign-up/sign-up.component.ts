import { Component } from '@angular/core';
import { SignInService } from "../../services/sign-in.service";
import firebase from "firebase/compat";
import { Router } from "@angular/router";
import { UserService } from "../../services/user.service";
import { LocalStorageUtils } from "../../utils/local-storage.utils";
import { UserUtils } from "../../utils/user.utils";
import { UserDto } from "../../dto/user.dto";
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
              private readonly userService: UserService) {
  }

  public signUp(): void {
    this.signInService.signUpWithEmailAndPassword(this.email, this.password)
      .then(async (userCredential: UserCredential) => {
        if (userCredential.user) {
          this.userService.createUser(UserUtils.buildUserDto(userCredential.user)).subscribe(async (userDto: UserDto) => {
            LocalStorageUtils.setUser(userDto);
            this.signInService.isSignedIn.next(true);
            await this.router.navigate(['dashboard']);
          });
        }
      });
  }

}
