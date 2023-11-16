import firebase from "firebase/compat";
import { UserDto } from "../dto/user.dto";

export class UserUtils {

  public static buildUserDto(user: firebase.User): UserDto {
    return {
      displayName: user.displayName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      photoURL: user.photoURL,
      providerId: user.providerId,
      uid: user.uid
    } as UserDto;
  }

}
