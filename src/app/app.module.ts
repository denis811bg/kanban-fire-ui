import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireFunctionsModule, USE_EMULATOR as USE_FUNCTIONS_EMULATOR } from "@angular/fire/compat/functions";
import { environment } from "../environments/environments";
import { ScreenTrackingService, UserTrackingService } from "@angular/fire/analytics";
import { AngularFireMessagingModule } from "@angular/fire/compat/messaging";
import { initializeApp } from "firebase/app";
import { PermissionDialogComponent } from './components/permission-dialog/permission-dialog.component';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { DashboardModule } from "./dashboard/dashboard.module";
import { AngularFireStorageModule } from "@angular/fire/compat/storage";
import { MatButtonModule } from "@angular/material/button";

initializeApp(environment.firebase);

@NgModule({
  declarations: [
    AppComponent,
    PermissionDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireFunctionsModule,
    AngularFireMessagingModule,
    AngularFireStorageModule,
    MatToolbarModule,
    MatIconModule,
    DashboardModule,
    MatButtonModule
  ],
  providers: [
    {
      provide: USE_FUNCTIONS_EMULATOR,
      useValue: ['localhost', 5001]
    },
    ScreenTrackingService,
    UserTrackingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
