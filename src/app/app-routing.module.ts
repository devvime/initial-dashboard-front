import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SettingsComponent } from './components/settings/settings.component';
import { HomeComponent } from './components/dashboard/home/home.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'recover-password/:recoverPasswordToken', component: LoginComponent },
  { 
    path: 'dashboard', component: DashboardComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'settings', component: SettingsComponent },
    ]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
