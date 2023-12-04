import { Injectable } from '@angular/core';
import { ToastrService } from "ngx-toastr";

@Injectable({providedIn: 'root'})
export class NotificationService {

  constructor(private readonly toastrService: ToastrService) {
  }

  public error(title: string, message: string): void {
    this.toastrService.error(message, title);
  }
}
