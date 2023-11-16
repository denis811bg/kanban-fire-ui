import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { DashboardResolver } from "./dashboard/resolver/dashboard.resolver";
import { SignInComponent } from "./sign-in/sign-in.component";
import { SignUpComponent } from "./sign-in/sign-up/sign-up.component";
import { SecureInnerPageGuard } from "./dashboard/guard/secure-inner-page.guard";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'sign-in',
    pathMatch: 'full'
  },
  {
    path: 'sign-in',
    component: SignInComponent
  },
  {
    path: 'sign-up',
    component: SignUpComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    resolve: {
      tasks: DashboardResolver
    },
    canActivate: [SecureInnerPageGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
