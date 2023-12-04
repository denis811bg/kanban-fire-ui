import { Status } from "../enum/status";
import firebase from "firebase/compat";
import Timestamp = firebase.firestore.Timestamp;

export interface TaskDto {
  id: string;
  title: string;
  description: string;
  status: Status;
  createdDate: Timestamp;
  updatedDate?: Timestamp;
}
