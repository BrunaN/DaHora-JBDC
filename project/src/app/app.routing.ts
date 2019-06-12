import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { ActivityFormComponent } from './activity-form/activity-form.component';

import { Routes, RouterModule } from '@angular/router';

const APP_ROUTES: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'cadastro', component: CadastroComponent},
    {path: 'home', component: HomeComponent},
    {path: 'editarperfil', component: ProfileComponent},
    {path: 'activity-form', component: ActivityFormComponent}
];

export const routing = RouterModule.forRoot(APP_ROUTES);
