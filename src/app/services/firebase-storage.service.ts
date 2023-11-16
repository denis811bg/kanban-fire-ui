import { Injectable } from '@angular/core';
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class FirebaseStorageService {

  constructor(private readonly angularFireStorage: AngularFireStorage) {
  }

  public getDownloadUrl(path: string): Observable<any> {
    return this.angularFireStorage.ref(path).getDownloadURL();
  }

}
