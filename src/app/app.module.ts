import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireFunctionsModule, USE_EMULATOR as USE_FUNCTIONS_EMULATOR } from "@angular/fire/compat/functions";
import { AngularFireAuthModule, USE_EMULATOR as USE_AUTHENTICATION_EMULATOR } from "@angular/fire/compat/auth"
import { environment } from "../environments/environments";
import { ScreenTrackingService, UserTrackingService } from "@angular/fire/analytics";
import { AngularFireMessagingModule } from "@angular/fire/compat/messaging";
import { initializeApp } from "firebase/app";
import { PermissionDialogComponent } from './components/permission-dialog/permission-dialog.component';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { AngularFireStorageModule } from "@angular/fire/compat/storage";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatSelectModule } from "@angular/material/select";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { DashboardModule } from "./dashboard/dashboard.module";
import { SignInModule } from "./sign-in/sign-in.module";
import { AngularFireDatabaseModule } from "@angular/fire/compat/database";
import { ToastrModule } from "ngx-toastr";

initializeApp(environment.firebase);

@NgModule({
  declarations: [
    AppComponent,
    PermissionDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireFunctionsModule,
    AngularFireMessagingModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      closeButton: true,
      preventDuplicates: true,
      positionClass: 'toast-bottom-center'
    }),
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    DashboardModule,
    SignInModule
  ],
  providers: [
    { provide: USE_AUTHENTICATION_EMULATOR, useValue: environment.useEmulators ? ['http://localhost:9099', 9099] : undefined },
    { provide: USE_FUNCTIONS_EMULATOR, useValue: environment.useEmulators ? ['localhost', 5001] : undefined },
    ScreenTrackingService,
    UserTrackingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
