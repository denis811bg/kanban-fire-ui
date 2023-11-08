import { Status } from "../enum/status";

export interface Task {
  id?: string;
  title: string;
  description: string;
  status: Status;
  createdDate: Date;
  updatedDate?: Date;
}
