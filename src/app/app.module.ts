import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireFunctionsModule, USE_EMULATOR } from "@angular/fire/compat/functions";
import { environment } from "../environments/environments";
import { DashboardModule } from "./dashboard/dashboard.module";
import { ScreenTrackingService, UserTrackingService } from "@angular/fire/analytics";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireFunctionsModule,
    DashboardModule
  ],
  providers: [
    {
      provide: USE_EMULATOR,
      useValue: ['localhost', 5001]
    },
    ScreenTrackingService,
    UserTrackingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
