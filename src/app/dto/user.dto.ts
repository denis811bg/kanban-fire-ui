import firebase from "firebase/compat";
import Timestamp = firebase.firestore.Timestamp;

export type UserDto = {
  displayName: string;
  email: string;
  phoneNumber?: string;
  photoURL?: string;
  providerId: string;
  uid: string;
  createdDate?: Timestamp;
}
