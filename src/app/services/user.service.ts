import { Injectable } from '@angular/core';
import { FireFunctionsClient } from "../core/fire-functions.client";
import { Observable } from "rxjs";
import { UserDto } from "../dto/user.dto";

@Injectable({providedIn: 'root'})
export class UserService {

  constructor(private readonly fireFunctionsClient: FireFunctionsClient) {
  }

  public createUser(userDto: UserDto): Observable<UserDto> {
    return this.fireFunctionsClient.fetch('createUser', {userDto: userDto});
  }

  public getUser(userUid: string): Observable<UserDto> {
    return this.fireFunctionsClient.fetch('getUser', {userUid: userUid});
  }

}
